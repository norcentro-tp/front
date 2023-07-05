import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNGModule } from 'src/app/shared/primeng/primeng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoryRoutingModule } from './category.routing';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { TableModule } from 'primeng/table';
import { RegisterCategoryComponent } from './register-category/register-category.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';

const COMPONENTS = [ManageCategoryComponent, RegisterCategoryComponent, UpdateCategoryComponent];


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
    CategoryRoutingModule,
    TableModule
  ],
  providers: [],
})
export class CategoryModule { }
