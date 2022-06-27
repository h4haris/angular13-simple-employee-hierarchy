import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { EventBusService } from "./services/eventbus.service";
import { EmployeeService } from "./services/employee.service";

import { AppComponent } from './app.component';
import { EmployeeListComponent } from "./components/employee-list/employee-list.component";
import { EmployeeCardComponent } from "./components/employee-card/employee-card.component";
import { SidebarComponent } from "./components/siderbar/sidebar.component";

@NgModule( {
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeCardComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [ EmployeeService, EventBusService ],
  bootstrap: [ AppComponent ]
} )
export class AppModule { }
