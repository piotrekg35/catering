import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  admin:boolean=false;
  client:boolean=false;
  manager:boolean=false;
  constructor() { }
}
