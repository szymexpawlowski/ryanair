import { Component } from '@angular/core';
import Payload from '../../models/payload';

@Component({
  selector: 'search-form',
  templateUrl: './search-form.component.html'
})
export default class SearchFormComponent {

  public payload = new Payload('STN', 'DUB', '2014-12-02', '2015-01-02');
  public submitted = false;
  public onSubmit() {
    this.submitted = true;
  }
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.payload); }
}