import { Component, OnInit, NgZone } from '@angular/core';
import { OrdersService} from "../orders.service";
import { Order} from "../order"
import 'rxjs/add/operator/map';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Observable'

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
})
export class SellComponent implements OnInit {
  x:number
  sellQueue: Order [];
  max:20;
  data: any = null;
  ascending= false;
  constructor(private ss: OrdersService, private zone: NgZone) {

  }


  ngOnInit() {
    this.x =0;
    let timer = Observable.timer(9000, 10000);
    timer.subscribe(() => {
      this.x++;
      console.log('thiiiis issss your x in sell', this.x)
      this.load()
    });


    console.log('insiiiiide buyyyy compooonent')
  }

  load() {
    this.ss
      .load()
      .subscribe(data => {

        this.zone.run(() => { // <== added
          this.prepareTable(data)
        });


      });
  }

  prepareTable(data) {
    this.data = data;
    this.sellQueue = data.filter(elem => elem.type == "buy");
    while (this.sellQueue.length > 20) {
      this.sellQueue.shift();

      console.log('-------------------------------------')
      console.log(this.sellQueue[this.sellQueue.length - 1]);
    }

  }

}


