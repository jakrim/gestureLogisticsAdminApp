import { SET_GRUNNERS, SET_GRUNNER, FETCH_ZONES } from '../actions/gRunner';

import { makeLowercaseCities } from '../../components/HelperFunctions';

const initialState = {
  gRunners: [],
  gRunner: [],
  filters: [],
  cities: [],
  city_zones: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GRUNNERS:
      const appliedFilters = action.filters;

      if (appliedFilters === undefined || appliedFilters === {}) {
        return {
          ...state,
          gRunners: action.gRunners,
        };
      } else {
        const filteredGrunners = action.gRunners.filter((gRunner) => {
          if (appliedFilters.isCity) {
            if (
              appliedFilters.cities.length === 0 ||
              appliedFilters.cities === undefined
            ) {
              return false;
            }
            let mappedCities = makeLowercaseCities(appliedFilters.cities);
            if (!mappedCities.includes(gRunner.city)) {
              return false;
            }
          }
          if (
            appliedFilters.hasCurrentOrder === true &&
            gRunner.current_order === null
          ) {
            return false;
          }
          if (
            appliedFilters.filter === 'online' &&
            gRunner.current_status === 'offline'
          ) {
            return false;
          }
          if (
            appliedFilters.filter === 'offline' &&
            gRunner.current_status === 'online'
          ) {
            return false;
          }
          return true;
        });
        return {
          ...state,
          gRunners: filteredGrunners,
        };
      }
    case SET_GRUNNER:
      return {
        ...state,
        gRunner: action.gRunner,
      };
    case FETCH_ZONES:
      return {
        ...state,
        cities: action.cities,
        city_zones: action.city_zones,
      };
    default:
      return state;
  }
};
