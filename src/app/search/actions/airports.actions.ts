import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../reducers';
import { AirportsService } from '../services';
import { Airport } from '../models';

@Injectable()
export class AirportsActions {

  static REQUEST_AIRPORTS = 'REQUEST_AIRPORTS';
  static RECEIVE_AIRPORTS = 'RECEIVE_AIRPORTS';

  constructor (private ngRedux: NgRedux<IAppState>, private airportsService: AirportsService) { }

  fetch(): void {
    this.ngRedux.dispatch({ type: AirportsActions.REQUEST_AIRPORTS });
    this.airportsService.fetch().subscribe((airports: Airport[]) => {
      this.ngRedux.dispatch({ type: AirportsActions.RECEIVE_AIRPORTS, payload: {airports}});
    });
  }
}
