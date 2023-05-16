/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL, ItemResult } from '../../../../../../libs/SharedTypes';
import { Breadcrumbs } from '../../breadcrums';
import { Seo } from '../../seo';

export const DetailedItem = () => {

  const { id } = useParams();

  const [item, setItem] = useState<ItemResult>();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate(); 
  
  useEffect(() => {
    
    fetch(`${API_URL}/items/${id}`, { headers: {'Access-Control-Allow-Origin': '*'} })
      .then((response) => response.json())
      .then((data) => {
        
        const item:ItemResult = data;

        setIsLoading(false);
        setItem(item);
        
      });

  }, [id]);

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
          type='meli-uy:product'
          name=''
          title={ `${item?.item.title} | Mercado Libre` }
          description={item?.item.description}
          image={item?.item.picture}
        />
      <div className='flex flex-col py-4 min-h-screen'>
        <div className="flex items-center">
          <button className='text-sm text-blue-500 hover:text-blue-700 hover:duration-500' onClick={() => navigate(-1)}>Volver al listado</button>
          <p className="text-sm text-zinc-500 px-2">|</p>      
        {
          item?.categories && (
            <Breadcrumbs categories={ item?.categories } />
            )
          }
        </div>
        <div className='flex flex-col bg-white grow w-[calc(100vw-200px)] shadow-md shadow-zinc-200'>
          <div className='flex flex-col grow p-6'>
            <div className='flex pb-14 justify-between'>
              <div className="">
                <img 
                  src={ item?.item.picture }
                  height={450}
                  width={650} 
                  alt={ item?.item.title }
                />
              </div>
              <div className="flex flex-col pr-10 max-w-sm">
                <div className='flex flex-col gap-2 border rounded-lg border-zinc-300 p-4'>
                  <p className='text-sm text-zinc-400'>{ item?.item.condition === 'new' ? 'Nuevo' : 'Usado' } { item!.item.sold_quantity !== 0 ? ( item!.item.sold_quantity >= 100 ? '| +100' : ' | ' + item?.item.sold_quantity ) + ' vendidos' : '' }</p>
                  <p className='text-xl font-medium'>{ item?.item.title}</p>
                  <div className='flex items-center pb-3'>
                    <p className='text-3xl font-normal tracking-tighter'>$ { item?.item.price.amount }</p>
                    {item!.item.price.decimals !== 0 && <sup>{item!.item.price.decimals}</sup>}
                  </div>
                  <button className='w-full bg-blue-500 px-2 py-3 rounded-md text-white font-medium hover:bg-blue-700 hover:duration-500'>Comprar</button>
                </div>
              </div>
            </div>
            <div className='flex flex-col max-w-2xl'>
                <p className='text-3xl font-semibold pb-5'>Descripción del producto</p>
                <p className='text-xl text-zinc-500'>{ item?.item.description }</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DetailedItem;