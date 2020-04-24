import { useContext, createContext } from 'react';

export const FiltersContext = createContext({
  isCity: false,
  cities: [],
  filter: 'noFilter',
});
