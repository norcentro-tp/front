import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/all/response/all-responses.response';
import { PostCategoryRequest } from 'src/app/core/models/all/request/all-requests.request';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PostCategoryUseCase } from 'src/app/core/usecase/category/post-category.usecase';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-category',
  templateUrl: 'register-category.component.html',
})
export class RegisterCategoryComponent implements OnInit {
  formCategory: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _postCategory: PostCategoryUseCase,
    public _dialogref: DynamicDialogRef
  ) {}

  ngOnInit() {
    this.createformCategory();
  }

  nombre: string | null = null;

  createformCategory() {
    this.formCategory = this._formBuilder.group({
      nombre: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
    });
  }

  async addCategory() {
    const form = this.formCategory.value;
    const bodyRequestCategory: PostCategoryRequest = {
      nombre: form.nombre,
    };
    this.formCategory.get('nombre').markAsDirty();
    try {
      if (!this.formCategory.valid) return;
      const response: Category = await this._postCategory.execute(
        bodyRequestCategory
      );
      console.log(response);
      this.close();
    } catch (error) {
      console.error(error);
    }
  }
  close() {
    this._dialogref.close();
  }
}
