import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs';

import { Airport, Payload } from '../../models';
import { AirportsActions, PayloadActions } from '../../actions';

@Component({
  styles: [require('./search.component.scss')],
  template: `
    <ra-search-form 
      (performSearch)="onPerformSearch($event)" 
      [airports]="airports$ | async" 
      [payload]="(payload$ | async)"></ra-search-form>
    <router-outlet></router-outlet>
  `
})
export default class SearchComponent implements OnInit {

  /* tslint:disable:no-unused-variable */
  @select(['airports', 'airports']) private airports$: Observable<Airport[]>;
  @select(['payload', 'payload']) private payload$: Observable<Payload>;
  /* tslint:enable:no-unused-variable */

  constructor(
    private airportsActions: AirportsActions,
    private payloadActions: PayloadActions,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.airportsActions.fetch();
  }

  onPerformSearch(payload: Payload) {
    const {from, to, startDate, endDate} = payload;
    this.payloadActions.setPayload(payload);
    this.router.navigate([from, to, startDate, endDate], { relativeTo: this.route });
  }
}
