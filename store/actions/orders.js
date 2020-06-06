import { Order } from '../../models/Order';

import { properTimeFunc, mapCities } from '../../components/HelperFunctions';
import { basicUrl, URL } from '../../database/index.js';

export const SET_ORDERS = 'SET_ORDERS';
export const SET_ORDER = 'SET_ORDER';
export const SET_FILTERS = 'SET_FILTERS';
export const FETCH_ZONES = 'FETCH_ZONES';
export const RESET_FILTERS = 'RESET_FILTERS';
export const SEARCH_TEXT = 'SEARCH_TEXT';

export const fetchOrders = (filters) => {
  return async (dispatch) => {
    var _basicUrl = await basicUrl();
    try {
      const response = await fetch(
        `${URL}/logistics_orders?${_basicUrl}`
        // 'https://us-central1-gesture-dev.cloudfunctions.net/logPendingOrders'
        // `https://us-central1-yourgestureapp.cloudfunctions.net/logistics_orders?${basicUrl}`
      );

      if (!response.ok) {
        throw new Error('Something went wrong in fetching orders!');
      }

      const resData = await response.json();

      const loadedOrders = [];
      const orders = resData.result.data;

      for (const key in orders) {
        loadedOrders.push(
          new Order(
            orders[key].address_coordinates,
            orders[key].address_string,
            orders[key].address_string_2,
            orders[key].category_name,
            orders[key].delivery_note,
            orders[key].orderID,
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
            orders[key].zone,
            orders[key].city
          )
        );
      }

      let properOrders = properTimeFunc(loadedOrders);

      dispatch({
        type: SET_ORDERS,
        orders: properOrders,
        filters: filters,
      });
    } catch (err) {
      console.log('ERROR in fetching orders', err);
    }
  };
};

export const fetchOrder = (orderID) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        // `https://us-central1-gesture-dev.cloudfunctions.net/logisticsOrder?orderId=${orderID}`
        `${URL}/logistics_order?${basicUrl}&orderId=${orderID}`
      );

      const resData = await response.json();

      const order = resData.result.data;

      const loadedOrder = [];

      for (const key in order) {
        loadedOrder.push(
          new Order(
            order[key].address_coordinates,
            order[key].address_string,
            order[key].address_string_2,
            order[key].category_name,
            order[key].delivery_note,
            order[key].orderID,
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

      dispatch({
        type: SET_ORDER,
        order: order,
      });
    } catch (err) {
      console.log('ERROR in fetching order', err);
    }
  };
};

export const fetchZones = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        'https://us-central1-gesture-dev.cloudfunctions.net/logistics_zones'
      );

      if (!response.ok) {
        throw new Error('Something went wrong in fetching zones!');
      }

      const resData = await response.json();

      const cities = resData.result.data.cities.split(',');
      let finalCities = mapCities(cities);

      const zones = resData.result.data.city_zones;

      dispatch({ type: FETCH_ZONES, zones: zones, cities: finalCities });
    } catch (err) {
      console.log('Error in fetching zones!', err);
    }
  };
};

export const searchText = (searchValue) => {
  return { type: SEARCH_TEXT, searchValue };
};

export const resetFilters = () => {
  return { type: RESET_FILTERS };
};
