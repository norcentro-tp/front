import { Component, OnInit } from '@angular/core';
import {
  Client,
  GetAllClientResponse,
} from 'src/app/core/models/all/response/all-responses.response';
import { PutClientRequest } from 'src/app/core/models/all/request/all-requests.request';
import { AlertService } from 'src/app/shared/services/alert.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GetClientByIdUseCase } from 'src/app/core/usecase/client/get-client-byid.usecase';
import { PutClientUseCase } from 'src/app/core/usecase/client/put-client.usecase';
import { NgPlural } from '@angular/common';

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
      nombres: [null],
      apellido_paterno: [null],
      apellido_materno: [null],
      estado: [null],
      documento_identificador: [null],
      telefono: [null],
      correo: [null],
      usuario: {
        _id:[null],
        nombre_usuario:[null],
        password:[null]
      }
    });
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
        estado: response.estado,
        documento_identificador: response.documento_identificador.numero_documento,
        telefono: response.telefono,
        correo: response.correo,
        usuario: response.usuario
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
      estado: form.estado,
      documento_identificador: {
        tipo_documento:"DNI",
        numero_documento:form. documento_identificador
      },
      telefono: form.telefono,
      correo: form.correo,
      usuario:form.usuario
    };
    try {
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
