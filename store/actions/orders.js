import { onDemandOrder, scheduledOrder } from '../../models/Order';

export const SET_ORDERS = 'SET_ORDERS';

export const fetchOrders = () => {
  return async dispatch => {
    try {
      const response = await fetch(
        'https://us-central1-gesture-dev.cloudfunctions.net/logistics_orders'
      );

      if (!response.ok) {
        throw new Error('Something went wrong in fetching orders!');
      }

      const resData = await response.json();

      const loadedOrders = [];
      const orders = resData.result.data;

      for (const key in orders) {
        if (!orders[key].schedule) {
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
        } else {
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
