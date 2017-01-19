import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Option } from '../../models';

@Component({
  selector: 'ra-airports',
  templateUrl: './airports.component.html'
})
export default class AirportsComponent {

  @Input() from: string;
  @Input() to: string;
  @Input() options: Option[];
  @Output() private fromChanged = new EventEmitter<string>();
  @Output() private toChanged = new EventEmitter<string>();

  onFromChanged(value) {
    this.from = value;
    this.fromChanged.emit(value);
    if (this.from === this.to) {
      this.to = '';
      this.toChanged.emit('')
    }
  }

  onToChanged(value) {
    this.toChanged.emit(value);
    this.to = value;
  }
}
