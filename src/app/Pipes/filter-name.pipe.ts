import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterName'
})
export class FilterNamePipe implements PipeTransform {

  transform(value: any, name: string){
    if(!value)return [];
    if(!name)return value;
    const dishes=[];
    for(const d of value){
      if(d.name.toLowerCase().includes(name.toLowerCase()))dishes.push(d);
    }
    return dishes;
  }

}
