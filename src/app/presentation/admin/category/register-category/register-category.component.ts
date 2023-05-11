import { Component, OnInit } from '@angular/core';
import {

  Category,
  
} from 'src/app/core/models/inventory/response/get-all-inventory.response';
import {PostCategoryRequest,} from 'src/app/core/models/inventory/request/post-moto.request';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PostCategoryUseCase } from 'src/app/core/usecase/category/post-category.usecase';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register-category',
  templateUrl: 'register-category.component.html',
  
  providers: [DynamicDialogRef],
})
export class RegisterCategoryComponent implements OnInit {
  formCategory:FormGroup;
  constructor(
    
    private _formBuilder:FormBuilder,
    private _postCategory: PostCategoryUseCase,
    public _dialogref: DynamicDialogRef
  ) {}

  ngOnInit() {
    this.createformCategory();
  }
 
  nombre: string | null = null;

  createformCategory(){
    this.formCategory = this._formBuilder.group({
      nombre:[null]
    })
  }

  async addCategory() {
    const form=this.formCategory.value
    const bodyRequestCategory: PostCategoryRequest ={
      nombre: form.nombre
      
    };
    try {
      const response: Category = await this._postCategory.execute(
        bodyRequestCategory
      );
      console.log(response);
      this.close();
    } catch (error) {
      console.error(error);
    }
  }
  close(){
    this._dialogref.close()
  }
}
