import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-adding-dish',
  templateUrl: './adding-dish.component.html',
  styleUrls: ['./adding-dish.component.css']
})
export class AddingDishComponent {
  message:string="Dodaj danie";
  name:string="";
  origin:string="";
  type:string="";
  ingridients:string="";
  max_amount:string="";
  price:string="";
  description:string="";
  link_to_photos:string="";
  @Output() addDishEvent = new EventEmitter<Array<string>>();

  openModal():void{
    var modal = document.querySelector(".modal");
    if(modal===null)return;
    modal.classList.remove("modal-hidden")
  }
  closeModal():void{
    var modal = document.querySelector(".modal");
    if(modal===null)return;
    modal.classList.add("modal-hidden");
    this.message="Dodaj danie";
  }
  addDish():void{
    if(this.name.trim()==="" || this.origin.trim()===""||this.type.trim()===""||this.ingridients.trim()===""||this.price.trim()===""||
    this.description.trim()===""||this.link_to_photos.split(",").length<2){
      this.message="Błędne dane!";
      return;
    }
    let arr=new Array<string>(this.name,this.origin,this.type,this.ingridients,this.max_amount,this.price,this.description,this.link_to_photos);
    this.message="Sukces!";
    this.name=this.origin=this.type=this.ingridients=this.max_amount=this.price=this.description=this.link_to_photos="";
    this.addDishEvent.emit(arr);
  }
}
