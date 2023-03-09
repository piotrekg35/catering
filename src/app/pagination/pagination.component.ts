import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  faChevronLeft=faChevronLeft;
  faChevronRight=faChevronRight;
  nr:number=20;
  idx:number=1;
  @Input() number_of_dishes:number=0;
  @Output() stronaEvent=new EventEmitter<Array<number>>();

  emit():void{
    this.stronaEvent.emit([this.idx,this.nr]);
  }
  resetPage():void{
    this.idx=1;
    this.emit();
  }
  next():void{
    if(this.number_of_dishes-this.idx*this.nr>0){
      this.idx++;
    }
    this.emit()
    
  }
  prev():void{
    if(this.idx>1){
      this.idx--;
    }
    this.emit()
  }
}
