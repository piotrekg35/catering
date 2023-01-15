import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { BehaviorSubject, Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import cli from '@angular/cli';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  userData: Observable<firebase.User|null>;
  admin:boolean=false;
  client:boolean=false;
  manager:boolean=false;
  banned:boolean=false;
  adminObservable = new BehaviorSubject<boolean>(false);
  clientObservable = new BehaviorSubject<boolean>(false);
  managerObservable = new BehaviorSubject<boolean>(false);
  bannedObservable = new BehaviorSubject<boolean>(false);
  constructor(private angularFireAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.userData = angularFireAuth.authState; 
    this.userData.subscribe(a=>{
      if(!a?.email)return;
      let obj=db.object("users/"+a?.email.replace(".","!")).valueChanges();
      obj.subscribe((b:any)=>{
        this.adminObservable.next(b.admin);
        this.clientObservable.next(b.client);
        this.managerObservable.next(b.manager);
        this.bannedObservable.next(b.banned);
      })
    })
  }
}
