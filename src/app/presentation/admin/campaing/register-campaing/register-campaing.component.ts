import { Component, OnInit } from '@angular/core';
import {
  GetAllCampaingResponse,
  Status,
} from 'src/app/core/models/all/response/all-responses.response';
import { PostCampaingRequest} from 'src/app/core/models/all/request/all-requests.request';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PostCampaingUseCase } from 'src/app/core/usecase/campaing/post-campaing.usecase';
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
  selector: 'app-register-Campaing',
  templateUrl:'register-Campaing.component.html',
})
export class RegisterCampaingComponent implements OnInit {
  formCampaing: FormGroup;
  constructor(
    private _postCampaing: PostCampaingUseCase,
    public _dialogref: DynamicDialogRef,
    public _dropdownModule: DropdownModule,
    private _formBuilder: FormBuilder,
    private _alertService: AlertService
  ) {}

  ngOnInit() {
    this.createformCampaing();
  }

  createformCampaing() {
    this.formCampaing = this._formBuilder.group({
      nombre: [
        null,
        [
          Validators.minLength(4),
          Validators.maxLength(20),
          alphabeticValidator()
        ],
      ],
      fecha_inicio: [null],
      fecha_fin: [null],
      archivos: [null],
      descripcion: [null],
      estado: [null],
      
    })
  }


  async addCampaing() {
    const form = this.formCampaing.value;
    const bodyRequestCampaing: PostCampaingRequest = {
      nombre:form.nombre,
      fecha_inicio:form.fecha_inicio,
      fecha_fin:form.fecha_fin,
      archivos:form.archivos,
      descripcion:form.descripcion,
      estado:form.estado,
      };
    this.formCampaing.markAllAsTouched();
    if (this.formCampaing.invalid) {
      this._alertService.error('Por favor llene todos los campos correctamente');
      return;
    };
    try {
      if (this.formCampaing.invalid) return;
      const response: GetAllCampaingResponse = await this._postCampaing.execute(
        bodyRequestCampaing
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
  
  
