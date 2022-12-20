import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filtering',
  templateUrl: './filtering.component.html',
  styleUrls: ['./filtering.component.css']
})
export class FilteringComponent {
  filtered_name:string="";
  filtered_origin:string="";
  filtered_type:string="";
  filtered_ingridients:string="";
  filtered_price:string="";
  filtered_rating:string="";
  @Output() sendFilterStringEvent = new EventEmitter<Array<string>>();

  sendFilterString():void{
    let arr:Array<string>=[this.filtered_name,this.filtered_origin,this.filtered_type, this.filtered_ingridients, this.filtered_price, this.filtered_rating]
    this.sendFilterStringEvent.emit(arr);
  }
}
