import { Component, OnInit } from '@angular/core';
import { Employee} from 'src/app/core/models/all/response/all-responses.response';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup } from '@angular/forms';
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
      nombres: [null],
      apellido_paterno: [null],
      apellido_materno: [null],
      fecha_nacimiento: [null],
      estado: [null],
      documento_identificador: [null],
      telefono: [null],
      correo: [null],
      usuario: [null],
      contraseña: [null]
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
