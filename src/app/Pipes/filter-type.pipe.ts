import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterType'
})
export class FilterTypePipe implements PipeTransform {

  transform(value: any, t: string){
    if(!value)return [];
    if(!t)return value;
    const dishes=[];
    for(const d of value){
      if(d.type.toLowerCase().includes(t.toLowerCase()))dishes.push(d);
    }
    return dishes;
  }

}
