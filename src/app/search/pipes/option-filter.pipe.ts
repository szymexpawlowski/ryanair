import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { Option } from '../models';

@Pipe({
  name: 'raOptionFilter'
})
@Injectable()
export class OptionFilterPipe implements PipeTransform {
  transform(options: Option[], value: string): any {
    return options.filter((option: Option) => option.value !== value);
  }
}
