import {
  SET_ORDERS,
  SET_ORDER,
  SET_FILTERS,
  FETCH_ZONES,
  ADD_CITY,
  REMOVE_CITY,
} from '../actions/orders';

const initialState = {
  orders: [],
  filteredOrders: [],
  filters: [],
  order: [],
  cities: [],
  zones: [],
  selectedCities: [],
};

//Can we refactor which orders are passed to orders based on filters set - can it be one function and not two?

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      const appliedFilters = action.filters;
      console.log('appliedFilters (REDUCER)', appliedFilters);
      if (appliedFilters === undefined || appliedFilters === {}) {
        return {
          ...state,
          orders: action.orders,
        };
      } else {
        const filteredOrders = action.orders.filter((order) => {
          if (appliedFilters.cities && order.city) {
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
    case ADD_CITY: {
      console.log('selectedCities', selectedCities);
      console.log('added City');
      return [...state, action.payload.city];
    }
    case REMOVE_CITY: {
      console.log('selectedCities', selectedCities);
      console.log('deleted City');
      return state.filter((city) => city !== action.payload);
    }
    case SET_FILTERS:
      //   const appliedFilters = action.filters;
      //   const updatedFilteredOrders = state.orders.filter((order) => {
      //     if (appliedFilters.scheduled && order.scheduled != null) {
      //       return false;
      //     }
      //     if (appliedFilters.onDemand && order.scheduled == typeof {}) {
      //       return false;
      //     }
      //     return true;
      //   });
      //   // console.log('updatedFilteredOrders', updatedFilteredOrders);
      return {
        ...state,
        filters: action.filters,
      };
    default:
      return state;
  }
};
