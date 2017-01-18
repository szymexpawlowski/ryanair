import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Airport, Option, Payload } from '../../models';
import { OptionConverterService } from '../../services';

@Component({
  selector: 'search-form',
  templateUrl: './search-form.component.html'
})
export default class SearchFormComponent {

  @Input() payload: Payload;
  @Input() airports: Airport[];
  @Output() private performSearch = new EventEmitter<Payload>();

  private options: Option[] = [];

  constructor(private optionConverterService: OptionConverterService) { }

  public onSubmit() {
    // console.log(this.payload);
    this.performSearch.emit(this.payload);
  }

  ngOnChanges() {
    if (this.airports.length > 0) {
      this.options = this.optionConverterService.convert('name', 'iataCode', this.airports);
    }
  }

  onFromChanged(value) {
    this.payload.from = value;
  }

  onToChanged(value) {
    this.payload.to = value;
  }

}
