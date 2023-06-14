import { Component, OnInit } from '@angular/core';
import {
  Client,
  GetAllClientResponse,
  Status,
} from 'src/app/core/models/all/response/all-responses.response';
import { PostClientRequest} from 'src/app/core/models/all/request/all-requests.request';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PostClientUseCase } from 'src/app/core/usecase/client/post-client.usecase';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { emailValidator, passwordValidator, numericValidator, alphabeticValidator, alphanumericValidator, allFieldsFilledValidator } from '../../validators/custom-validators';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-register-client',
  templateUrl: 'register-client.component.html',
})
export class RegisterClientComponent implements OnInit {
  formClient: FormGroup;
  constructor(
    private _postClient: PostClientUseCase,
    public _dialogref: DynamicDialogRef,
    private _formBuilder: FormBuilder,
    private _alertService: AlertService
  ) {}

  

  ngOnInit() {
    this.createformClient();
    
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
    },{ validators:allFieldsFilledValidator() });
  }


  async addClient() {
    const form = this.formClient.value;
    const bodyRequestClient: PostClientRequest = {
      nombres:form.nombres,
      apellido_paterno:form.apellido_paterno,
      apellido_materno: form.apellido_materno,
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
    this.formClient.markAllAsTouched();
    if (this.formClient.invalid) {
      this._alertService.error('Por favor llene todos los campos correctamente');
      return;
    };
    try {
      if (this.formClient.invalid) return;
      const response: GetAllClientResponse = await this._postClient.execute(
        bodyRequestClient
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
