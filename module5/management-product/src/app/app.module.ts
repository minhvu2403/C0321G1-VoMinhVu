import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ProductListComponent} from "./module/product/product-list/product-list.component";
import { ProductCreateComponent } from './module/product/product-create/product-create.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ProductEditComponent } from './module/product/product-edit/product-edit.component';
import { ProductDeleteComponent } from './module/product/product-delete/product-delete.component';
import {ToastrModule} from "ngx-toastr";
import {NgxPaginationModule} from "ngx-pagination";

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCreateComponent,
    ProductEditComponent,
    ProductDeleteComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        NgxPaginationModule,
      ReactiveFormsModule,
      ToastrModule.forRoot({
        timeOut: 1000,
        progressBar: true,
        progressAnimation: 'increasing',
        preventDuplicates: true
      })
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
