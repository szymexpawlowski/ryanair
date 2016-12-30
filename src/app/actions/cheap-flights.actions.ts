import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../reducers';
import { CheapFlightsService } from '../services';
import { CheapFlight } from '../models';

@Injectable()
export class CheapFlightsActions {

  static REQUEST_CHEAP_FLIGHTS = 'REQUEST_CHEAP_FLIGHTS';
  static RECEIVE_CHEAP_FLIGHTS = 'RECEIVE_CHEAP_FLIGHTS';

  constructor (private ngRedux: NgRedux<IAppState>, private cheapFlightsService: CheapFlightsService) { }

  fetch(from: string, to: string, startDate: string, endDate: string): void {
    this.ngRedux.dispatch({ type: CheapFlightsActions.REQUEST_CHEAP_FLIGHTS });
    this.cheapFlightsService.fetch(from, to, startDate, endDate).subscribe((cheapFlights: CheapFlight[]) => {
      this.ngRedux.dispatch({ type: CheapFlightsActions.RECEIVE_CHEAP_FLIGHTS, payload: {cheapFlights}});
    });
  }
}
