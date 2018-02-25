import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable'
@Injectable()
export class OrdersService {

  x:number;
  data: any = null;
  constructor(private _http: Http) {

  }

  load() {

    let res= this._http.get('http://localhost:5001/listOrders?start=0&size=40')
      .map((res: Response) => res.json())
    return res

  }

  loadOne(z){
    let res= this._http.get('http://localhost:5001/listOrders?start='+z+'&size=1')
      .map((res: Response) => res.json())
    return res
  }




}
