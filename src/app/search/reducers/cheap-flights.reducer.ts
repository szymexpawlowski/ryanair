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
      const cheapFlights = action.payload.cheapFlights.sort(compareByPrice)
      return Object.assign(state, {cheapFlights});
    default:
      return state;
  }
}

const compareByPrice = (flight1: CheapFlight, flight2: CheapFlight): number => {
  if (flight1.price < flight2.price) {
    return -1;
  }

  if (flight1.price > flight2.price) {
    return 1;
  }

  return 0;
};
