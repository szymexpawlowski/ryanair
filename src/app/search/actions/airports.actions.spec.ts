import { async, inject, TestBed } from '@angular/core/testing';
import { NgRedux } from 'ng2-redux';
import { Observable } from 'rxjs';

import { AirportsActions } from './airports.actions';
import { AirportsService } from '../services';
import { IAppState } from '../reducers/index';

const airports = [{
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
}];

class StubRedux {
  dispatch: any;
}

describe('AirportsActions', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AirportsActions,
        {
          provide: AirportsService,
          useValue: {
            fetch: () => {
              return Observable.from([airports]);
            }
          }
        },
        {
          provide: NgRedux,
          useClass: StubRedux
        }
      ]
    });
  });

  let airportsActions: AirportsActions;
  let ngRedux: NgRedux<IAppState>;
  beforeEach(inject([AirportsActions, NgRedux], (...deps) => {
    airportsActions = deps[0];
    ngRedux = deps[1]
  }));

  describe('fetch', () => {

    it('should dispatch REQUEST_AIRPORTS and then RECEIVE_AIRPORTS', async((done) => {
      ngRedux.dispatch = jasmine.createSpy('dispatch');
      airportsActions.fetch();
      expect((<any>ngRedux.dispatch).calls.argsFor(0)).toEqual([{type: AirportsActions.REQUEST_AIRPORTS}]);
      expect((<any>ngRedux.dispatch).calls.argsFor(1)).toEqual([{type: AirportsActions.RECEIVE_AIRPORTS, payload: {airports}}]);
    }));
  });
});
