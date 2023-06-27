import { Component, OnInit } from '@angular/core';
import { SupplierItemResponse } from 'src/app/core/models/all/response/all-responses.response';
import { PutSupplierRequest } from 'src/app/core/models/all/request/all-requests.request';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GetSupplierByIdUseCase } from 'src/app/core/usecase/supplier/get-supplier-byid.usecase';
import { PutSupplierUseCase } from 'src/app/core/usecase/supplier/put-supplier.usecase';import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { alphanumericPlusValidator, numericValidator, emailValidator, allFieldsFilledValidator } from '../../validators/custom-validators';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-update-supplier',
  templateUrl: 'update-supplier.component.html',
  styleUrls: ['update-supplier.component.css'],
})
export class UpdateSupplierComponent implements OnInit {
  formSupplier: FormGroup;

  constructor(
    private _getSupplierById: GetSupplierByIdUseCase,
    private _putSupplier: PutSupplierUseCase,
    private _alertService: AlertService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.createformSupplier();
    this.getSupplierbyId(this.config.data.id);
  }

  createformSupplier() {
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
    },{ validators: allFieldsFilledValidator() });
  }

  async getSupplierbyId(id: string) {
    try {
      const response: SupplierItemResponse =
        await this._getSupplierById.execute(id);
      console.log(response);
      this.formSupplier.setValue({
        nombre: response.nombre,
        telefono: response.telefono,
        correo: response.correo,
        direccion: response.direccion,
      });
    } catch (error) {
      console.error(error);
    }
  }
  async updateSupplier(id: string) {
    const form = this.formSupplier.value;
    const bodyRequestSupplier: PutSupplierRequest = {
      nombre: form.nombre,
      telefono: form.telefono,
      correo: form.correo,
      direccion: form.direccion,
    };
    this.formSupplier.markAllAsTouched();
    if (this.formSupplier.invalid) {
      this._alertService.error('Por favor llene todos los campos correctamente');
      return;
    };
    try {
      if (this.formSupplier.invalid) return;
      const response: SupplierItemResponse = await this._putSupplier.execute({
        id: id,
        bodyRequest: bodyRequestSupplier,
      });

      this._alertService.success('Cambios Guardados');
      console.log(response);
      this.ref.close();
    } catch (error) {
      console.error(error);
    }
  }
}
