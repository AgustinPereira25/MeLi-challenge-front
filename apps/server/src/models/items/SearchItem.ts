import axios from 'axios';

//Interfaces que se van a devolver y va a precisar el frontend para procesar y mostrar los datos.
import {
  SearchItem,
  SearchResult
} from '../../../../../libs/SharedTypes';

//Constantes utilizadas para no repetir lo mismo en cada llamdaa a la API y los datos del autor
import {
  AUTHOR_INFO,
  API_URL
} from '../../config/general.config';


import { getDecimals } from '../../utils';


//"Porciones" de los datos extraídos de mercadoLibre API, para devolver lo que realmente queremos.
import {
  MLSearch,
  MLCategory
} from '../items/interfaces';


export class SearchItems {

  async execute(query: string): Promise<SearchResult> {
    const searchData = await this.searchItems(query);

    const categories = await this.getCategories(searchData);

    const items = this.mapResponse(searchData);

    return {
      items,
      categories,
      author: AUTHOR_INFO,
    };
  }

  private async searchItems(query: string): Promise<MLSearch> {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axios.get<MLSearch>(`${API_URL}/sites/MLA/search?q=${query}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  //Obtiene las categorias de la búsqueda, primero busca el filtro "categoria" en los filtros disponibles,
  //Si lo encuentra, ordena por resultado
  private async getCategories(searchData: MLSearch): Promise<string[]> {
    const categoriesFilter = searchData.available_filters.find(filter => filter.id === 'category');
    const sortedCategoriesByResults = categoriesFilter ? categoriesFilter.values.sort((a, b) => b.results - a.results) : [];
    const mostResultsCategoryId = sortedCategoriesByResults[0]?.id;

    if (mostResultsCategoryId) {
      try {
        const response = await axios.get<MLCategory>(`${API_URL}/categories/${mostResultsCategoryId}`);
        return response.data.path_from_root.map(e => e.name);
      } catch (error) {
        // console.log(error)
      }
    }

    //Obtiene los filtros del tipo categoria, los une en un solo array y devuelve un array con los elementos,
    // utiliza el split() para convertir el string resultante a un array de elementos donde el separador es la coma.
    const filters = searchData.filters.filter(filter => filter.id === 'category');
    return filters.length
      ? filters.map(filter =>
          filter.values.map(
            value => value.path_from_root.map(e => e.name).join()
          ).join()
        )
        .join()
        .split(',')
      : [];
  }

  private mapResponse(searchData: MLSearch): SearchItem[] {
    return searchData.results
      .slice(0, 4) // Extrae los primeros 4 elementos (requerimiento)
      .map(result => ({ //Mapea para poder armar la estructura del objeto a devolver
        id: result.id,
        title: result.title,
        price: {
          currency: result.currency_id,
          amount: Math.trunc(result.price),
          decimals: getDecimals(result.price),
        },
        picture: result.thumbnail,
        condition: result.condition,
        free_shipping: result.shipping.free_shipping,
        city: result.seller_address.city.name,
      }));
  }
}