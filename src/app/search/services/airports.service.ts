import { Http, Response, Headers } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Airport } from '../models';
import { AppConfig, APP_CONFIG_TOKEN } from '../../../../config/config';

@Injectable()
export class AirportsService {

  private apiUrl: string;

  constructor(private http: Http, @Inject(APP_CONFIG_TOKEN) config: AppConfig) {
    this.apiUrl = config.apiUrls.airports;
  }

  public fetch(): Observable<Airport[]> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.apiUrl, {headers})
      .map((res: Response) => res.json().airports);
  }
}
