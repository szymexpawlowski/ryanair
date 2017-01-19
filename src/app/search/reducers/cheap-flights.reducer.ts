import { CheapFlightsActions } from '../actions';
import { CheapFlight } from '../models';

export interface ICheapFlightsState {
  cheapFlights: CheapFlight[];
}

const INITIAL_STATE: ICheapFlightsState = {
  cheapFlights: []
};

export function cheapFlightsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CheapFlightsActions.REQUEST_CHEAP_FLIGHTS:
      return state;
    case CheapFlightsActions.RECEIVE_CHEAP_FLIGHTS:
      return Object.assign(state, action.payload);
    default:
      return state;
  }
}
