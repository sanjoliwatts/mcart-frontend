import { Pipe, PipeTransform } from '@angular/core';
import { Products } from './products';


@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  transform(value: Products[], args?: string): Products[] {
    console.log("Inside transform method of sortBy");
    if (args === 'popularity') {
      return value.sort((a: any, b: any) => {
        if (a.rating > b.rating) {
          return -1;
        } else if (a.rating < b.rating) {
          return 1;
        } else {
          return 0;
        }
      });
    } else if (args === 'pricelh') {
      return value.sort((a: any, b: any) => {
        if (a.price < b.price) {
          return -1;
        } else if (a.price > b.price) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    else if (args === 'pricehl') {
      return value.sort((a: any, b: any) => {
        if (a.price > b.price) {
          return -1;
        } else if (a.price < b.price) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    console.log("value "+value);
    return value;

  }

}
