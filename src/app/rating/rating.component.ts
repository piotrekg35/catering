import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {
  rates:Array<number>=[];
  rating:number=0;
  new_rating:number=0;
  @Output() sendRatingEvent = new EventEmitter<number>();
  addRating():void{
    if(isNaN(Number(this.new_rating))||Number(this.new_rating)>5||Number(this.new_rating)<0){
      return;
    }
    this.rates.push(this.new_rating);
    this.rating=this.rates.reduce((acc,curr)=>Number(acc)+Number(curr),0)/this.rates.length;
    this.rating=Math.round(this.rating*10)/10;
    this.sendRatingEvent.emit(this.rating);
  }
}
