import { SET_ORDERS, SET_ORDER, FETCH_ZONES } from '../actions/orders';

const initialState = {
  orders: [],
  filteredOrders: [],
  filters: [],
  order: [],
  cities: [],
  zones: [],
  selectedCities: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      const appliedFilters = action.filters;
      console.log('appliedFilters (REDUCER)', appliedFilters);
      console.log('appliedFilters.cities', appliedFilters.cities);
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
            if (!appliedFilters.cities.includes(order.city)) {
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
    // case SET_ORDERS:
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
    default:
      return state;
  }
};
