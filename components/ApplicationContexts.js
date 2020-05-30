import { createContext } from 'react';

export const OrderFiltersContext = createContext({
  isCity: false,
  cities: [],
  filter: 'noFilter',
});

export const GrunnerFiltersContext = createContext({
  hasOrder: false,
  isCity: false,
  cities: [],
  filter: 'noFilter',
});

export const OrdersSearchContext = createContext([]);

export const AreSearchingOrders = createContext(false);

export const GRunnersSearchContext = createContext([]);

export const AreSearchingGrunners = createContext(false);

export const ScreenContext = createContext('');
