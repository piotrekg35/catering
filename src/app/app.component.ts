import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { CartService } from './Services/cart.service';
import { CurrencyService } from './Services/currency.service';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'catering';
  ordered:number=0;
  isLoggedIn:boolean=false;
  userData: Observable<firebase.User|null>;
  name:string=""; 

  constructor(private cs:CartService,private curr:CurrencyService,private angularFireAuth: AngularFireAuth){
    this.userData = angularFireAuth.authState;
    this.userData.subscribe(a=>{
      if(!a)this.isLoggedIn=false;
      else {
        this.isLoggedIn=true;
        if(a.email)this.name=a.email.split('@')[0];
      }
    })
  }
  logout():void{
    this.angularFireAuth.signOut();
  }
  ngOnInit():void{
    this.cs.countObservable.subscribe(c=>this.ordered=c);
  }
  changeCurrSettings():void{
    this.curr.InUSD=!this.curr.InUSD;
  }
}
