// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import styles from "./app.module.css";
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/navbar';
import '../styles.css';
import { Seo } from '../components/seo';

export function App() {
  return (
    <>
      <Seo 
        image='https://http2.mlstatic.com/static/org-img/homesnw/mercado-libre.png?v=2'
      />
      <div className='flex flex-col grow w-full min-h-screen  bg-zinc-100'>
        <Navbar/>
        <div className="flex justify-center h-full">
            <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
