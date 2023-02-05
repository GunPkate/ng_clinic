import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeftmenuComponent } from './leftmenu/leftmenu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClinicComponent } from './clinic/clinic.component';
import { CustomerComponent } from './customer/customer.component';
import { PetComponent } from './pet/pet.component';
import { MedicalSupplyComponent } from './mecialsupply/medicalsupply.component';
import { CheckupComponent } from './checkup/checkup.component';
import { ReportComponent } from './report/report.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    LeftmenuComponent,
    DashboardComponent,
    ClinicComponent,
    CustomerComponent,
    PetComponent,
    MedicalSupplyComponent,
    CheckupComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
