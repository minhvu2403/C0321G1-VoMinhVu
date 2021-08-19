import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./layout/home/home.component";
import {DashboardComponent} from "./layout/dashboard/dashboard.component";
import {EmployeeListComponent} from "./module/employee/employee-list/employee-list.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  // {
  //   path: '',
  //   loadChildren: () => import('./layout/layout.module').then(module => module.LayoutModule)
  // },
  // {
  //   path: 'customer',
  //   loadChildren: () => import('./module/customer/customer.module').then(module => module.CustomerModule)
  // },
  {
    path: 'employee',
    loadChildren: () => import('./module/employee/employee.module').then(module => module.EmployeeModule)
  },
  // {
  //   path: 'service',
  //   loadChildren: () => import('./module/service/service.module').then(module => module.ServiceModule)
  // },
  // {
  //   path: 'contract',
  //   loadChildren: () => import('./module/contract/contract.module').then(module => module.ContractModule)
  // },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
