import { Component } from '@angular/core';
import { Payload } from '../../models';

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
}
