import { Component, OnInit } from '@angular/core';
import {
  Client,
  GetAllClientResponse,
  Status,
} from 'src/app/core/models/all/response/all-responses.response';
import { PostClientRequest} from 'src/app/core/models/all/request/all-requests.request';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PostClientUseCase } from 'src/app/core/usecase/client/post-client.usecase';

@Component({
  selector: 'app-register-Client',
  templateUrl: 'register-Client.component.html',
})
export class RegisterClientComponent implements OnInit {
  formClient: FormGroup;
  constructor(
    private _postClient: PostClientUseCase,
    public _dialogref: DynamicDialogRef,
    private _formBuilder: FormBuilder
  ) {}

  

  ngOnInit() {
    this.createformClient();
    
  }
  nombres: string | null = null;
  apellido_paterno: string | null = null;
  apellido_materno: string | null = null;
  estado: Status | null = null;
  documento_identificador: string | null = null;
  telefono: string | null = null;
  correo: string | null = null;
  usuario: string | null = null;
  contraseña: string | null = null;

  createformClient() {
    this.formClient = this._formBuilder.group({
      nombres: [null],
      apellido_paterno: [null],
      apellido_materno: [null],
      estado: [null],
      documento_identificador: [null],
      telefono: [null],
      correo: [null],
      usuario: [null],
      contraseña: [null],
    });
  }


  async addClient() {
    const form = this.formClient.value;
    const bodyRequestClient: PostClientRequest = {
      nombres:form.nombres,
      apellido_paterno:form.apellido_paterno,
      apellido_materno: form.apellido_materno,
      fecha_nacimiento: form.fecha_nacimiento,
      estado: form.estado,
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
    try {
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
