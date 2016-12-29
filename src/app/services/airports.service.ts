import { Http, Response, Headers } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import 'rxjs/add/operator/map';

// import Airport from '../models/airport';
import { AppConfig, APP_CONFIG_TOKEN } from '../../../config/config';

@Injectable()
export class AirportsService {

  private apiUrl: string;

  constructor(private http: Http, @Inject(APP_CONFIG_TOKEN) config: AppConfig) {
    this.apiUrl = config.apiUrls.airports;
  }

  public fetch() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.apiUrl, {headers})
      .map((res: Response) => res.json().airports);
  }
}
