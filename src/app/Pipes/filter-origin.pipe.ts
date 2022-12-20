import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterOrigin'
})
export class FilterOriginPipe implements PipeTransform {

  transform(value: any, origin: string){
    if(!value)return [];
    if(!origin)return value;
    const dishes=[];
    for(const d of value){
      if(d.origin.toLowerCase().includes(origin.toLowerCase()))dishes.push(d);
    }
    return dishes;
  }

}
