import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CustomerModule} from "./module/customer/customer.module";
import {HttpClientModule} from "@angular/common/http";
import {NgxPaginationModule} from 'ngx-pagination';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {MatSidenavModule} from '@angular/material/sidenav';
import {ServiceModule} from "./module/service/service.module";
import {EmployeeModule} from "./module/employee/employee.module";
import {ContractModule} from "./module/contract/contract.module";
import {LayoutModule} from "./layout/layout.module";
import {HeaderComponent} from "./layout/header/header.component";
import {HomeComponent} from "./layout/home/home.component";
import {DashboardComponent} from "./layout/dashboard/dashboard.component";
// import {SidenavComponent} from "./layout/sidenav/sidenav.component";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    AppComponent,
    // HeaderComponent,
    // HomeComponent,
    // DashboardComponent,
    // SidenavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustomerModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true
    }),
    ServiceModule,
    EmployeeModule,
    ContractModule,
    LayoutModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
