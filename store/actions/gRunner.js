import { Grunner } from '../../models/Grunner';

export const SET_GRUNNERS = 'SET_GRUNNERS';

export const fetchGrunners = () => {
  return async dispatch => {
    try {
      const response = await fetch(
        'https://us-central1-gesture-dev.cloudfunctions.net/logistics_grunners'
      );

      if (!response.ok) {
        throw new Error('Something went wrong in fetching gRunners!');
      }

      const resData = await response.json();

      const loadGrunners = [];
      const gRunners = resData.result.data;

      for (const key in gRunner) {
        loadGrunners.push(
          new Grunner(
            gRunner[key].uid,
            gRunner[key].current_order,
            gRunner[key].current_status,
            gRunner[key].current_zone,
            gRunner[key].first_name,
            gRunner[key].last_name,
            gRunner[key].os,
            gRunner[key].public_courier_id
          )
        );
      }

      dispatch({
        type: SET_GRUNNERS,
        gRunners: loadGrunners
      });
    } catch (err) {
      console.log('ERROR IN FETCHING GRUNNERS', err);
    }
  };
};
