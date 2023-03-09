import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { CartService, DishGeneral } from '../Services/cart.service';
import { CurrencyService } from '../Services/currency.service';
import { RolesService } from '../Services/roles.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers:[DatePipe]
})
export class CartComponent {
  reserved:Array<DishGeneral>=[];
  email:string="";
  date:string="";
  msg:string="";
  constructor(private cs:CartService,public curr:CurrencyService, private db: AngularFireDatabase, private rs:RolesService, private datePipe: DatePipe){
    cs.reservedObservable.subscribe(r=>this.reserved=r);
    rs.emailObservable.subscribe(a=>this.email=a.replace(".","!"));
    let tranformed_date = this.datePipe.transform(new Date(), 'dd-MM-yyyy hh:mm:ss');
    if(tranformed_date)this.date=tranformed_date;
  }
  getPriceSum():number{
    return Math.round(this.reserved.reduce(function(prev,curr){return prev+curr.ordered*curr.price},0)*100)/100;
  }
  buy():void{
    this.reserved.forEach((a:DishGeneral)=>{
      this.db.object("orders/"+this.email+"/"+this.date).set({[a.id]:a.ordered});
      this.db.object("dishes/"+a.id).update({max_amount: a.max_amount})
    });
    this.cs.count==0;
    this.cs.countObservable.next(0);
    this.cs.reserved.splice(0,this.cs.reserved.length);
    this.cs.reservedObservable.next([]);
    this.msg="Dziękujemy za zakupy!";
  }
}
