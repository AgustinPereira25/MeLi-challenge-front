import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function SearchInput() {

  const navigateTo = useNavigate();
  const textInput = useRef(null);
  const [keywords, setKeywords] = useState('');
  
  function handleSubmit() {
    navigateTo(`/items/search?=${keywords}`);
  }

  return (
    <div className="flex justify-center items-center w-full">
        <form
            onSubmit={handleSubmit}
            className='flex w-full'
        >
            <input
                ref={textInput}
                placeholder="Nunca dejes de buscar" 
                className='w-full h-9 pl-4'
                onChange={ e => setKeywords(e.target.value) }
            />
            <Link to = {`/items?search=${keywords}`}>
              <button type="submit" className='h-full w-full p-2 bg-zinc-100 hover:bg-zinc-200 transition duration-500'>
                  <img 
                      src="src/assets/ic_search.png" 
                      alt="Buscar"
                  />
              </button>
            </Link>
        </form>
    </div>
  );
}

export default SearchInput;