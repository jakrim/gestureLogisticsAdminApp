import { Payment } from '../../models/Payment';
import { basicUrl, URL } from '../../database/index.js';

export const SET_PAYMENTS = 'SET_PAYMENTS';

export const fetchPayments = (courierId) => {
  return async (dispatch) => {
    var _basicUrl = await basicUrl();
    try {
      const response = await fetch(
        // `https://us-central1-gesture-dev.cloudfunctions.net/logistics_payment_history?uid=${uid}`
        // `https://us-central1-yourgestureapp.cloudfunctions.net/logistics_payment_history?uid=${courierId}`
        // `https://us-central1-yourgestureapp.cloudfunctions.net/logistics_payment_history?uid=0mSAoMqHPiWzJhjbetTNh1euk582`
        `${URL}/logistics_payment_history?${_basicUrl}&courierId=${courierId}`
      );

      if (!response.ok) {
        throw new Error('Something went wrong in fetching payments!');
      }

      const resData = await response.json();

      const loadPayments = [];
      const payments = resData.result.data;

      for (const key in payments) {
        loadPayments.push(
          new Payment(
            payments[key].product_name,
            payments[key].payment,
            payments[key].bonus,
            payments[key].tips,
            payments[key].orderId,
            payments[key].total_time,
            payments[key].completed_date_ms
          )
        );
      }

      dispatch({
        type: SET_PAYMENTS,
        payments: loadPayments,
      });
    } catch (err) {
      console.log('ERROR IN FETCHING PAYMENTS', err);
    }
  };
};
