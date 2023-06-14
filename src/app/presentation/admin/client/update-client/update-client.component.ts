import { Component, OnInit } from '@angular/core';
import {
  Client,
  GetAllClientResponse,
} from 'src/app/core/models/all/response/all-responses.response';
import { PutClientRequest } from 'src/app/core/models/all/request/all-requests.request';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GetClientByIdUseCase } from 'src/app/core/usecase/client/get-client-byid.usecase';
import { PutClientUseCase } from 'src/app/core/usecase/client/put-client.usecase';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { emailValidator, passwordValidator, numericValidator, alphabeticValidator, alphanumericValidator, allFieldsFilledValidator } from '../../validators/custom-validators';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-update-Client',
  templateUrl: 'update-Client.component.html',
  styleUrls: ['update-Client.component.css'],
})
export class UpdateClientComponent implements OnInit {
  formClient: FormGroup;

  constructor(
    private _getClientById: GetClientByIdUseCase,
    private _putClient: PutClientUseCase,
    private _alertService: AlertService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.createformClient();
    this.getClientbyId(this.config.data.id);
  }

  createformClient() {
    this.formClient = this._formBuilder.group({
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
      id_usuario: [null]
    },{ validators:allFieldsFilledValidator() });
  }

  async getClientbyId(id: string) {
    try {
      const response: GetAllClientResponse =
        await this._getClientById.execute(id);
      console.log(response);
      this.formClient.setValue({
        nombres: response.nombres,
        apellido_paterno: response.apellido_paterno,
        apellido_materno: response.apellido_materno,
        documento_identificador: response.documento_identificador.numero_documento,
        telefono: response.telefono,
        correo: response.correo,
        id_usuario: response.usuario._id,
        usuario: response.usuario.nombre_usuario,
        contraseña: response.usuario.password
      });
    } catch (error) {
      console.error(error);
    }
  }
  async updateClient(id: string) {
    const form = this.formClient.value;
    const bodyRequestClient: PutClientRequest = {
      nombres: form.nombres,
      apellido_paterno: form.apellido_paterno,
      apellido_materno: form.apellido_materno,
      documento_identificador: {
        tipo_documento:"DNI",
        numero_documento:form. documento_identificador
      },
      telefono: form.telefono,
      correo: form.correo,
      usuario:{
         _id: form.id_usuario,
         nombre_usuario:form.usuario,
         password: form.contraseña
      }
    };
    this.formClient.markAllAsTouched();
    if (this.formClient.invalid) {
      this._alertService.error('Por favor llene todos los campos correctamente');
      return;
    };
    try {
      if (this.formClient.invalid) return;
      console.log(this.formClient.value)
      const response: Client = await this._putClient.execute({
        id: id,
        bodyRequest: bodyRequestClient,
      });

      this._alertService.success('Cambios Guardados');
      console.log(response);
      this.ref.close();
    } catch (error) {
      console.error(error);
    }
  }
}
