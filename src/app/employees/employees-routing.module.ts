import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees.component';
import { AuthGuard } from '@app/_helpers';
import { Role } from '@app/_models';
const routes: Routes = [
  { path: 'employees', component: EmployeesComponent, canActivate: [AuthGuard], data: { roles: [Role.SuperAdmin] } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
