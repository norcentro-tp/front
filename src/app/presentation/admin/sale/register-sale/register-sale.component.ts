import { Component, OnInit } from '@angular/core';
import {
  GetAllSaleResponse,
  Status,
} from 'src/app/core/models/all/response/all-responses.response';
import { PostSaleRequest} from 'src/app/core/models/all/request/all-requests.request';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PostSaleUseCase } from 'src/app/core/usecase/sale/post-sale.usecase';
import { DropdownModule } from 'primeng/dropdown';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { emailValidator, passwordValidator, numericValidator, alphabeticValidator, alphanumericValidator, allFieldsFilledValidator } from '../../validators/custom-validators';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-register-Sale',
  templateUrl:'register-Sale.component.html',
})
export class RegisterSaleComponent implements OnInit {
  formSale: FormGroup;
  constructor(
    private _postSale: PostSaleUseCase,
    public _dialogref: DynamicDialogRef,
    public _dropdownModule: DropdownModule,
    private _formBuilder: FormBuilder,
    private _alertService: AlertService
  ) {}

  ngOnInit() {
    this.createformSale();
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


  async addSale() {
    const form = this.formSale.value;
    const bodyRequestSale: PostSaleRequest = {
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
      const response: GetAllSaleResponse = await this._postSale.execute(
        bodyRequestSale
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
  
  
