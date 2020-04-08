export const FETCH_ZONES = 'FETCH_ZONES';

export const fetchZones = () => {
  return async (dispatch) => {
    try {
      const response = fetch(
        'https://us-central1-gesture-dev.cloudfunctions.net/logistics_zones'
      );

      if (!response.ok) {
        throw new Error('Something went wrong in fetching zones!');
      }

      const resData = await response.json();

      const cities = resData.result.data.cities;
      const zones = resData.result.data.city_zones;

      dispatch({ type: FETCH_ZONES, zones: zones, cities: cities });
    } catch (err) {
      console.log('Error in fetching zones!', err);
    }
  };
};
