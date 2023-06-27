import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNGModule } from 'src/app/shared/primeng/primeng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SaleRoutingModule } from './sale.routing';
import { DropdownModule } from 'primeng/dropdown';
import { RegisterSaleComponent } from './register-sale/register-sale.component';
import { ManageSaleComponent } from './manage-sale/manage-sale.component';
import { VisualizeSaleComponent } from './visualize-sale/visualize-sale.component';
import { UpdateSaleComponent } from './update-sale/update-sale.component';
const COMPONENTS = [
  ManageSaleComponent,
  RegisterSaleComponent,
  VisualizeSaleComponent,
  UpdateSaleComponent
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
    SaleRoutingModule,
    DropdownModule
  ],
  providers: [],
})
export class SaleModule {}
