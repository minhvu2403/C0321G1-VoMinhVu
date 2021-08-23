import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./layout/layout.module').then(module => module.LayoutModule)
  },
  {
    path: 'customer',
    loadChildren: () => import('./module/customer/customer.module').then(module => module.CustomerModule)
  },
  {
    path: 'employee',
    loadChildren: () => import('./module/employee/employee.module').then(module => module.EmployeeModule)
  },
  {
    path: 'service',
    loadChildren: () => import('./module/service/service.module').then(module => module.ServiceModule)
  },
  {
    path: 'contract',
    loadChildren: () => import('./module/contract/contract.module').then(module => module.ContractModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
