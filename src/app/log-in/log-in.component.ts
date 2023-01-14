import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

  userData: Observable<firebase.User|null>;
  email_input:string="";
  pwd_input:string="";
  msg:string="";
  
  constructor(private angularFireAuth: AngularFireAuth,private router:Router) {
    this.userData = angularFireAuth.authState;
  }
  login(){
    this.angularFireAuth.signInWithEmailAndPassword(this.email_input,this.pwd_input)
    .then(()=>{this.router.navigate(['/']);})
    .catch((a)=>{
      if (JSON.stringify(a).indexOf("auth/wrong-password")>=0)this.msg="Złe hasło.";
      else if (JSON.stringify(a).indexOf("auth/invalid-email")>=0)this.msg="Błędny email.";
      else if (JSON.stringify(a).indexOf("auth/user-not-found")>=0)this.msg="Użytkownik o podanym emailu nie istnieje.";
      else this.msg="Błędne dane. Spróbuj ponownie!";
      }).finally(()=>{this.angularFireAuth.currentUser.then((a)=>console.log(a?.email));});
  }
  
}
