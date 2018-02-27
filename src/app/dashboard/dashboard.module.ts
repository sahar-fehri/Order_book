import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule} from "@angular/common"
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ng2-bootstrap/dropdown';
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { BuyComponent} from "../buy/buy.component"

import { OrdersService} from "../orders.service"
import { HttpModule } from '@angular/http';
import { MyPipePipe } from "../my-pipe.pipe"

import { SellComponent } from "../sell/sell.component"


// Modal Component
import { ModalModule } from 'ng2-bootstrap/modal';
import { ModalsComponent } from '../components/modals.component';

import {Ng2PaginationModule} from 'ng2-pagination'; //importing ng2-pagination



@NgModule({
  imports: [
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    HttpModule,
    CommonModule,
    FormsModule,
    Ng2PaginationModule,
    ModalModule.forRoot()
  ],
  declarations: [ DashboardComponent,
  BuyComponent,SellComponent, MyPipePipe,
    ModalsComponent,
  ],
  providers: [OrdersService]
})
export class DashboardModule { }
