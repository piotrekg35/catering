import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterIngridients'
})
export class FilterIngridientsPipe implements PipeTransform {

  transform(value: any, ingr: string){
    if(!value)return [];
    if(!ingr)return value;
    const dishes=[];
    for(const d of value){
      if(d.ingridients.toLowerCase().includes(ingr.toLowerCase()))dishes.push(d);
    }
    return dishes;
  }

}
