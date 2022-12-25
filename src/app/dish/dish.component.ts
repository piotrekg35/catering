import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronLeft, faChevronRight, faPlusCircle, faMinusCircle, faTrash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent{
  faChevronLeft=faChevronLeft;
  faChevronRight=faChevronRight;
  faPlusCircle=faPlusCircle;
  faMinusCircle=faMinusCircle;
  faTrash=faTrash;
  @Input() id:number=0;
  @Input() name:String="";
  @Input() origin:String="";
  @Input() type:String="";
  @Input() ingridients:String="";
  @Input() max_amount:number=0;
  @Input() price:number=0;
  @Input() description:String="";
  @Input() link_to_photos:Array<String>=[];
  @Input() isExp:boolean=false;
  @Input() isCheap:boolean=false;
  @Input() rating:number=0;
  photoIndex:number=0;
  photoLink:String="";
  ordered:number=0;
  @Output() orderEvent = new EventEmitter<boolean>();
  @Output() resignEvent = new EventEmitter<boolean>();
  @Output() deleteEvent = new EventEmitter<DishComponent>();
  @Output() updateRatingEvent = new EventEmitter<Array<string>>();


  constructor(private db: AngularFireDatabase,private route:ActivatedRoute,private router:Router){}
  
  ngOnInit():void{
    this.photoLink=this.link_to_photos[this.photoIndex];
  }
  goToDetails(){
    this.router.navigate(['/produkt', this.id]);
  }
  nextImg():void{
    if(this.photoIndex<this.link_to_photos.length-1)
      this.photoIndex++;
    else this.photoIndex=0;
    this.photoLink=this.link_to_photos[this.photoIndex];
  }
  prevImg():void{
    if(this.photoIndex>0)
      this.photoIndex--;
    else this.photoIndex=this.link_to_photos.length-1;
    this.photoLink=this.link_to_photos[this.photoIndex];
  }
  order():void{
    this.max_amount--;
    this.ordered++;
    this.orderEvent.emit(true);
  }
  resign():void{
    if(this.ordered>0)
    {
      this.max_amount++;
      this.ordered--;
      this.resignEvent.emit(true);
    }
  }
  deleteDish():void{
    const daneRef = this.db.object('dishes/'+String(this.id));
    daneRef.remove();
  }
  getRating(n:number){
    this.rating=n;
    this.updateRatingEvent.emit([String(this.name),String(this.rating)])
  }
}
