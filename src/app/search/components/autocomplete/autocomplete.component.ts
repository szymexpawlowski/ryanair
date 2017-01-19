import {
  Component, Input, Output, OnInit, EventEmitter, ViewChild, ElementRef, AfterViewChecked,
  OnChanges, SimpleChanges
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { Option } from '../../models/option';
import { KEY_ARROW_DOWN, KEY_ARROW_UP, KEY_ESCAPE, KEY_ENTER } from './keys';

@Component({
  selector: 'ra-autocomplete',
  styles: [require('./autocomplete.component.scss')],
  template: `
    <input type="text" class="form-control" [formControl]="input" (blur)="onBlur()" (keydown)="onKeydown($event)" />   
    
    <ul #optionsList *ngIf="isOptionsListVisible()">
      <li 
        *ngFor="let option of visibleOptions; let i=index" 
        (click)="onOptionClicked(option)" 
        [ngClass]="{active: i === optionsPosition}" >{{ option.label }}</li>
    </ul>
    <ul *ngIf="isNoOptionsVisible()">
      <li>No options</li>
    </ul>
  `
})
export default class AutocompleteComponent implements OnInit, OnChanges, AfterViewChecked {

  @Input() private value: string;
  @Input() private options: Option[];
  @Output() private valueChanged = new EventEmitter<string>();
  @ViewChild('optionsList') private optionsList: ElementRef;

  private optionWasClicked = false;
  private optionsListVisible = false;
  private optionsPosition = 0;
  private disableValueChange = false;
  private visibleOptions: Option[] = [];
  private input = new FormControl();

  ngOnInit(): void {
    if (this.value) {
      this.input.setValue(this.value);
    }

    this.input.valueChanges
      .do(this.hideOptionsList)
      .filter(this.filterDisableValueChange)
      .filter(this.filterInputLength)
      .debounceTime(250)
      .subscribe(this.subscribeValueChange);
  }

  ngOnChanges(changes: SimpleChanges) {

    // when value is set in parent component
    if (changes['options'] && !changes['options'].isFirstChange()) {
      this.disableValueChange = true;
      const matchingOption = this.options.find(o => o.value === this.value);
      if (!matchingOption) {
        this.input.setValue('');
        this.visibleOptions = this.options.slice();
      } else {
        this.input.setValue(matchingOption.label);
        this.visibleOptions = this.options.filter(this.filterVisibleOptions(matchingOption.label));
      }

      setTimeout(() => this.disableValueChange = false, 0);
    }

    // only proper values will be set
    if (changes['value'] && !changes['value'].isFirstChange()) {
      const matchingOption = this.options.find(o => o.value === this.value);
      if (!matchingOption) {
        this.input.setValue('');
      }
    }
  }

  ngAfterViewChecked(): void {
    if (this.optionsList && this.optionsList.nativeElement.children[this.optionsPosition]) {
      this.optionsList.nativeElement.children[this.optionsPosition].scrollIntoView();
    }
  }

  private showOptionsList = (): void => {
    this.optionsListVisible = true;
  };

  private hideOptionsList = (): void => {
    this.optionsListVisible = false;
  };

  private filterInputLength = (text: string): boolean => {
    return text.length > 0;
  };

  private filterDisableValueChange = (): boolean => {
    return this.disableValueChange === false;
  };

  private subscribeValueChange = (text: string): void => {
    this.visibleOptions = this.options.filter(this.filterVisibleOptions(text));
    if (this.visibleOptions.length === 0) {
      this.optionsPosition = null;
    } else {
      this.optionsPosition = 0;
    }

    this.showOptionsList();
  };

  private filterVisibleOptions(text: string): (o: Option) => boolean {
    return (o: Option) => {
      const re = new RegExp(`${this.escapeRegExp(text)}`, 'i');
      return re.test(o.label);
    };
  }

  /* tslint:disable:no-unused-variable */
  private onOptionClicked(option: Option): void {
    this.optionWasClicked = true;
    this.optionsPosition = this.visibleOptions.indexOf(option);
    this.selectValue(option);
  }
  /* tslint:enable:no-unused-variable */

  private selectValue(option: Option): void {
    this.disableValueChange = true;
    this.hideOptionsList();
    this.input.setValue(option.label);
    this.valueChanged.emit(option.value);
    this.visibleOptions = this.options.filter(this.filterVisibleOptions(option.label));

    setTimeout(() => this.disableValueChange = false, 0);
  }

  /* tslint:disable:no-unused-variable */
  private onKeydown(e: KeyboardEvent): void {

    const meaningfulKeys = [KEY_ARROW_DOWN, KEY_ARROW_UP, KEY_ESCAPE, KEY_ENTER];
    if (!meaningfulKeys.includes(e.keyCode)) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();
    if (this.isArrowKeyPressed(e.keyCode)) {
      this.handleArrows(e.keyCode);
    }

    if (e.keyCode === KEY_ESCAPE) {
      this.hideOptionsList();
    }

    if (e.keyCode === KEY_ENTER) {
      const option = this.visibleOptions[this.optionsPosition];
      if (option) {
        this.selectValue(option);
      }
    }
  }
  /* tslint:enable:no-unused-variable */

  private handleArrows(keyCode) {
    if (this.optionsListVisible === false) {
      this.showOptionsList();
    } else {
      this.moveOptionsPosition(keyCode);
    }
  }

  private isArrowKeyPressed(keyCode: number): boolean {
    return [KEY_ARROW_DOWN, KEY_ARROW_UP].includes(keyCode);
  }

  private moveOptionsPosition(keyCode) {
    if (keyCode === KEY_ARROW_DOWN && this.optionsPosition < this.visibleOptions.length - 1) {
      this.optionsPosition++;
    }

    if (keyCode === KEY_ARROW_UP && this.optionsPosition > 0) {
      this.optionsPosition--;
    }
  }

  /* tslint:disable:no-unused-variable */
  private onBlur(): void {
    // Timeout is used because onBlur is triggered before click on option
    setTimeout(() => {
      if (!this.optionWasClicked) {
        const matchingOption = this.options.find((o: Option) => o.label === this.input.value);
        if (matchingOption) {
          this.selectValue(matchingOption);
        } else {
          this.input.setValue('');
        }
      }
      this.optionWasClicked = false;
      this.hideOptionsList();
    }, 150);
  }

  private isOptionsListVisible(): boolean {
    return this.optionsListVisible && this.visibleOptions.length > 0;
  }

  private isNoOptionsVisible(): boolean {
    return this.optionsListVisible && this.visibleOptions.length === 0;
  }
  /* tslint:enable:no-unused-variable */

  private escapeRegExp(text): string {
    return text.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
  }
}
