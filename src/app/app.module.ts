import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import AppComponent from './app.component';
import SearchFormComponent  from './components/search-form/search-form.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    SearchFormComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
