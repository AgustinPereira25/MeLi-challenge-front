import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { ResultListItem } from './resultsListItem/ResultListItem';
import { API_URL } from '../../../../../libs/SharedTypes';
import { SearchResult } from '../../../../../libs/SharedTypes';
import { Breadcrumbs } from '../breadcrums';
import { Seo } from '../seo';


export const ItemsResultList = () => {

  const [searchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<SearchResult>();

  useEffect(() => {
    
    fetch(`${API_URL}/items?q=${searchParams}`, { headers: {'Access-Control-Allow-Origin': '*'} })
      .then((response) => response.json())
      .then((data) => {
        
        const items:SearchResult = data;

        setIsLoading(false);
        setItems(items);
        
      });

  }, [searchParams]);

  if (isLoading) { // ⬅️ si está cargando, mostramos un texto que lo indique
    return (
      <div className="">
        <h1>Cargando...</h1>
      </div>
    );
  }
  

  return (
    <>
      <Seo 
          title={ `${searchParams.get('search')} | Mercado Libre 📦` }
          description={`Encontrá ${searchParams} en MercadoLibre.com.uy! Entrá y conocé nuestras increíbles ofertas y promociones. Descubrí la mejor forma de comprar online.`}
        />
      <div className='flex flex-col py-4 h-full'>
        {
          items?.categories && (
            <Breadcrumbs categories={ items?.categories } />
          )
        }
        <div className='flex bg-white grow w-[calc(100vw-170px)] shadow-md shadow-zinc-200'>
          <div className='flex flex-col w-full'>
            {
              items?.items.length !== 0 
              ? (
                items?.items.map( item => <ResultListItem key={item.id} item={ item } /> )
              ) 
              : (
                <h1>No hay resultados para su búsqueda.</h1>
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}