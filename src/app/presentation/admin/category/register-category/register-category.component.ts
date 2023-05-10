import { Component, OnInit } from '@angular/core';
import {
  Brand,
  Category,
  Model,
  Status,
  Supplier,
} from 'src/app/core/models/inventory/response/get-all-inventory.response';
import {
  PostCategoryRequest,
} from 'src/app/core/models/inventory/request/post-moto.request';
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
