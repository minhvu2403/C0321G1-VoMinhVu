import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ImgSliderModule} from './slide-app/img-slider/img-slider.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GalleryConfig} from './slide-app/img-slider/token';
import {SharedModule} from './product-management-app/shared/shared.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ImgSliderModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [{provide: GalleryConfig, useValue: 3}],
  bootstrap: [AppComponent]
})
export class AppModule { }
