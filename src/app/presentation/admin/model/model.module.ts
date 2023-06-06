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
import { ManageModeloComponent } from './manage-model/manage-model.component';
import { ModeloRoutingModule } from './model.routing';
import { RegisterModelComponent } from './register-model/register-model.component';
import { UpdateModelComponent } from './update-model/update-model.component';
import { VisualizeModelComponent } from './visualize-model/visualize-model.component';

const COMPONENTS = [
  ManageModeloComponent,
  RegisterModelComponent,
  UpdateModelComponent,
  VisualizeModelComponent
 
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
export class ModelModule {}

