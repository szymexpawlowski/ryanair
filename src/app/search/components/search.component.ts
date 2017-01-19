import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs';

import { Airport, Payload} from '../models';
import { AirportsActions, PayloadActions } from '../actions';

@Component({
  template: `
    <search-form (performSearch)="onPerformSearch($event)" [airports]="airports$ | async" [payload]="(payload$ | async)"></search-form>
    <router-outlet></router-outlet>
  `
})
export default class SearchComponent implements OnInit {

  @select(['airports', 'airports']) private airports$: Observable<Airport[]>;
  @select(['payload', 'payload']) private payload$: Observable<Payload>;

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