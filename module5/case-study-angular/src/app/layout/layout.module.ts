import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";


@NgModule({
    declarations: [FooterComponent, HeaderComponent, HomeComponent, SidenavComponent, DashboardComponent],
  exports: [
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    SidenavComponent,

  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule
  ]
})
export class LayoutModule { }
