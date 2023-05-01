import React from 'react';

import { Helmet } from 'react-helmet-async';

interface Props{
    title      ?: string,
    description?:string,
    type       ?:string,
    name       ?:string,
    image      ?:string,

}

export const Seo:React.FC<Props> = ({ title, description, type, name, image }) => {
  return (
    <Helmet>
      <title>{title !== '' ? title : 'Mercado Libre Uruguay - Envíos gratis en el día.'}</title>
      { description && <meta name="description" content={description} /> }
      { type && <meta property="og:type" content={type} /> }
      { title && <meta property="og:title" content={title} /> }
      { description && <meta property="og:description" content={description} /> }
      { image && <meta property="og:image" content={image} /> } 
    </Helmet>
  );
};
