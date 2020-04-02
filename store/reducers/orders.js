import { SET_ORDERS, SET_ORDER, FILTER_ORDER } from '../actions/orders';

const initialState = {
  orders: [],
  filteredOrders: [],
  order: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        ...state,
        orders: action.orders
      };
    case SET_ORDER:
      return {
        ...state,
        order: action.order
      };
    // FILTER_ORDER:
    //   return {
    //     ...state,
    //   }
    default:
      return state;
  }
};
