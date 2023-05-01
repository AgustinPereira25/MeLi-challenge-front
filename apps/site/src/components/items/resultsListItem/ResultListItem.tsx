import React from 'react'
import { SearchItem } from '../../../../../../libs/SharedTypes'
import { Link } from 'react-router-dom'

interface Props {
  item: SearchItem

}


export const ResultListItem:React.FC<Props> = ({ item }) => {

  return (
    <div className='flex bg-white flex-col py-4'>
        <div className='flex py-4 px-10 w-full'>
          <Link to={`/items/${item.id}`}>
            <img 
              src={item.picture}
              alt={item.title}
              height={180}
              width={180}
              className='pr-3'
            />
          </Link>
          <div className="flex flex-col pr-10 max-w-lg justify-start pt-5 gap-4">
            <div className="flex items-center">
              <p className='text-2xl font-medium'> {`$ ${item.price.amount}`}</p>
              { item.price.decimals !== 0 && <sup className='font-medium'>{ item.price.decimals }</sup> }
              { item.free_shipping && (
                
                  <img 
                    src='src/assets/ic_shipping.png' 
                    className='pl-2'
                    alt={ item.title }
                  />
                
                ) 
              }
            </div>
            <Link to={`/items/${item.id}`}>
              <p className='text-lg break-words'>{ item.title }</p>
            </Link>
          </div>
          <div className='flex flex-col grow justify-center items-end pr-16'>
            <Link to={`/items/${item.id}`}>
              <p className=''>{ item.city }</p>
            </Link>
          </div>
        </div>
    </div>
  )
}