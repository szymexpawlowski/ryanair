import { AirportsActions } from '../actions';
import { Airport } from '../models';

export interface IAirportsState {
  airports: Airport[];
}

const INITIAL_STATE: IAirportsState = {
  airports: []
};

export function airportsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AirportsActions.REQUEST_AIRPORTS:
      return state;
    case AirportsActions.RECEIVE_AIRPORTS:
      return Object.assign(state, action.payload);
    default:
      return state;
  }
}
