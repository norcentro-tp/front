import { Component, OnInit } from '@angular/core';
import {
  GetAllEmployeeResponse,
  Status,
} from 'src/app/core/models/all/response/all-responses.response';
import { PostEmployeeRequest} from 'src/app/core/models/all/request/all-requests.request';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PostEmployeeUseCase } from 'src/app/core/usecase/employee/post-employee.usecase';
import { DropdownModule } from 'primeng/dropdown';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { emailValidator, passwordValidator, numericValidator, alphabeticValidator, alphanumericValidator, allFieldsFilledValidator } from '../../validators/custom-validators';
import { AlertService } from 'src/app/shared/services/alert.service';

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
    private _formBuilder: FormBuilder,
    private _alertService: AlertService
  ) {}

  ngOnInit() {
    this.createformEmployee();
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
    }, { validators:allFieldsFilledValidator() });
  }

  async addEmployee() {
    const form = this.formEmployee.value;
    const bodyRequestEmployee: PostEmployeeRequest = {
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
    this.formEmployee.markAllAsTouched();
    if (this.formEmployee.invalid) {
      this._alertService.error('Por favor llene todos los campos correctamente');
      return;
    };
    try {
      if (this.formEmployee.invalid) return;
      const response: GetAllEmployeeResponse = await this._postEmployee.execute(
        bodyRequestEmployee
      );

      this._alertService.success('Se realizo el registro con exito');
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
