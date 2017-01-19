import { CheapFlightsActions } from '../actions';
import { CheapFlight } from '../models';

export interface ICheapFlightsState {
  cheapFlights: CheapFlight[];
  loading: boolean;
}

const INITIAL_STATE: ICheapFlightsState = {
  cheapFlights: [],
  loading: false
};

const compareByPrice = (flight1: CheapFlight, flight2: CheapFlight): number => {
  if (flight1.price < flight2.price) {
    return -1;
  }

  if (flight1.price > flight2.price) {
    return 1;
  }

  return 0;
};

export function cheapFlightsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CheapFlightsActions.REQUEST_CHEAP_FLIGHTS:
      return Object.assign(state, {loading: true});
    case CheapFlightsActions.RECEIVE_CHEAP_FLIGHTS:
      const cheapFlights = action.payload.cheapFlights.sort(compareByPrice);
      const loading = false;
      return Object.assign(state, {cheapFlights, loading});
    default:
      return state;
  }
}
