import { Component, OnInit } from '@angular/core';
import {
  Brand,
  Category,
  Model,
  PostCategoryRequest,
  Status,
  Supplier,
} from 'src/app/core/models/inventory/response/get-all-inventory.response';
import { GetAllBrandsUseCase } from 'src/app/core/usecase/brand/get-all-brands.usecase';
import { GetAllCategoriesUseCase } from 'src/app/core/usecase/category/get-all-categories.usecase';
import { PostMotoUseCase } from 'src/app/core/usecase/inventory/post-moto.usecase';
import { GetAllModelsUseCase } from 'src/app/core/usecase/modelo/get-all-models.usecase';
import { GetAllStatusUseCase } from 'src/app/core/usecase/status/get-all-status.usecase';
import { GetAllSuppliersUseCase } from 'src/app/core/usecase/supplier/get-all-suppliers.usecase';
import { GetAllInventoryResponse } from 'src/app/core/models/inventory/response/get-all-inventory.response';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PostCategoryUseCase } from 'src/app/core/usecase/category/post-category.usecase';

@Component({
  selector: 'app-register-category',
  templateUrl: 'register-category.component.html',
  
  providers: [DynamicDialogRef],
})
export class RegisterCategoryComponent implements OnInit {
  constructor(
   
    private _postCategory: PostCategoryUseCase,
    public ref: DynamicDialogRef
  ) {}

  ngOnInit() {
  }
  nombre: string | null = null;
  bodyRequestCategory: PostCategoryRequest;


  async addCategory() {
    this.bodyRequestCategory= {
      nombre: this.nombre,
      
    };
    try {
      const response: Category = await this._postCategory.execute(
        this.bodyRequestCategory
      );
      console.log(response);
      this.ref.close();
    } catch (error) {
      console.error(error);
    }
  }
}
