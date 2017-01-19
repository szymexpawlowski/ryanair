import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule }   from '@angular/http';

import SearchComponent from './components/search.component';
import SearchRoutingModule  from './search-routing.module';
import SearchResultsComponent  from './components/search-results/search-results.component';
import SearchFormComponent  from './components/search-form/search-form.component';
import { AirportsService, CheapFlightsService, OptionConverterService } from './services';
import { AirportsActions, CheapFlightsActions } from './actions';
import { OptionFilterPipe } from './pipes';
import Autocomplete from './components/autocomplete/autocomplete.component';
import AirportsComponent from './components/search-form/airports.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    CommonModule,
    SearchRoutingModule
  ],
  declarations: [
    Autocomplete,
    AirportsComponent,
    SearchComponent,
    SearchFormComponent,
    SearchResultsComponent,
    OptionFilterPipe
  ],
  providers: [
    AirportsService,
    AirportsActions,
    CheapFlightsService,
    CheapFlightsActions,
    OptionConverterService
  ],
  bootstrap: [ SearchComponent ]
})
export class SearchModule { }
