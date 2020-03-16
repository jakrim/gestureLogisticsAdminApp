import axios from 'axios';

export const getOrderData = () => {
  return axios
    .get('https://us-central1-gesture-dev.cloudfunctions.net/logistics_orders')
    .then(data => {
      return data;
    })
    .catch(err => {
      console.log('ERROR IN FETCHING ORDERS', err);
    });
};
