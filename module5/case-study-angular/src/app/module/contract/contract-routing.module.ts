import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ContractDetailComponent} from "./contract-detail/contract-detail.component";
import {ContractListComponent} from "./contract-list/contract-list.component";


const routes: Routes = [
  {
    path: 'contract-detail',
    component: ContractDetailComponent
  },
  {
    path: 'list',
    component:ContractListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractRoutingModule { }
