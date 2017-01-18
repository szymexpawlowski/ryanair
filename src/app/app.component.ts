import { Component, OnInit } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs';

import { Airport, CheapFlight, Payload} from './models';
import { AirportsActions, CheapFlightsActions } from './actions';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styles: [require('./app.component.scss')]
})
export default class AppComponent implements OnInit {

  public payload = new Payload('', '', '2014-12-02', '2015-01-02');

  @select(['airports', 'airports']) private airports$: Observable<Airport[]>;
  @select(['cheapFlights', 'cheapFlights']) private cheapFlights$: Observable<CheapFlight[]>;

  constructor(private airportsActions: AirportsActions, private cheapFlightsActions: CheapFlightsActions) { }

  ngOnInit() {
    this.airportsActions.fetch();
  }

  onPerformSearch(payload: Payload) {
    console.log('PerformSearch');
    // const {from, to, startDate, endDate} = payload;
    // this.cheapFlightsActions.fetch(from, to, startDate, endDate)
  }
}
