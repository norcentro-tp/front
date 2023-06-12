import { Component, OnInit } from '@angular/core';
import { Client} from 'src/app/core/models/all/response/all-responses.response';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GetClientByIdUseCase } from 'src/app/core/usecase/client/get-client-byid.usecase';


@Component({
  selector: 'app-visualize-client',
  templateUrl: 'visualize-client.component.html',
  styleUrls: ['visualize-client.component.css'],
})
export class VisualizeClientComponent implements OnInit {
    formClient: FormGroup;
  constructor(
    private _getClientById: GetClientByIdUseCase,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.createformClient();
    this.getClientById(this.config.data.id);
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
      usuario: [null],
      contraseña: [null]
    });
  }

  async getClientById(id: string) {
    try {
      const response:Client =
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
        usuario: response.usuario.nombre_usuario,
        contraseña: response.usuario.password
      });
    } catch (error) {
      console.error(error);
    }
  }
  async close() {
    this.ref.close();
  }
}