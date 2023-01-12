import { Component } from '@angular/core';
import { CartService } from './Services/cart.service';
import { CurrencyService } from './Services/currency.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'catering';
  ordered:number=0;

  constructor(private cs:CartService,private curr:CurrencyService){}
  ngOnInit():void{
    this.cs.countObservable.subscribe(c=>this.ordered=c);
  }
  changeCurrSettings():void{
    this.curr.InUSD=!this.curr.InUSD;
  }
}
