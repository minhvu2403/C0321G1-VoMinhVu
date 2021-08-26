import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DictionaryPageComponent} from './dictionary-app/dictionary/dictionary-page/dictionary-page.component';
import {DictionaryDetailComponent} from './dictionary-app/dictionary/dictionary-detail/dictionary-detail.component';
import {ProductListComponent} from './product-app/product/product-list/product-list.component';
import {ProductCreateComponent} from './product-app/product/product-create/product-create.component';
import {ProductDeleteComponent} from './product-app/product/product-delete/product-delete.component';
import {ProductUpdateComponent} from './product-app/product/product-update/product-update.component';


const routes: Routes = [
  {
    path: 'dictionary',
    component: DictionaryPageComponent
  },
  {
    path: 'dictionary/:word',
    component: DictionaryDetailComponent
  },
  {
    path: 'product',
    component: ProductListComponent,
    children: [{path: 'delete/:id', component: ProductDeleteComponent}]
  },
  {path: 'product/create', component: ProductCreateComponent},
 {path: 'product/edit/:id', component: ProductUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
