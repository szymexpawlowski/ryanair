import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import SearchComponent from './components/search/search.component';
import SearchResultsComponent from './components/search-results/search-results.component';

const searchRoutes: Routes = [
  {
    path: 'search',
    component: SearchComponent,
    children: [
      {
        path: ':from/:to/:startDate/:endDate',
        component: SearchResultsComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(searchRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export default class SearchRoutingModule { }
