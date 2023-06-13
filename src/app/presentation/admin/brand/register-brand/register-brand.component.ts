import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/core/models/all/response/all-responses.response';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PostBrandRequest } from 'src/app/core/models/all/request/all-requests.request';
import { PostBrandUseCase } from 'src/app/core/usecase/brand/post-brand.usecase';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { allFieldsFilledValidator, alphanumericPlusValidator } from '../../validators/custom-validators';
import { AlertService } from 'src/app/shared/services/alert.service';
@Component({
  selector: 'app-register-brand',
  templateUrl: 'register-brand.component.html',
  styleUrls: ['register-brand.component.css'],
})
export class RegisterBrandComponent implements OnInit {
  formBrand: FormGroup;
  selectedFiles: File[] = [];
  fileSelected: Boolean = false;

  constructor(
    private _postBrand: PostBrandUseCase,
    public _dialogref: DynamicDialogRef,
    private _formBuilder: FormBuilder,
    private _alertService: AlertService,
  ) {}

  ngOnInit() {
    this.createformBrand();
  }

  createformBrand() {
    this.formBrand = this._formBuilder.group({
      nombre: new FormControl(
        null,
        [
          Validators.minLength(3),
          Validators.maxLength(10),
          alphanumericPlusValidator()
        ]
      ),
      descripcion:new FormControl(
        null,
        [
          Validators.minLength(10)
        ]
      )
    },{ validators: allFieldsFilledValidator() });
  }

  get nombre() {
     return this.formBrand.get('nombre'); 
  }

  get descripcion() {
     return this.formBrand.get('descripcion'); 
  }

  onSelect(event: any) {
    if (event.files && event.files.length > 0) {
    this.selectedFiles[0]  = event.files[0];
    this.fileSelected = true;
    }
  }

  async addBrand() {
    const form = this.formBrand.value;
    const bodyRequestBrand: PostBrandRequest = {
      nombre: form.nombre,
      descripcion: form.descripcion,
      imageFiles: this.selectedFiles[0]
    };
    console.log(bodyRequestBrand);
    console.log(this.formBrand.value);

    this.formBrand.markAllAsTouched();
    if (this.formBrand.invalid && !this.fileSelected) {
      this._alertService.error('Por favor llene todos los campos correctamente');
      return;
    };
    try {
      if (this.formBrand.invalid && !this.fileSelected) return;
      const response: Brand = await this._postBrand.execute(bodyRequestBrand);

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
