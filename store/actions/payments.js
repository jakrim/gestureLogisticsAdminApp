import { Payment } from '../../models/Payment';

const SET_PAYMENTS = 'SET_PAYMENTS';

const fetchPayments = () => {
  return async dispatch => {
    try {
      const response = await fetch(
        'https://us-central1-gesture-dev.cloudfunctions.net/logistics_payment_history'
      );

      if (!response.ok) {
        throw new Error('Something went wrong in fetching payments!');
      }
    } catch (err) {
      console.log('ERROR IN FETCHING PAYMENTS', err);
    }
  };
};
