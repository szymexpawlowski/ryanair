import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule }   from '@angular/http';
import { NgReduxModule, NgRedux } from 'ng2-redux';
import { IAppState, rootReducer } from './reducers';

import AppComponent from './app.component';
import SearchFormComponent  from './components/search-form/search-form.component';
import { AirportsService, CheapFlightsService, OptionConverterService } from './services';
import { AirportsActions, CheapFlightsActions } from './actions';
import { OptionFilterPipe } from './pipes';
import { APP_CONFIG, APP_CONFIG_TOKEN } from '../../config/config';
import Autocomplete  from './components/autocomplete/autocomplete.component';
import AirportsComponent from './components/search-form/airports.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgReduxModule.forRoot(),
    CommonModule
  ],
  declarations: [
    AppComponent,
    SearchFormComponent,
    Autocomplete,
    AirportsComponent,
    OptionFilterPipe
  ],
  providers: [
    AirportsService,
    AirportsActions,
    CheapFlightsService,
    CheapFlightsActions,
    OptionConverterService,
    { provide: APP_CONFIG_TOKEN, useValue: APP_CONFIG }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.configureStore(rootReducer, {});
  }
}
