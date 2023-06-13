import { Component, OnInit } from '@angular/core';
import {
  Employee,
  GetAllEmployeeResponse,
} from 'src/app/core/models/all/response/all-responses.response';
import { PutEmployeeRequest } from 'src/app/core/models/all/request/all-requests.request';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GetEmployeeByIdUseCase } from 'src/app/core/usecase/employee/get-employee-byid.usecase';
import { PutEmployeeUseCase } from 'src/app/core/usecase/employee/put-employee.usecase';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { emailValidator, passwordValidator, numericValidator, alphabeticValidator, alphanumericValidator, allFieldsFilledValidator } from '../../validators/custom-validators';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: 'update-employee.component.html',
  styleUrls: ['update-employee.component.css'],
})
export class UpdateEmployeeComponent implements OnInit {
  formEmployee: FormGroup;
  
  

  constructor(
    private _getEmployeeById: GetEmployeeByIdUseCase,
    private _putEmployee: PutEmployeeUseCase,
    private _alertService: AlertService,
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
      fecha_nacimiento: [null],
      estado: [null],
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

  async getEmployeebyId(id: string) {
    try {
      const response: GetAllEmployeeResponse =
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
      console.log(this.formEmployee.value);
    } catch (error) {
      console.error(error);
    }
  }
  async updateEmployee(id: string) {
    const form = this.formEmployee.value;
    const bodyRequestEmployee: PutEmployeeRequest = {
      nombres: form.nombres,
      apellido_paterno: form.apellido_paterno,
      apellido_materno: form.apellido_materno,
      fecha_nacimiento: form.fecha_nacimiento,
      estado: form.estado,
      documento_identificador: {
        tipo_documento:"DNI",
        numero_documento:form. documento_identificador
      },
      telefono: form.telefono,
      correo: form.correo,
      usuario:{
         nombre_usuario:form.usuario,
         password: form.contraseña
      }
    };
    this.formEmployee.markAllAsTouched();
    if (this.formEmployee.invalid) {
      this._alertService.error('Por favor llene todos los campos correctamente');
      return;
    };
    try {
      if (this.formEmployee.invalid) return;
      const response: Employee = await this._putEmployee.execute({
        id: id,
        bodyRequest: bodyRequestEmployee,
      });

      this._alertService.success('Cambios Guardados');
      console.log(response);
      this.ref.close();
    } catch (error) {
      console.error(error);
    }
  }
}
