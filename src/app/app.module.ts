import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { NgReduxModule, NgRedux } from 'ng2-redux';

import { IAppState, rootReducer } from './search/reducers';
import AppComponent from './app.component';
import AppRoutingModule from './app-routing.module';
import { APP_CONFIG, APP_CONFIG_TOKEN } from '../../config/config';
import { SearchModule } from './search/search.module';

@NgModule({
  imports: [
    BrowserModule,
    NgReduxModule.forRoot(),
    AppRoutingModule,
    SearchModule
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    { provide: APP_CONFIG_TOKEN, useValue: APP_CONFIG }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.configureStore(rootReducer, {});
  }
}
