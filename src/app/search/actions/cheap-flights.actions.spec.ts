import { async, inject, TestBed } from '@angular/core/testing';
import { NgRedux } from 'ng2-redux';
import { Observable } from 'rxjs';

import { CheapFlightsActions } from './cheap-flights.actions';
import { CheapFlightsService } from '../services';
import { IAppState } from '../reducers/index';

const cheapFlights = [
  {
    'dateFrom': '2015-01-19T04:19:49.760Z',
    'dateTo': '2015-12-09T08:08:32.239Z',
    'currency': '€',
    'price': 16.36174404900521
  },
  {
    'dateFrom': '2014-12-12T22:11:00.608Z',
    'dateTo': '2015-07-08T18:59:12.103Z',
    'currency': '€',
    'price': 75.4496027706191
  }
];

class StubRedux {
  dispatch: any;
}

describe('CheapFlightsActions', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheapFlightsActions,
        {
          provide: CheapFlightsService,
          useValue: {
            fetch: (from: string, to: string, startDate: string, endDate: string) => {
              return Observable.from([cheapFlights]);
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

  let cheapFlightsActions: CheapFlightsActions;
  let ngRedux: NgRedux<IAppState>;
  beforeEach(inject([CheapFlightsActions, NgRedux], (...deps) => {
    cheapFlightsActions = deps[0];
    ngRedux = deps[1];
  }));

  describe('fetch', () => {

    it('should dispatch REQUEST_CHEAP_FLIGHTS and then RECEIVE_CHEAP_FLIGHTS', async((done) => {
      ngRedux.dispatch = jasmine.createSpy('dispatch');
      const from = 'DUB',
            to = 'STN',
            startDate = '2014-12-02',
            endDate = '2016-02-02';
      cheapFlightsActions.fetch(from, to, startDate, endDate);
      expect((<any>ngRedux.dispatch).calls.argsFor(0)).toEqual([{type: CheapFlightsActions.REQUEST_CHEAP_FLIGHTS}]);
      expect((<any>ngRedux.dispatch).calls.argsFor(1)).toEqual([
        {type: CheapFlightsActions.RECEIVE_CHEAP_FLIGHTS, payload: {cheapFlights}}
      ]);
    }));
  });
});
