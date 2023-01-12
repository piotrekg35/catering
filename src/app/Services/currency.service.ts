import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  InUSD:boolean=true;
  EUR2USD:number=1.07;
  constructor() { }
}
