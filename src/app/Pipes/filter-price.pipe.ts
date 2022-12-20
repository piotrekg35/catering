import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPrice'
})
export class FilterPricePipe implements PipeTransform {

  transform(value: any, price: number){
    if(!value)return [];
    if(!price || price<=0)return value;
    const dishes=[];
    for(const d of value){
      if(d.price<=price)dishes.push(d);
    }
    return dishes;
  }

}
