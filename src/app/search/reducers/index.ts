import { combineReducers } from 'redux';
import { IAirportsState, airportsReducer } from './airports.reducer';
import { ICheapFlightsState, cheapFlightsReducer } from './cheap-flights.reducer';

export interface IAppState {
  airports?: IAirportsState;
  cheapFlights?: ICheapFlightsState;
}

export const rootReducer = combineReducers<IAppState>({
  airports: airportsReducer,
  cheapFlights: cheapFlightsReducer
});
