import {Component, OnInit, NgZone} from '@angular/core';
import {OrdersService} from "../orders.service";
import {Order} from "../order"
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {forEach} from "@angular/router/src/utils/collection";
import {spread} from "q";


@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
})
export class BuyComponent implements OnInit {

  x: number;
  myOrder:any;
  ascending = true;
  buyQueue: Order [] = [];
  sellQueue: Order [] = [];
  matchQueue: any [] = [];
  max: 20;
  data: any = [];
  buyQueue20 = [] = [];
  sellQueue20 = [] = []
  spread : number;
  visible: boolean;

  constructor(private ss: OrdersService, private zone: NgZone) {

  }


  ngOnInit() {
    this.x = 0;
    let timer = Observable.timer(2000, 3000);
    timer.subscribe(() => {
      this.load()

    });

  }

  mymodal(m){
    this.myOrder=m;
    this.visible = true;
  }


  load() {

    this.ss
      .loadOne(this.x)
      .subscribe(data => {
        this.zone.run(() => {
          if (data[0].type == "buy") {
            if (this.buyQueue20.length < 20) {

              this.buyQueue.push(data[0]);
              this.buyQueue20.push(data[0]);
              this.buyQueue.sort((a, b) => a.price - b.price);
              this.buyQueue20.sort((a, b) => a.price - b.price);

            }
            else {

              this.buyQueue.push(data[0]);
              this.buyQueue20.push(data[0]);
              let min = this.buyQueue20.reduce(function (prev, curr) {
                return prev.id< curr.id ? prev : curr;
              });

              var index = this.buyQueue.indexOf(min)
              this.buyQueue.splice(index,1)
              var index20 = this.buyQueue20.indexOf(min)
              this.buyQueue20.splice(index20,1)

              this.buyQueue.sort((a, b) => a.price - b.price);
              this.buyQueue20.sort((a, b) => a.price - b.price);

            }
            this.x++;
            this.match()
          }
          else if (data[0].type == "sell") {

            if (this.sellQueue20.length < 20) {

              this.sellQueue.push(data[0]);
              this.sellQueue20.push(data[0]);

              this.sellQueue.sort((a, b) => b.price - a.price);
              this.sellQueue20.sort((a, b) => b.price - a.price);


            }
            else {
              let min = this.sellQueue20.reduce(function (prev, curr) {
                return prev.id< curr.id ? prev : curr;
              });
              this.sellQueue.push(data[0]);
              this.sellQueue20.push(data[0]);
              var index = this.sellQueue.indexOf(min)
              this.sellQueue.splice(index,1)
              var index20 = this.sellQueue20.indexOf(min)
              this.sellQueue20.splice(index20,1)

              this.sellQueue.sort((a, b) => b.price - a.price);
              this.sellQueue20.sort((a, b) => b.price - a.price);


            }
            this.x++;
            this.match()

          }

        });
      });

  }

  match() {

    loopBuy :for (let buyOrder of this.buyQueue) {
      loopSell : for (let sellOrder of this.sellQueue) {
        if (sellOrder.price <= buyOrder.price) {
          if (buyOrder.quantity >= sellOrder.quantity) {


            //push in match queue
            this.matchQueue.push({
              buyOrder: buyOrder,
              sellOrder: sellOrder,
              price: buyOrder.price,
              quantity: sellOrder.quantity,
              time : Date.now()
            })

            if(this.matchQueue.length>30){
              this.matchQueue.shift();
            }

            //delete sell order from sell queue
            let index = this.sellQueue.indexOf(sellOrder, 0);
            if (index > -1) {
              this.sellQueue.splice(index, 1);
              console.log('delete from sell ' + index)
            }

            //update quantity of buy order in buy queue
            this.buyQueue[this.buyQueue.indexOf(buyOrder)] = {
              id: buyOrder.id,
              type: buyOrder.type,
              quantity: buyOrder.quantity - sellOrder.quantity,
              price: buyOrder.price
            };

            //if there quantity of buy order equal to 0 delete that order
            if (buyOrder.quantity - sellOrder.quantity == 0) {
              this.buyQueue = this.buyQueue.filter(obj => obj !== buyOrder);
              break loopBuy
            }
            break loopSell
          }

          else {
            //push in match queue
            this.matchQueue.push({
              buyOrder: buyOrder,
              sellOrder: sellOrder,
              price: buyOrder.price,
              quantity: buyOrder.quantity,
              time : Date.now()
            })

            if(this.matchQueue.length>30){
              this.matchQueue.shift();
            }

            //delete buy order from buy queue
            let index = this.buyQueue.indexOf(buyOrder, 0);
            if (index > -1) {
              this.buyQueue.splice(index, 1);
              console.log('delete from index buy ' + index)
            }
            //update quantity of sell order in sell queue
            this.sellQueue[this.sellQueue.indexOf(sellOrder)] = {
              id: sellOrder.id,
              type: sellOrder.type,
              quantity: sellOrder.quantity - buyOrder.quantity,
              price: sellOrder.price
            };
            //if there quantity of buy order equal to 0 delete that order
            if (sellOrder.quantity - buyOrder.quantity == 0) {
              this.sellQueue = this.sellQueue.filter(obj => obj !== sellOrder);
              break loopSell
            }
            break loopBuy
          }





        }
      }

    }

  }

}
