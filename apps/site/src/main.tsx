import { StrictMode, Suspense, lazy } from "react";
import * as ReactDOM from "react-dom/client";
import './styles.css'
import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter } from "react-router-dom";
import App from "./app/app";
import { HelmetProvider } from 'react-helmet-async';
import { ItemsResultList, DetailedItem } from "./components/items";
import Layout from './components/Layout/Layout';

//Feature: add lazy import to routes.
const LayoutPage = lazy(() => import('../src/components/Layout/Layout'));
const ItemsResultPage = lazy(() => import('../src/components/items/Items'));
const DetailedItemPage = lazy(() => import('../src/components/items/itemDetails/Index'));

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const helmetContext = {};

root.render(
  <StrictMode>
    <HelmetProvider context={ helmetContext }>
      <Suspense fallback={ <p>Loading...</p> }>
        <BrowserRouter>
          <Routes>
            <Route element={ <LayoutPage /> }>
              <Route index path = '/' element={<App />}></Route>
              {/* <Route path = '/items' element={<ItemsResultList />}/> */}
              <Route path = '/items' element={<ItemsResultPage />}/>
              {/* <Route path = '/items/:id' element={<DetailedItem />}/> */}
              <Route path = '/items/:id' element={<DetailedItemPage />}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </HelmetProvider>
  </StrictMode>
);
