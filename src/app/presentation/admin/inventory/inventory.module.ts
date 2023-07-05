import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNGModule } from 'src/app/shared/primeng/primeng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { InventoryRoutingModule } from './inventory.routing';
import { ManageInventoryComponent } from './manage-inventory/manage-inventory.component';
import { RegisterInventoryComponent } from './register-inventory/register-inventory.component';
import { UpdateInventoryComponent } from './update-inventory/update-inventory.component';
import { VisualizeInventoryComponent } from './visualize-inventory/visualize-inventory.component';


const COMPONENTS = [ManageInventoryComponent, RegisterInventoryComponent, UpdateInventoryComponent, VisualizeInventoryComponent];

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNGModule,
    SharedModule,
    InventoryRoutingModule
  ],
  providers: [],
})
export class InventoryModule {}
