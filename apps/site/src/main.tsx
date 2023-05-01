import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import './styles.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./app/app";
import { HelmetProvider } from 'react-helmet-async';
import { ItemsResultList, DetailedItem } from "./components/items";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const helmetContext = {};


root.render(
  <StrictMode>
    <HelmetProvider context={ helmetContext }>
      <BrowserRouter>
        <Routes>
            <Route path = '/' element={<App />}>
                <Route path = '/items' element={<ItemsResultList />}/>
                <Route path = '/items/:id' element={<DetailedItem />}/>
            </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
