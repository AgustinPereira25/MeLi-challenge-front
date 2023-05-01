import axios from 'axios';

import {
  ItemDetail,
  ItemResult
} from '../../../../../libs/SharedTypes';

import {
  AUTHOR_INFO,
  API_URL
} from '../../../src/config/general.config';

import { getDecimals } from '../../utils';

import {
  MLItem,
  MLItemDescription,
  MLCategory
} from '../../models/items/interfaces';

export class GetItem {

  async execute(id: string): Promise<ItemResult> {
    
    //Primero, me traigo el item entero (MLItem)
    const item = await this.getItem(id);
    
    // extraigo las categorias con el id de categoria que tiene ese item
    const categories = await this.getCategories(item.category_id);

  // extraigo la descripción con el id que tiene ese item
    const description = await this.getDescription(id);
    
    return {
      categories,
      author: AUTHOR_INFO,
      item: this.mapResponse(item, description),
    };
  }

  private async getItem(id: string): Promise<MLItem> {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axios.get<MLItem>(`${API_URL}/items/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  private async getCategories(categoryId: string): Promise<string[]> {
    try {
      const response = await axios.get<MLCategory>(`${API_URL}/categories/${categoryId}`);
      return response.data.path_from_root.map(e => e.name); //Util para los breadcrums.
    } catch (error) {
      return [];
    }
  }

  private async getDescription(itemId: string): Promise<string> {
    try {
      const response = await axios.get<MLItemDescription>(`${API_URL}/items/${itemId}/description`);
      return response.data.plain_text ?? '';
    } catch (error) {
      return '';
    }
  }

  private mapResponse(item: MLItem, description: string): ItemDetail {
    //Armamos la respuesta a devolver junto con las categorias y el author para el prod específico.
    return {
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: Math.trunc(item.price),
        decimals: getDecimals(item.price),
      },
      picture: item.pictures[0]?.url ?? item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
      sold_quantity: item.sold_quantity,
      city: item.seller_address.city.name,
      description: description.trim().length ? description : 'Producto sin descripción'
    };
  }
}