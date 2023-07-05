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
import { ManageBrandComponent } from './manage-brand/manage-brand.component';
import { BrandRoutingModule } from './brand.routing';
import { RegisterBrandComponent } from './register-brand/register-brand.component';
import { UpdateBrandComponent } from './update-brand/update-brand.component';
import { FileUploadModule } from 'primeng/fileupload';

const COMPONENTS = [
  ManageBrandComponent,
  RegisterBrandComponent,
  UpdateBrandComponent,
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
    BrandRoutingModule,
    TableModule,
    FileUploadModule,
  ],
  providers: [],
})
export class BrandModule {}
