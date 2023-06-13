import { Component, OnInit } from '@angular/core';
import { Employee} from 'src/app/core/models/all/response/all-responses.response';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  FormBuilder,
  FormGroup,
  FormControl
} from '@angular/forms';
import { GetEmployeeByIdUseCase } from 'src/app/core/usecase/employee/get-employee-byid.usecase';

@Component({
  selector: 'app-visualize-employee',
  templateUrl: 'visualize-employee.component.html',
  styleUrls: ['visualize-employee.component.css'],
})
export class VisualizeEmployeeComponent implements OnInit {
  formEmployee: FormGroup;
  constructor(
    private _getEmployeeById: GetEmployeeByIdUseCase,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.createformEmployee();
    this.getEmployeebyId(this.config.data.id);
  }

  createformEmployee() {
    this.formEmployee = this._formBuilder.group({
      nombres: new FormControl( {value: null, disabled: true} ),
      apellido_paterno: new FormControl( {value: null, disabled: true} ),
      apellido_materno: new FormControl( {value: null, disabled: true} ),
      fecha_nacimiento: new FormControl( {value: null, disabled: true} ),
      estado: new FormControl( {value: null, disabled: true} ),
      documento_identificador: new FormControl( {value: null, disabled: true} ),
      telefono: new FormControl( {value: null, disabled: true} ),
      correo: new FormControl( {value: null, disabled: true} ),
      usuario: new FormControl( {value: null, disabled: true} ),
      contraseña: new FormControl( {value: null, disabled: true} )
    });
  }

  async getEmployeebyId(id: string) {
    try {
      const response:Employee =
        await this._getEmployeeById.execute(id);
      console.log(response);
      this.formEmployee.setValue({
        nombres: response.nombres,
        apellido_paterno: response.apellido_paterno,
        apellido_materno: response.apellido_materno,
        fecha_nacimiento: response.fecha_nacimiento,
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
