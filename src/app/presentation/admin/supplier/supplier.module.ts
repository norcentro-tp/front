import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNGModule } from 'src/app/shared/primeng/primeng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SupplierRoutingModule } from './supplier.routing';
import { RegisterSupplierComponent } from './register-supplier/register-supplier.component';
import { ManageSupplierComponent } from './manage-supplier/manage-supplier.component';
import { UpdateSupplierComponent } from './update-supplier/update-supplier.component';
import { VisualizeSupplierComponent } from './visualize-supplier/visualize-supplier.component';

const COMPONENTS = [
  ManageSupplierComponent,
  RegisterSupplierComponent,
  UpdateSupplierComponent,
  VisualizeSupplierComponent,
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
    SupplierRoutingModule,
  ],
  providers: [],
})
export class SupplierModule {}
