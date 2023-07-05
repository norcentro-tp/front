import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/all/response/all-responses.response';
import { PostCategoryRequest } from 'src/app/core/models/all/request/all-requests.request';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PostCategoryUseCase } from 'src/app/core/usecase/category/post-category.usecase';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { alphanumericValidator, allFieldsFilledValidator } from '../../validators/custom-validators';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-register-category',
  templateUrl: 'register-category.component.html',
})
export class RegisterCategoryComponent implements OnInit {
  formCategory: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _postCategory: PostCategoryUseCase,
    public _dialogref: DynamicDialogRef,
    private _alertService: AlertService
  ) {}

  ngOnInit() {
    this.createformCategory();
  }

  createformCategory() {
    this.formCategory = this._formBuilder.group({
      nombre: new FormControl(
        null,
        [
          Validators.minLength(3),
          Validators.maxLength(10),
          alphanumericValidator()
        ]
      ),
    },{ validators: allFieldsFilledValidator() });
  }

  get nombre() {
     return this.formCategory.get('nombre'); 
  }

  async addCategory() {
    const form = this.formCategory.value;
    const bodyRequestCategory: PostCategoryRequest = {
      nombre: form.nombre,
    };
    console.log(bodyRequestCategory);
    console.log(this.formCategory.value);

    this.formCategory.markAllAsTouched();
    if (this.formCategory.invalid) {
      this._alertService.error('Por favor llene todos los campos correctamente');
      return;
    };
    try {
      if (this.formCategory.invalid) return;
      const response: Category = await this._postCategory.execute(
        bodyRequestCategory
      );

      this._alertService.success('Se realizo el registro con exito');
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
