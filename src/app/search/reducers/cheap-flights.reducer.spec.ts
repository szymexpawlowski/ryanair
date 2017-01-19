import { cheapFlightsReducer } from './cheap-flights.reducer';
import { CheapFlightsActions } from './.';

const cheapFlights = [
  {
    "dateFrom": "2015-01-19T04:19:49.760Z",
    "dateTo": "2015-12-09T08:08:32.239Z",
    "currency": "€",
    "price": 16.36174404900521
  },
  {
    "dateFrom": "2014-12-12T22:11:00.608Z",
    "dateTo": "2015-07-08T18:59:12.103Z",
    "currency": "€",
    "price": 75.4496027706191
  }
];

describe('CheapFlightsReducer', () => {

  let state;
  beforeEach(() => {
    state = {
      cheapFlights: []
    };
  });

  describe('receive cheapFlights', () => {
    it('should set cheapFlights to given data', () => {
      const newState = cheapFlightsReducer(state, {
        type: CheapFlightsActions.RECEIVE_CHEAP_FLIGHTS,
        payload: {cheapFlights}
      });
      expect(newState.cheapFlights).toEqual(cheapFlights);
    });
  });
});
