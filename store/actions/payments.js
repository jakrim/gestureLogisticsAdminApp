import { Payment } from '../../models/Payment';

export const SET_PAYMENTS = 'SET_PAYMENTS';

export const fetchPayments = uid => {
  return async dispatch => {
    try {
      const response = await fetch(
        `https://us-central1-gesture-dev.cloudfunctions.net/paymentHistoryLogistics?uid=${uid}`
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
            payments[key].uid,
            payments[key].payment,
            payments[key].bonus,
            payments[key].tips,
            payments[key].orderId,
            payments[key].delivery_completed_note,
            payments[key].delivery_compeleted_time
          )
        );
      }

      dispatch({
        type: SET_PAYMENTS,
        payments: loadPayments
      });
    } catch (err) {
      console.log('ERROR IN FETCHING PAYMENTS', err);
    }
  };
};
