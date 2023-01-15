import { Component, Input } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {
  new_rating:number=1;
  nick?:string;
  title:string="";
  description:string="";
  date?:Date;
  count:number=0;
  rating_list:any;
  @Input() id:number=0;
  @Input() old_rating:number=0;
  msg:string="";
  constructor(private db: AngularFireDatabase){
  }
  ngOnInit():void{
    let daneRef = this.db.list('ratings/'+String(this.id)).valueChanges();
    daneRef.subscribe((val:any)=>{
      this.count=val.length;
      this.rating_list=val;
    });
  }
  clean():void{
    this.title=this.description="";
    this.nick=undefined;
    this.date=undefined;
    this.new_rating=1;
    this.msg="";
  }
  addRating():void{
    if(this.title===""||this.description.length<50||this.description.length>500||this.new_rating<1||this.new_rating>5){
      this.msg="Błędne dane!"
      return;
    }
    const daneRef = this.db.object('ratings/'+String(this.id)+'/'+String(this.count+1));
    if(this.nick===undefined && this.date===undefined)
      daneRef.set({ index: this.id, title: this.title,description: this.description,rating: this.new_rating});
    else if(this.nick===undefined)
      daneRef.set({ index: this.id, title: this.title,description: this.description,rating: this.new_rating,date:this.date});
    else if(this.date===undefined) 
      daneRef.set({ index: this.id, title: this.title,description: this.description,rating: this.new_rating,nick:this.nick});
    else
    daneRef.set({ index: this.id, title: this.title,description: this.description,rating: this.new_rating,nick:this.nick, date:this.date});

    const daneRef1 = this.db.object('dishes/'+String(this.id));
    if(this.count===0){
      daneRef1.update({ rating: this.new_rating });
    }
    else{
      let newer_rating:number=(this.old_rating*this.count+this.new_rating)/(this.count+1);
      newer_rating=Math.round(newer_rating*10)/10;
      daneRef1.update({ rating: newer_rating });
    }
    this.clean(); 
  }
}
