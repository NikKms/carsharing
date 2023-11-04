import React from 'react';

const Home = React.lazy(() => import('../pages/Home'));
const Catalog = React.lazy(() => import('../pages/Catalog'));
const Favorites = React.lazy(() => import('../pages/Favorites'));

const Pages = {
  Home,
  Catalog,
  Favorites,
};

export default Pages;
