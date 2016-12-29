import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }   from '@angular/http';

import AppComponent from './app.component';
import SearchFormComponent  from './components/search-form/search-form.component';
import { AirportsService, CheapFlightsService } from './services';
import { APP_CONFIG, APP_CONFIG_TOKEN } from '../../config/config';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    SearchFormComponent
  ],
  providers: [
    AirportsService,
    CheapFlightsService,
    { provide: APP_CONFIG_TOKEN, useValue: APP_CONFIG }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
