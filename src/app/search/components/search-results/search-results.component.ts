import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs';

import { CheapFlightsActions, PayloadActions } from '../../actions';
import { CheapFlight } from '../../models';

@Component({
  styles: [require('./search-results.component.scss')],
  template: `
    <div *ngIf="(loading$ | async) === true" class="spinner-container">
      <div class="plane-spinner"></div>
    </div>
    <div *ngIf="(loading$ | async) === false">
      <ra-search-result *ngFor="let cheapFlight of (cheapFlights$ | async)" [cheapFlight]="cheapFlight" ></ra-search-result>
      <p *ngIf="(cheapFlights$ | async).length === 0">No flights found!</p>
    </div>
  `
})
export default class SearchResultsComponent implements OnInit  {

  @select(['cheapFlights', 'cheapFlights']) private cheapFlights$: Observable<CheapFlight[]>;
  @select(['cheapFlights', 'loading']) private loading$: Observable<boolean>;

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
