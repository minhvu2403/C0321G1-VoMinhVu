import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TimelinesComponent} from './timelines-app/timelines/timelines.component';
import {YoutubePlaylistComponent} from './youtube-playlist-app/youtube-playlist/youtube-playlist.component';
import {YoutubePlayerComponent} from './youtube-playlist-app/youtube-player/youtube-player.component';
import {ProductListComponent} from './model/product/product-list/product-list.component';
import {ProductService} from './model/service/product.service';
import {ProductCreateComponent} from './model/product/product-create/product-create.component';


const routes: Routes = [
  {
    path: 'timelines',
    component: TimelinesComponent

  },
  {
    path: 'youtube',
    component: YoutubePlaylistComponent,
    children: [{
      path: ':id',
      component: YoutubePlayerComponent
    }]
  },
  {
    path: 'product/list',
    component: ProductListComponent
  },
  {
    path: 'product/create',
    component: ProductCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
