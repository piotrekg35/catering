import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { RolesService } from '../Services/roles.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

  email_input:string="";
  pwd_input:string="";
  msg:string="";
  
  constructor(private angularFireAuth: AngularFireAuth,private router:Router,private rs:RolesService,private db: AngularFireDatabase) {}
  login(){
    this.angularFireAuth.signInWithEmailAndPassword(this.email_input,this.pwd_input)
    .then(()=>{
      let daneRef = this.db.object('users/'+this.email_input.replace(".","!")).valueChanges();
      daneRef.subscribe((val:any)=>{
      this.rs.adminObservable.next(val.admin);
      this.rs.managerObservable.next(val.manager);
      this.rs.clientObservable.next(val.client);
      this.router.navigate(['/']);
    });
    }).catch((a)=>{
      if (JSON.stringify(a).indexOf("auth/wrong-password")>=0)this.msg="Złe hasło.";
      else if (JSON.stringify(a).indexOf("auth/invalid-email")>=0)this.msg="Błędny email.";
      else if (JSON.stringify(a).indexOf("auth/user-not-found")>=0)this.msg="Użytkownik o podanym emailu nie istnieje.";
      else this.msg="Błędne dane. Spróbuj ponownie!";
      }).finally(()=>{this.angularFireAuth.currentUser.then((a)=>console.log(a?.email));});
  }
  
}
