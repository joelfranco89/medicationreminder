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
  
  url = 'http://localhost:8080' || process.env.LIVEURL
  
  getReminder(){
    return this.http.get(this.url + '/api/getReminder').map((response: Response) => response.json()) 
  }


  saveReminder(reminder){
    return this.http.post(this.url + '/api/saveReminder', reminder).map((response: Response) => response.json())
  }

}
