import { Component, OnInit } from '@angular/core';
import { Client} from 'src/app/core/models/all/response/all-responses.response';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GetClientByIdUseCase } from 'src/app/core/usecase/client/get-client-byid.usecase';
import {
  FormBuilder,
  FormGroup,
  FormControl
} from '@angular/forms';


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
      nombres: new FormControl( {value: null, disabled: true} ),
      apellido_paterno: new FormControl( {value: null, disabled: true} ),
      apellido_materno: new FormControl( {value: null, disabled: true} ),
      documento_identificador: new FormControl( {value: null, disabled: true} ),
      telefono: new FormControl( {value: null, disabled: true} ),
      correo: new FormControl( {value: null, disabled: true} ),
      usuario: new FormControl( {value: null, disabled: true} ),
      contraseña: new FormControl( {value: null, disabled: true} )
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