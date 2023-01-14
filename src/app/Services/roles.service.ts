import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  admin:boolean=false;
  client:boolean=false;
  manager:boolean=false;
  adminObservable = new BehaviorSubject<boolean>(false);
  clientObservable = new BehaviorSubject<boolean>(false);
  managerObservable = new BehaviorSubject<boolean>(false);
  constructor() { }
}
