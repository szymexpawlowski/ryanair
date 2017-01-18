import { Injectable } from '@angular/core';
import { Option } from '../models';

@Injectable()
export class OptionConverterService {

  public convert(labelProp: string, valueProp: string, data: any[]): Option[] {
    return data.map((element: any) => ({label: element[labelProp], value: element[valueProp]}));
  }
}
