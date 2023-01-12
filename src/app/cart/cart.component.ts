import { Component } from '@angular/core';
import { CartService, DishGeneral } from '../Services/cart.service';
import { CurrencyService } from '../Services/currency.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  reserved:Array<DishGeneral>=[];
  constructor(private cs:CartService,public curr:CurrencyService){
    this.reserved=cs.reserved;
  }
  getPriceSum():number{
    return Math.round(this.reserved.reduce(function(prev,curr){return prev+curr.ordered*curr.price},0)*100)/100;
  }
}
