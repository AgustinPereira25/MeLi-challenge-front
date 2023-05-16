import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function SearchInput() {

  const navigateTo = useNavigate();

  const [keywords, setKeywords] = useState('');   
  
  function handleSubmit() {
    // console.log('navigateTo')
    navigateTo(`/items/search?=${keywords}`);
    setKeywords('')
  }

  return (
    <div className="flex justify-center items-center w-full">
        <form
            onSubmit={handleSubmit}
            className='flex w-full'
        >
            <input
                placeholder="Nunca dejes de buscar" 
                className='w-full h-9 pl-4'
                onChange={ e => setKeywords(e.target.value) }
            />
            <Link to = {`/items?search=${keywords}`}>
              <button type="submit" className='h-full w-full p-2 bg-zinc-100 hover:bg-zinc-200 transition duration-500'>
                  <img 
                      src="/ic_Search.png" 
                      alt="Buscar"
                  />
              </button>
            </Link>
        </form>
    </div>
  );
}

export default SearchInput;