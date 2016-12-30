import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }   from '@angular/http';
import { NgReduxModule, NgRedux } from 'ng2-redux';
import { IAppState, rootReducer } from './reducers';

import AppComponent from './app.component';
import SearchFormComponent  from './components/search-form/search-form.component';
import { AirportsService, CheapFlightsService } from './services';
import { AirportsActions, CheapFlightsActions } from './actions';
import { APP_CONFIG, APP_CONFIG_TOKEN } from '../../config/config';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgReduxModule.forRoot(),
    CommonModule
  ],
  declarations: [
    AppComponent,
    SearchFormComponent
  ],
  providers: [
    AirportsService,
    AirportsActions,
    CheapFlightsService,
    CheapFlightsActions,
    { provide: APP_CONFIG_TOKEN, useValue: APP_CONFIG }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.configureStore(rootReducer, {});
  }
}
