import { Grunners } from '../../models/Grunners';
import { mapCities } from '../../components/HelperFunctions';
import { basicUrl, URL } from '../../database/index.js';

export const SET_GRUNNERS = 'SET_GRUNNERS';
export const SET_GRUNNER = 'SET_GRUNNER';
export const SET_FILTERS = 'SET_FILTERS';
export const FETCH_ZONES = 'FETCH_ZONES';

export const fetchGrunners = (gfilters) => {
  return async (dispatch, getState) => {
    var _basicUrl = await basicUrl();
    let city_zones = getState().gRunners.city_zones;
    try {
      const response = await fetch(
        `${URL}/logistics_grunners?${_basicUrl}`
        // 'https://us-central1-yourgestureapp.cloudfunctions.net/logistics_grunners?uid=D2LzzJFvKOM8sIEB4z4iU8VUiu72'
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

      function getCity(zone) {
        for (cityId in city_zones) {
          var cityMiniZones = city_zones[cityId];
          if (cityMiniZones.includes(zone)) {
            return cityId;
          }
        }
        return null;
      }

      function mapCityToGRunner(grunnersArr) {
        var mappedArr = [];

        for (gRunner of grunnersArr) {
          var zone = gRunner[`current_zone`];
          var city = getCity(zone);
          var gRunnerData = gRunner;
          gRunnerData['city'] = city;
          mappedArr.push(gRunnerData);
        }

        return mappedArr;
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
    var _basicUrl = await basicUrl();
    try {
      const response = await fetch(
        // `https://us-central1-gesture-dev.cloudfunctions.net/logGRunnerInfo?courierId=${uid}`
        // `https://us-central1-yourgestureapp.cloudfunctions.net/logistics_grunner?courierId=${uid}`
        `${URL}/logistics_grunner?${_basicUrl}&courierId=${uid}`
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
    var _basicUrl = await basicUrl();
    try {
      const response = await fetch(
        `${URL}/logistics_zones?${_basicUrl}`
        // 'https://us-central1-yourgestureapp.cloudfunctions.net/logistics_zones'
      );

      if (!response.ok) {
        throw new Error('Something went wrong in fetching zones!');
      }

      const resData = await response.json();

      const cities = resData.result.data.cities.split(',');
      let finalCities = mapCities(cities);

      const city_zones = resData.result.data.city_zones;

      dispatch({
        type: FETCH_ZONES,
        city_zones: city_zones,
        cities: finalCities,
      });
    } catch (err) {
      console.log('Error in fetching zones!', err);
    }
  };
};
