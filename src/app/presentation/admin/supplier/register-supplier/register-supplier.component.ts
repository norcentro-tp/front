import { Component, OnInit } from '@angular/core';
import { GetAllSupplierResponse } from 'src/app/core/models/all/response/all-responses.response';
import { PostSupplierRequest } from 'src/app/core/models/all/request/all-requests.request';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PostSupplierUseCase } from 'src/app/core/usecase/supplier/post-supplier.usecase';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { alphanumericPlusValidator, numericValidator, emailValidator, allFieldsFilledValidator } from '../../validators/custom-validators';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-register-inventory',
  templateUrl: 'register-supplier.component.html',

})
export class RegisterSupplierComponent implements OnInit {
  formSupplier:FormGroup;
  constructor(
    private _postSupplier: PostSupplierUseCase,
    public _dialogref: DynamicDialogRef,
    private _formBuilder: FormBuilder,
    private _alertService: AlertService
  ) {}

  ngOnInit() {
    this.createformSupplier();
  }
  
  
  createformSupplier(){
    this.formSupplier = this._formBuilder.group({
      nombre:[
        null,
        [
          Validators.minLength(4),
          Validators.maxLength(20),
          alphanumericPlusValidator()
        ],
      ],
      telefono:[
        null,
        [
          Validators.minLength(9),
          Validators.maxLength(9),
          numericValidator()
        ],
      ],
      correo: [
        null,[
          Validators.minLength(4),
          Validators.maxLength(20),    
          emailValidator()
        ],
      ],
      direccion:[
        null,[     
          Validators.minLength(10),   
          alphanumericPlusValidator()
        ],
      ]
    },{ validators: allFieldsFilledValidator() })
  }

  async addSupplier() {
    const form = this.formSupplier.value
    const bodyRequestSupplier: PostSupplierRequest ={
      nombre: form.nombre,
      telefono: form.telefono,
      correo: form.correo,
      direccion: form.direccion
    };
    this.formSupplier.markAllAsTouched();
    if (this.formSupplier.invalid) {
      this._alertService.error('Por favor llene todos los campos correctamente');
      return;
    };
    try {
      if (this.formSupplier.invalid) return;
      const response: GetAllSupplierResponse = await this._postSupplier.execute(
        bodyRequestSupplier
      );

      this._alertService.success('Se realizo el registro con exito');
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
