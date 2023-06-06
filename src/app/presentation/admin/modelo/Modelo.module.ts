import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNGModule } from 'src/app/shared/primeng/primeng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { ManageModeloComponent } from './manage-modelo/manage-modelo.component';
import { ModeloRoutingModule } from './Modelo.routing';
import { RegisterModeloComponent } from './register-modelo/register-modelo.component';
import { UpdateBrandComponent } from '../brand/update-brand/update-brand.component';
import { UpdateModeloComponent } from './update-modelo/update-modelo.component';
import { VisualizeModeloComponent } from './visualize-modelo/visualize-modelo.component';

const COMPONENTS = [
  ManageModeloComponent,
  RegisterModeloComponent,
  UpdateModeloComponent,
  VisualizeModeloComponent
 
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
    InputTextModule,
    DropdownModule,
    DynamicDialogModule,
    ModeloRoutingModule,
    TableModule,
  ],
  providers: [],
})
export class ModeloModule {}

