import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterRating'
})
export class FilterRatingPipe implements PipeTransform {

  transform(value: any, rating: number){
    if(!value)return [];
    if(!rating)return value;
    const dishes=[];
    for(const d of value){
      if(d.rating>=rating)dishes.push(d);
    }
    return dishes;
  }

}
