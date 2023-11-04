import React from 'react';
import Pages from './Lazy';

export const routes = [
  {
    path: '/',
    element: <Pages.Home />,
  },
  {
    path: '/catalog',
    element: <Pages.Catalog />,
  },
  {
    path: '/favorite',
    element: <Pages.Favorites />,
  },

];
