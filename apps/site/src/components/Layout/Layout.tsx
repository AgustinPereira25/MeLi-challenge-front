import React from 'react';
import { Seo } from '../seo';
import { Navbar } from '../navbar';
import { Outlet } from 'react-router-dom';

interface Props{
    children: React.ReactNode
}
// const Layout:React.FC<Props> =({children}) =>{
const Layout:React.FC =() =>{ //added
    return(
        <>
            <Seo 
                title=''
                image='https://http2.mlstatic.com/static/org-img/homesnw/mercado-libre.png?v=2'
                description=''
                type=''
                name=''         
            />
            <div className='flex flex-col grow w-full min-h-screen  bg-zinc-100'>
                <Navbar/>
                <div className="flex justify-center h-full">
                    <main>
                        <Outlet />    
                    </main>
                </div>
            </div>
        </>

    )
}

export default Layout;