import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNGModule } from 'src/app/shared/primeng/primeng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmployeeRoutingModule } from './employee.routing';
import { ManageEmployeeComponent } from './manage-employee/manage-employee.component';
import { RegisterEmployeeComponent } from './register-employee/register-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { VisualizeEmployeeComponent } from './visualize-employee/visualize-employee.component';
import { DropdownModule } from 'primeng/dropdown';
const COMPONENTS = [
  ManageEmployeeComponent,
  RegisterEmployeeComponent,
  UpdateEmployeeComponent,
  VisualizeEmployeeComponent,
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNGModule,
    SharedModule,
    EmployeeRoutingModule,
    DropdownModule
  ],
  providers: [],
})
export class EmployeeModule {}
