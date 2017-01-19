import { airportsReducer } from './airports.reducer';
import { AirportsActions } from '../actions';

const airports = [
  {
    'iataCode': 'AAR',
    'name': 'Aarhus',
    'base': false,
    'latitude': 56.3,
    'longitude': 10.619,
    'country': {
      'code': 'dk',
      'name': 'Denmark',
      'seoName': 'denmark',
      'englishSeoName': 'denmark',
      'currency': 'DKK',
      'url': 'denmark'
    }
  },
  {
    'iataCode': 'AGA',
    'name': 'Agadir',
    'base': false,
    'latitude': 30.325,
    'longitude': -9.41307,
    'country': {
      'code': 'ma',
      'name': 'Morocco',
      'seoName': 'morocco',
      'englishSeoName': 'morocco',
      'currency': 'MAD',
      'url': 'morocco'
    }
  }
];

describe('AirportsReducer', () => {

  let state;
  beforeEach(() => {
    state = {
      airports: []
    };
  });

  describe('receive airports', () => {
    it('should set airports to given data', () => {
      const newState = airportsReducer(state, {
        type: AirportsActions.RECEIVE_AIRPORTS,
        payload: {airports}
      });
      expect(newState.airports).toEqual(airports);
    });
  });
});
