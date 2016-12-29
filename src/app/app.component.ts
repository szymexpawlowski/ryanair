import { Component } from '@angular/core';
import {AirportsService, CheapFlightsService} from './services/';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export default class AppComponent {

  constructor(private airportsService: AirportsService, private cheapFlightsService: CheapFlightsService) { }

  ngOnInit() {
    this.airportsService.fetch().subscribe((data) => {
      console.log('airportsService');
      console.log(data);
    });

    this.cheapFlightsService.fetch('DUB', 'STN', '2014-12-02', '2015-02-02').subscribe((d) => {
      console.log('cheapFlightsService');
      console.log(d);
    });
  }
}

