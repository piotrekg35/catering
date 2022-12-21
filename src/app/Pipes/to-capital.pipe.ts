import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toCapital'
})
export class ToCapitalPipe implements PipeTransform {

  transform(text: string):string{
    return text.toUpperCase();
  }

}

