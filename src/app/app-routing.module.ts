import { ReportComponent } from './report/report.component';
import { CheckupComponent } from './checkup/checkup.component';
import { MedicalSupplyComponent } from './medicalsupply/medicalsupply.component';
import { CustomerComponent } from './customer/customer.component';
import { PetComponent } from './pet/pet.component';
import { ClinicComponent } from './clinic/clinic.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'clinic',
    component:ClinicComponent
  },
  {
    path: 'pet',
    component:PetComponent
  },
  {
    path: 'customer',
    component: CustomerComponent
  },
  {
    path: 'medicalsupply',
    component: MedicalSupplyComponent
  },
  {
    path: 'checkup',
    component: CheckupComponent
  },
  {
    path: 'report',
    component: ReportComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
