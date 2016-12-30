import { inject, TestBed } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions, ResponseOptions, Response } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { APP_CONFIG_TOKEN } from '../../../config/config';
import { AirportsService } from './airports.service';

const url = 'http://dummy-host';

describe('AirportsService', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        { provide: APP_CONFIG_TOKEN, useValue: {apiUrls: { airports: url }} },
        AirportsService,
        {
          provide: Http,
          useFactory: (mockBackend: MockBackend, options: BaseRequestOptions) => {
            return new Http(mockBackend, options);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        MockBackend,
        BaseRequestOptions
      ]
    });
  });

  describe('fetch', () => {

    const airports = [{
      "iataCode": "AAR",
      "name": "Aarhus",
      "base": false,
      "latitude": 56.3,
      "longitude": 10.619,
      "country": {
        "code": "dk",
        "name": "Denmark",
        "seoName": "denmark",
        "englishSeoName": "denmark",
        "currency": "DKK",
        "url": "denmark"
      }
    }];
    const mockedResponse = { airports };

    it('should return an Observable with airports',
      inject([AirportsService, MockBackend], (airportsService, mockBackend) => {

        mockBackend.connections.subscribe((connection) => {
          expect(connection.request.url).toBe(url);
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockedResponse)
          })));
        });

        airportsService.fetch().subscribe((response) => {
          expect(response).toEqual(airports);
        });
      })
    );
  });
});
