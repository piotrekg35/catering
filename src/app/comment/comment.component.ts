import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {
  @Input() new_rating:number=1;
  @Input() nick?:string;
  @Input() title:string="";
  @Input() description:string="";
  @Input() date?:Date;
}
