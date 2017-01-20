import { TestBed, inject } from '@angular/core/testing';

import { OptionFilterPipe } from './option-filter.pipe';
import { Option } from '../models';

describe('OptionFilterPipe', () => {

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      OptionFilterPipe
    ]
  }));

  let optionFilterPipe;
  beforeEach(inject([OptionFilterPipe], (_optionFilterPipe) => {
    optionFilterPipe = _optionFilterPipe;
  }));

  describe('transform', () => {
    it('should transform empty array to empty array', () => {
      expect(optionFilterPipe.transform([], 'any')).toEqual([]);
    });

    it('should leave only options with value different than given value', () => {

      const value = 'value';
      const option1: Option = {
        label: 'option1',
        value: 'value1'
      };
      const option2: Option = {
        label: 'option2',
        value
      };

      expect(optionFilterPipe.transform([option1, option2], value)).toEqual([option1]);
    });
  });
});
