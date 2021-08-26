import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DictionaryPageComponent } from './dictionary-app/dictionary/dictionary-page/dictionary-page.component';
import { DictionaryDetailComponent } from './dictionary-app/dictionary/dictionary-detail/dictionary-detail.component';
import { ProductListComponent } from './product-app/product/product-list/product-list.component';
import { ProductCreateComponent } from './product-app/product/product-create/product-create.component';
import { ProductDeleteComponent } from './product-app/product/product-delete/product-delete.component';
import { ProductUpdateComponent } from './product-app/product/product-update/product-update.component';

@NgModule({
  declarations: [
    AppComponent,
    DictionaryPageComponent,
    DictionaryDetailComponent,
    ProductListComponent,
    ProductCreateComponent,
    ProductDeleteComponent,
    ProductUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
