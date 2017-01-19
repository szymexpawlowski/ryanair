import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs';

import { CheapFlightsActions, PayloadActions } from '../../actions';
import { CheapFlight } from '../../models';

@Component({
  template: `
    <h1>SearchResultsComponent</h1>
    <div *ngFor="let cheapFlight of (cheapFlights$ | async)">
      {{ cheapFlight.price }}    
    </div>
  `
})
export default class SearchResultsComponent implements OnInit  {

  @select(['cheapFlights', 'cheapFlights']) private cheapFlights$: Observable<CheapFlight[]>;

  constructor(
    private cheapFlightsActions: CheapFlightsActions,
    private payloadActions: PayloadActions,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        const {from, to, startDate, endDate} = params;
        this.cheapFlightsActions.fetch(from, to, startDate, endDate);
        this.payloadActions.setPayload({from, to, startDate, endDate})
      });
  }
}
