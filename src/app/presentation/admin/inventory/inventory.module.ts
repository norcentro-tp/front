import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNGModule } from 'src/app/shared/primeng/primeng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { InventoryRoutingModule } from './inventory.routing';
import { ManageInventoryComponent } from './manage-inventory/manage-inventory.component';
import { RegisterInventoryComponent } from './register-inventory/register-inventory.component';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';

const COMPONENTS = [ManageInventoryComponent, RegisterInventoryComponent];

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNGModule,
    SharedModule,
    InventoryRoutingModule,
    InputTextModule,
    DropdownModule,
    DynamicDialogModule,
  ],
  providers: [],
})
export class InventoryModule {}
