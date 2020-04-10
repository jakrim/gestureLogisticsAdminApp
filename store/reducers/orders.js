import {
  SET_ORDERS,
  SET_ORDER,
  SET_FILTERS,
  FETCH_ZONES,
} from '../actions/orders';

const initialState = {
  orders: [],
  filteredOrders: [],
  order: [],
  cities: [],
  zones: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        ...state,
        orders: action.orders,
      };
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
    case SET_FILTERS:
      const appliedFilters = action.filters;
      const updatedFilteredOrders = state.orders.filter((order) => {
        if (appliedFilters.scheduled && order.scheduled != null) {
          return false;
        }
        if (appliedFilters.onDemand && order.scheduled == typeof {}) {
          return false;
        }
        return true;
      });
      // console.log('updatedFilteredOrders', updatedFilteredOrders);
      return {
        ...state,
        filteredOrders: updatedFilteredOrders,
      };
    default:
      return state;
  }
};
