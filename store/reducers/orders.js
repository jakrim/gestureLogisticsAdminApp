import {
  SET_ORDERS,
  SET_ORDER,
  FETCH_ZONES,
  RESET_FILTERS,
  SEARCH_TEXT,
} from '../actions/orders';

import { makeLowercaseCities } from '../../components/HelperFunctions';

const initialState = {
  orders: [],
  filters: [],
  order: [],
  zones: [],
  searchValue: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      const appliedFilters = action.filters;
      if (appliedFilters === undefined || appliedFilters === {}) {
        return {
          ...state,
          orders: action.orders,
        };
      } else {
        const filteredOrders = action.orders.filter((order) => {
          if (appliedFilters.isCity) {
            if (
              appliedFilters.cities.length === 0 ||
              appliedFilters.cities === undefined
            ) {
              return false;
            }
            let mappedCities = makeLowercaseCities(appliedFilters.cities);
            if (!mappedCities.includes(order.city)) {
              return false;
            }
          }
          if (appliedFilters.filter === 'schedule' && order.schedule === null) {
            return false;
          }
          if (appliedFilters.filter === 'onDemand' && order.schedule !== null) {
            return false;
          }
          return true;
        });

        return {
          ...state,
          orders: filteredOrders,
        };
      }
    case SET_ORDER:
      return {
        ...state,
        order: action.order,
      };
    case FETCH_ZONES:
      return {
        ...state,
        cities: action.cities,
        zones: action.zones,
      };
    case RESET_FILTERS:
      return {
        ...state,
        filters: [],
      };
    case SEARCH_TEXT:
      // console.log('action.searchValue', StaticRange.searchValue);
      return {
        searchValue: action.searchValue,
      };
    default:
      return state;
  }
};
