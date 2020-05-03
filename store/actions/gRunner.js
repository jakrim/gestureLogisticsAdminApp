import { Grunners, Grunner } from '../../models/Grunners';
import { mapCityToGRunner } from '../../components/HelperFunctions';

export const SET_GRUNNERS = 'SET_GRUNNERS';
export const SET_GRUNNER = 'SET_GRUNNER';
export const SET_FILTERS = 'SET_FILTERS';
export const FETCH_ZONES = 'FETCH_ZONES';

export const fetchGrunners = (gfilters) => {
  return async (dispatch) => {
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

      let mappedGrunners = mapCityToGRunner(loadGrunners);

      dispatch({
        type: SET_GRUNNERS,
        gRunners: mappedGrunners,
        filters: gfilters,
      });
    } catch (err) {
      console.log('ERROR IN FETCHING GRUNNERS', err);
    }
  };
};

export const fetchGrunner = (uid) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://us-central1-gesture-dev.cloudfunctions.net/logGRunnerInfo?courierId=${uid}`
      );

      if (!response.ok) {
        throw new Error('Something went wrong in fetching gRunner!');
      }

      const resData = await response.json();

      const gRunner = resData.result.data;

      dispatch({
        type: SET_GRUNNER,
        gRunner: gRunner,
      });
    } catch (err) {
      console.log('ERROR IN FETCHING GRUNNER!', err);
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
      const city_zones = resData.result.data.city_zones;

      dispatch({
        type: FETCH_ZONES,
        city_zones: city_zones,
        cities: cities,
      });
    } catch (err) {
      console.log('Error in fetching zones!', err);
    }
  };
};
