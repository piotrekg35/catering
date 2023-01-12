import { Pipe, PipeTransform } from '@angular/core';
import { __values } from 'tslib';
import { CurrencyService } from '../Services/currency.service';

@Pipe({
  name: 'currency',
  pure: false
})
export class CurrencyPipe implements PipeTransform {
  transform(price: number, cs:CurrencyService): string {
    if(cs.InUSD)return price+" USD";
    return Math.round(price/cs.EUR2USD*100)/100+" EUR";
  }

}
