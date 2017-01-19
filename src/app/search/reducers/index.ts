import { combineReducers } from 'redux';
import { IAirportsState, airportsReducer } from './airports.reducer';
import { ICheapFlightsState, cheapFlightsReducer } from './cheap-flights.reducer';
import { IPayloadState, payloadReducer } from './payload.reducer';

export interface IAppState {
  airports?: IAirportsState;
  cheapFlights?: ICheapFlightsState;
  payload?: IPayloadState;
}

export const rootReducer = combineReducers<IAppState>({
  airports: airportsReducer,
  cheapFlights: cheapFlightsReducer,
  payload: payloadReducer
});
