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
import { CatalogueRoutingModule } from './catalogue.routing';
import { ManageCatalogueComponent } from './manage-catalogue/manage-catalogue.component';
import { CheckboxModule } from 'primeng/checkbox';


const COMPONENTS = [
  ManageCatalogueComponent
 
 
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
    CatalogueRoutingModule,
    TableModule,
    CheckboxModule
  ],
  providers: [],
})
export class CatalogueModule {}

