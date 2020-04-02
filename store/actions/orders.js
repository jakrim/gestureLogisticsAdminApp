import { onDemandOrder, scheduledOrder } from '../../models/Order';

export const SET_ORDERS = 'SET_ORDERS';
export const SET_ORDER = 'SET_ORDER';

export const fetchOrders = () => {
  return async dispatch => {
    try {
      const response = await fetch(
        'https://us-central1-gesture-dev.cloudfunctions.net/logPendingOrders'
      );

      if (!response.ok) {
        throw new Error('Something went wrong in fetching orders!');
      }

      const resData = await response.json();

      const loadedOrders = [];
      const orders = resData.data;
      // console.log('fetchOrders -> orders', resData.data);

      if (!orders.schedule) {
        for (const key in orders) {
          loadedOrders.push(
            new onDemandOrder(
              orders[key].address_coordinates,
              orders[key].address_string,
              orders[key].address_string_2,
              orders[key].category_name,
              orders[key].delivery_note,
              orders[key].orderId,
              orders[key].os,
              orders[key].product_name,
              orders[key].recipient_email,
              orders[key].recipient_name,
              orders[key].recipient_phone_number,
              orders[key].sender_email,
              orders[key].sender_name,
              orders[key].sender_phone_number,
              orders[key].time_order_placed,
              orders[key].zone
            )
          );
        }
      } else {
        for (const key in orders) {
          loadedOrders.push(
            new scheduledOrder(
              orders[key].address_coordinates,
              orders[key].address_string,
              orders[key].address_string_2,
              orders[key].category_name,
              orders[key].delivery_note,
              orders[key].orderId,
              orders[key].os,
              orders[key].product_name,
              orders[key].recipient_email,
              orders[key].recipient_name,
              orders[key].recipient_phone_number,
              orders[key].schedule,
              orders[key].sender_email,
              orders[key].sender_name,
              orders[key].sender_phone_number,
              orders[key].time_order_placed,
              orders[key].zone
            )
          );
        }
      }

      dispatch({
        type: SET_ORDERS,
        orders: loadedOrders
      });
    } catch (err) {
      console.log('ERROR IN FETCHING ORDERS', err);
    }
  };
};

export const fetchOrder = orderId => {
  return async dispatch => {
    try {
      const response = await fetch(
        `https://us-central1-gesture-dev.cloudfunctions.net/logisticsOrder?uid=1234324&orderId=${orderId}`
      );

      const resData = await response.json();

      const order = resData.result.data;

      const loadedOrder = [];

      if (!order.schedule) {
        for (const key in order) {
          loadedOrder.push(
            new onDemandOrder(
              order[key].address_coordinates,
              order[key].address_string,
              order[key].address_string_2,
              order[key].category_name,
              order[key].delivery_note,
              order[key].orderId,
              order[key].os,
              order[key].product_name,
              order[key].recipient_email,
              order[key].recipient_name,
              order[key].recipient_phone_number,
              order[key].sender_email,
              order[key].sender_name,
              order[key].sender_phone_number,
              order[key].time_order_placed,
              order[key].zone
            )
          );
        }
      } else {
        for (const key in order) {
          loadedOrder.push(
            new scheduledOrder(
              order[key].address_coordinates,
              order[key].address_string,
              order[key].address_string_2,
              order[key].category_name,
              order[key].delivery_note,
              order[key].orderId,
              order[key].os,
              order[key].product_name,
              order[key].recipient_email,
              order[key].recipient_name,
              order[key].recipient_phone_number,
              order[key].schedule,
              order[key].sender_email,
              order[key].sender_name,
              order[key].sender_phone_number,
              order[key].time_order_placed,
              order[key].zone
            )
          );
        }
      }

      dispatch({
        type: SET_ORDER,
        order: order
      });
    } catch (err) {
      console.log('ERROR in fetching order', err);
    }
  };
};

export const setFilters = filterSettings => {
  return { type: SET_FILTERS, filters: filterSettings };
};
