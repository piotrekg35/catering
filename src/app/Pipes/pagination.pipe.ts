import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {

  transform(value: any, page: number,elements_on_page:number,dish_list_len:number){
    if(!value)return [];
    if(!page || page==1 && elements_on_page>=dish_list_len)return value;
    return value.slice((page-1)*elements_on_page,page*elements_on_page);
  }
}
