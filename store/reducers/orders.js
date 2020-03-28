import { SET_ORDERS, SET_ORDER } from '../actions/orders';

const initialState = {
  orders: [],
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
    default:
      return state;
  }
};
