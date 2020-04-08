import { FETCH_ZONES } from '../actions/zones';

const initialState = {
  cities: [],
  zones: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ZONES:
      return {
        cities: action.cities,
        zones: action.zones,
      };
    default:
      return state;
  }
};
