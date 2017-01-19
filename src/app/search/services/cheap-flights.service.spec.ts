import { inject, TestBed } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions, ResponseOptions, Response } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { APP_CONFIG_TOKEN } from '../../../../config/config';
import { CheapFlightsService } from './cheap-flights.service';

const url = 'http://dummy-host/';

describe('CheapFlightsService', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        { provide: APP_CONFIG_TOKEN, useValue: {apiUrls: { cheapFlights: url }} },
        CheapFlightsService,
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

    const flights = [
      {
        'dateFrom': '2015-01-19T04:19:49.760Z',
        'dateTo': '2015-12-09T08:08:32.239Z',
        'currency': '€',
        'price': 16.36174404900521
      },
      {
        'dateFrom': '2014-12-12T22:11:00.608Z',
        'dateTo': '2015-07-08T18:59:12.103Z',
        'currency': '€',
        'price': 75.4496027706191
      }
    ];
    const mockedResponse = { flights };

    it('should return an Observable with cheap flights',
      inject([CheapFlightsService, MockBackend], (cheapFlightsService, mockBackend) => {

        const from = 'DUB';
        const to = 'STN';
        const startDate = '2014-12-02';
        const endDate = '2016-02-02';
        mockBackend.connections.subscribe((connection) => {
          expect(connection.request.url).toBe(`${url}from/${from}/to/${to}/${startDate}/${endDate}/250/unique/`);
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockedResponse)
          })));
        });

        cheapFlightsService.fetch(from, to, startDate, endDate).subscribe((response) => {
          expect(response).toEqual(flights);
        });
      })
    );
  });
});
