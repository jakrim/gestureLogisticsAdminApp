import { createContext } from 'react';

export const OrderFiltersContext = createContext({
  isCity: false,
  cities: [],
  filter: 'noFilter',
});

export const GrunnerFiltersContext = createContext({
  hasOrder: 'false',
  isCity: false,
  cities: [],
  filter: 'noFilter',
});
