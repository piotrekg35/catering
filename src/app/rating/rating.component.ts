import cli from '@angular/cli';
import { Component, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { RolesService } from '../Services/roles.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {
  new_rating?:number;
  nick:string="";
  title:string="";
  description:string="";
  date?:Date;
  count:number=0;
  rating_list:any;
  @Input() id:number=0;
  @Input() old_rating:number=0;
  userData: Observable<firebase.User|null>;
  msg:string="";
  banned:boolean=false;
  client:boolean=false;
  manager:boolean=false;

  constructor(private db: AngularFireDatabase, private angularFireAuth: AngularFireAuth, rs:RolesService){
    this.userData = angularFireAuth.authState;
    this.userData.subscribe(a=>{
      if(a)
        if(a.email)this.nick=a.email.replace("!",".");
    });
    rs.bannedObservable.subscribe(a=>{
      this.banned=a; 
      if(a)this.msg="Nie masz możliwości oceniania i zostawiania komentarzy!";
    });
    rs.clientObservable.subscribe(a=>this.client=a);
    rs.managerObservable.subscribe(a=>this.manager=a);
  }

  ngOnInit():void{
    let daneRef = this.db.list('ratings/'+String(this.id)).valueChanges();
    daneRef.subscribe((val:Array<any>)=>{
      this.count=val.reduce((prev,curr)=>{
        if(curr.rating)return prev+1;
        else return prev;
      },0);
      this.rating_list=val;
    });
    
  }
  clean():void{
    this.title=this.description=this.nick="";
    this.date=undefined;
    this.new_rating=undefined;
    this.msg="";
  }
  addRating():void{
    if(this.title===""||this.description.length<50||this.description.length>500||this.client && !this.new_rating||
    this.new_rating && this.new_rating<1|| this.new_rating && this.new_rating>5){
      this.msg="Błędne dane!"
      return;
    }
    const daneRef = this.db.object('ratings/'+String(this.id)+'/'+String(this.count+1));
    if(this.new_rating===undefined && this.date===undefined)
      daneRef.set({ index: this.id, title: this.title,description: this.description,nick: this.nick});
    else if(this.new_rating===undefined)
      daneRef.set({ index: this.id, title: this.title,description: this.description,nick:this.nick,date:this.date});
    else if(this.date===undefined) 
      daneRef.set({ index: this.id, title: this.title,description: this.description,rating: this.new_rating,nick:this.nick});
    else
    daneRef.set({ index: this.id, title: this.title,description: this.description,rating: this.new_rating,nick:this.nick, date:this.date});

    const daneRef1 = this.db.object('dishes/'+String(this.id));
    if(this.count===0 && this.new_rating){
      daneRef1.update({ rating: this.new_rating });
    }
    else if(this.new_rating){
      let newer_rating:number=(this.old_rating*this.count+this.new_rating)/(this.count+1);
      newer_rating=Math.round(newer_rating*10)/10;
      daneRef1.update({ rating: newer_rating });
    }
    this.clean(); 
  }
}
