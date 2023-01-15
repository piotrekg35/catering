import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { CartService } from './Services/cart.service';
import { CurrencyService } from './Services/currency.service';
import firebase from 'firebase/compat/app';
import { RolesService } from './Services/roles.service';
import { Router } from '@angular/router';

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
  admin:boolean=false;
  client:boolean=false;
  manager:boolean=false; 

  constructor(private cs:CartService,private curr:CurrencyService,private angularFireAuth: AngularFireAuth, private rs:RolesService, private router:Router){
    this.userData = angularFireAuth.authState;
    this.userData.subscribe(a=>{
      if(!a)this.isLoggedIn=false;
      else {
        this.isLoggedIn=true;
        if(a.email)this.name=a.email.split('@')[0];
      }
    });
    this.rs.adminObservable.subscribe(a=>this.admin=a);
    this.rs.adminObservable.subscribe(console.log);
    this.rs.clientObservable.subscribe(a=>this.client=a);
    this.rs.managerObservable.subscribe(a=>this.manager=a);
  }
  logout():void{
    this.angularFireAuth.signOut();
    this.rs.adminObservable.next(false);
    this.rs.clientObservable.next(false);
    this.rs.managerObservable.next(false);
    this.cs.count=0;
    this.cs.countObservable.next(0);
    this.cs.reservedObservable.next([]);
    this.cs.reserved.splice(0);
    this.router.navigate(['/']);
  }
  ngOnInit():void{
    this.cs.countObservable.subscribe(c=>this.ordered=c);
  }
  changeCurrSettings():void{
    this.curr.InUSD=!this.curr.InUSD;
  }
}
