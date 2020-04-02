import { Grunners, Grunner } from '../../models/Grunners';

export const SET_GRUNNERS = 'SET_GRUNNERS';
export const SET_GRUNNER = 'SET_GRUNNER';

export const fetchGrunners = () => {
  return async dispatch => {
    try {
      const response = await fetch(
        'https://us-central1-gesture-dev.cloudfunctions.net/logisticsGRunners'
      );

      if (!response.ok) {
        throw new Error('Something went wrong in fetching gRunners!');
      }

      const resData = await response.json();

      const loadGrunners = [];
      const gRunners = resData.result.data;

      for (const key in gRunners) {
        loadGrunners.push(
          new Grunners(
            gRunners[key].uid,
            gRunners[key].current_order,
            gRunners[key].current_status,
            gRunners[key].current_zone,
            gRunners[key].first_name,
            gRunners[key].last_name,
            gRunners[key].os,
            gRunners[key].public_courier_id
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

export const fetchGrunner = uid => {
  return async dispatch => {
    try {
      const response = await fetch(
        `https://us-central1-gesture-dev.cloudfunctions.net/logistics_grunner?uid=${uid}`
      );

      if (!response.ok) {
        throw new Error('Something went wrong in fetching gRunners!');
      }

      const resData = await response.json();

      const gRunner = resData.result.data;

      dispatch({
        type: SET_GRUNNER,
        gRunner: gRunner
      });
    } catch (err) {
      console.log('ERROR IN FETCHING GRUNNER!', err);
    }
  };
};
