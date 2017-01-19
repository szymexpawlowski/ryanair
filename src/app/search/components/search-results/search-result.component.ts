import { Component, Input } from '@angular/core';

import { CheapFlight } from '../../models';

@Component({
  selector: 'search-result',
  styles: [require('./search-result.component.scss')],
  template: `
    <p class="price">{{ cheapFlight.price | currency:'EUR':true:'1.2-2' }}</p>
    <p><span>From:</span> {{ cheapFlight.dateFrom | date:'dd-MM-yy'}}</p>
    <p><span>To:</span> {{ cheapFlight.dateTo | date:'dd-MM-yy' }}</p>
  `
})
export default class SearchResultComponent {

  @Input() private cheapFlight: CheapFlight;
}
