import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  constructor( private http: Http) { }
  

  getReminder(){
    return this.http.get('http://localhost:8080/api/getReminder').map((response: Response) => response.json()) 
  }


  saveReminder(reminder){
    return this.http.post('http://localhost:8080/api/saveReminder', reminder).map((response: Response) => response.json())
  }

}
