import { Http, Response } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CheapFlight } from '../models';
import { AppConfig, APP_CONFIG_TOKEN } from '../../../config/config';

@Injectable()
export class CheapFlightsService {

  private apiUrl: string;

  constructor(private http: Http, @Inject(APP_CONFIG_TOKEN) config: AppConfig) {
    this.apiUrl = config.apiUrls.cheapFlights;
  }

  public fetch(from: string, to: string, startDate: string, endDate: string): Observable<CheapFlight[]> {
    return this.http.get(`${this.apiUrl}from/${from}/to/${to}/${startDate}/${endDate}/250/unique/`)
      .map((res: Response) => res.json().flights);
  }
}
