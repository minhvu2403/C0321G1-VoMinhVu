import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProductListComponent} from "./module/product/product-list/product-list.component";
import {ProductCreateComponent} from "./module/product/product-create/product-create.component";
import {ProductEditComponent} from "./module/product/product-edit/product-edit.component";


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'list'},
  {
    path: 'list', component: ProductListComponent,
  }, {
    path: 'create', component: ProductCreateComponent
  },
  {
    path: 'list/:id/edit', component: ProductEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
