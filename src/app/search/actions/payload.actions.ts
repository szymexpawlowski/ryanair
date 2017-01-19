import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../reducers';
import { Payload } from '../models';

@Injectable()
export class PayloadActions {

  static SET_PAYLOAD = 'SET_PAYLOAD';

  constructor (private ngRedux: NgRedux<IAppState>) { }

  setPayload(newPayload: Payload): void {
    this.ngRedux.dispatch({ type: PayloadActions.SET_PAYLOAD, payload: {payload: newPayload} });
  }
}
