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

@NgModule({
  imports: [
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    HttpModule,
    CommonModule,
    FormsModule
  ],
  declarations: [ DashboardComponent,
  BuyComponent,SellComponent, MyPipePipe ],
  providers: [OrdersService]
})
export class DashboardModule { }
