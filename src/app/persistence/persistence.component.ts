import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-persistence',
  templateUrl: './persistence.component.html',
  styleUrls: ['./persistence.component.css']
})
export class PersistenceComponent {

  constructor(private fireAuth: AngularFireAuth, private db: AngularFireDatabase){
  }
  ngOnInit():void{
    let daneRef = this.db.object('persistence').valueChanges();
    daneRef.subscribe((val)=>{
      if(JSON.stringify(val).indexOf("local")>=0){
        document.getElementsByTagName("input")[0].checked=true;
        this.fireAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      }
      else if(JSON.stringify(val).indexOf("session")>=0){
        document.getElementsByTagName("input")[1].checked=true;
        this.fireAuth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
      }
      else if(JSON.stringify(val).indexOf("none")>=0){
        document.getElementsByTagName("input")[2].checked=true;
        this.fireAuth.setPersistence(firebase.auth.Auth.Persistence.NONE);
      }
    });
  }
  changePersistenceL():void{
    this.fireAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    this.db.object('persistence').update({ persistence: "local" });
  }
  changePersistenceS():void{
    this.fireAuth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
    this.db.object('persistence').update({ persistence: "session" });
  }
  changePersistenceN():void{
    this.fireAuth.setPersistence(firebase.auth.Auth.Persistence.NONE); 
    this.db.object('persistence').update({ persistence: "none" });
  }
}
