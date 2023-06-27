import { Component, OnInit } from '@angular/core';
import {
  Sale,
  GetAllSaleResponse,
} from 'src/app/core/models/all/response/all-responses.response';
import { PutSaleRequest } from 'src/app/core/models/all/request/all-requests.request';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { PutSaleUseCase } from 'src/app/core/usecase/sale/put-sale.usecase';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { emailValidator, passwordValidator, numericValidator, alphabeticValidator, alphanumericValidator, allFieldsFilledValidator } from '../../validators/custom-validators';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GetSaleByIdUseCase } from 'src/app/core/usecase/sale/get-offer-byid.usecase';

@Component({
  selector: 'app-update-Sale',
  templateUrl: 'update-Sale.component.html',
  styleUrls: ['update-Sale.component.css'],
})
export class UpdateSaleComponent implements OnInit {
  formSale: FormGroup;

  constructor(
    private _getSaleById: GetSaleByIdUseCase,
    private _putSale: PutSaleUseCase,
    private _alertService: AlertService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.createformSale();
    this.getSalebyId(this.config.data.id);
  }

  createformSale() {
    this.formSale = this._formBuilder.group({
      nombres: [
        null,
        [
          Validators.minLength(4),
          Validators.maxLength(20),
          alphabeticValidator()
        ],
      ],
      apellido_paterno: [
        null,
        [
          Validators.minLength(4),
          Validators.maxLength(20),
          alphabeticValidator()
        ],
      ],
      apellido_materno: [
        null,
        [
          Validators.minLength(4),
          Validators.maxLength(20),
          alphabeticValidator()
        ],
      ],
      documento_identificador: [
        null,
        [
          Validators.minLength(8),
          Validators.maxLength(8),
          numericValidator()
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
      usuario: [
        null,[
          Validators.minLength(4),
          Validators.maxLength(20),
          alphanumericValidator()
        ],
      ],
      contraseña:  [
        null,[
          Validators.minLength(8),
          Validators.maxLength(20),
          passwordValidator()
        ],
      ],
       codigo_vin: [],
       metodo_pago: [],
       precio:[],
       color: [],
       archivo_boleta: [],
      modelo: [null],
      estado: [null],
      
    })
  }

  async getSalebyId(id: string) {
    try {
      const response: GetAllSaleResponse =
        await this._getSaleById.execute(id);
      console.log(response);
      this.formSale.setValue({
        nombres: response.nombres,
        apellido_paterno: response.apellido_paterno,
        apellido_materno: response.apellido_materno,
        documento_identificador: response.documento_identificador,
        telefono: response.telefono,
        correo: response.correo,
        id_usuario: response.usuario._id,
        usuario: response.usuario.nombre_usuario,
        contraseña: response.usuario.password,
        precio: response.precio,
        color:response.color,
        estado: response.estado,
        codigo_vin: response.codigo_vin,
        metodo_pago: response.metodo_pago,
        modelo: response.modelo,
        archivo_boleta: response.archivo_boleta

      });
    } catch (error) {
      console.error(error);
    }
  }
  async updateSale(id: string) {
    const form = this.formSale.value;
    const bodyRequestSale: PutSaleRequest = {
      nombres:form.nombres,
      apellido_paterno:form.apellido_paterno,
      apellido_materno: form.apellido_materno,
      codigo_vin: form.codigo_vin,
      metodo_pago: form.metodo_pago,
      archivo_boleta: form.archivo_boleta,
      precio: form.precio,
      color: form.color,
      modelo: form.modelo,
      estado:form.estado,

      documento_identificador: {
        tipo_documento:"DNI",
        numero_documento:form. documento_identificador
      },
      telefono:form.telefono,
      correo: form.correo,
      usuario:{
         nombre_usuario:form.usuario,
         password: form.contraseña
      }
    };
    this.formSale.markAllAsTouched();
    if (this.formSale.invalid) {
      this._alertService.error('Por favor llene todos los campos correctamente');
      return;
    };
    try {
      if (this.formSale.invalid) return;
      console.log(this.formSale.value)
      const response: Sale = await this._putSale.execute({
        id: id,
        bodyRequest: bodyRequestSale,
      });

      this._alertService.success('Cambios Guardados');
      console.log(response);
      this.ref.close();
    } catch (error) {
      console.error(error);
    }
  }
}

