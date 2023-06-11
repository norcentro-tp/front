import { Component, OnInit } from '@angular/core';
import {
  GetAllEmployeeResponse,
  Status,
} from 'src/app/core/models/all/response/all-responses.response';
import { PostEmployeeRequest} from 'src/app/core/models/all/request/all-requests.request';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PostEmployeeUseCase } from 'src/app/core/usecase/employee/post-employee.usecase';
import { DropdownModule } from 'primeng/dropdown';
@Component({
  selector: 'app-register-employee',
  templateUrl:'register-employee.component.html',
})
export class RegisterEmployeeComponent implements OnInit {
  formEmployee: FormGroup;
  constructor(
    private _postEmployee: PostEmployeeUseCase,
    public _dialogref: DynamicDialogRef,
    public _dropdownModule: DropdownModule,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.createformEmployee();
  }
  nombres: string | null = null;
  apellido_paterno: string | null = null;
  apellido_materno: string | null = null;
  fecha_nacimiento: string | null = null;
  estado: Status | null = null;
  documento_identificador: string | null = null;
  telefono: string | null = null;
  correo: string | null = null;
  usuario: string | null = null;
  contraseña: string | null = null;

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
      contraseña: [null],
    });
  }

  async addEmployee() {
    const form = this.formEmployee.value;
    const bodyRequestEmployee: PostEmployeeRequest = {
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
      const response: GetAllEmployeeResponse = await this._postEmployee.execute(
        bodyRequestEmployee
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
