import { Component, OnInit } from '@angular/core';
import {
  Campaing,
  GetAllCampaingResponse,
} from 'src/app/core/models/all/response/all-responses.response';
import { PutCampaingRequest } from 'src/app/core/models/all/request/all-requests.request';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GetCampaingByIdUseCase } from 'src/app/core/usecase/campaing/get-campaing-byid.usecase';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { emailValidator, passwordValidator, numericValidator, alphabeticValidator, alphanumericValidator, allFieldsFilledValidator } from '../../validators/custom-validators';
import { AlertService } from 'src/app/shared/services/alert.service';
import { PutCampaingUseCase } from 'src/app/core/usecase/campaing/put-campaing.usecase';

@Component({
  selector: 'app-update-Campaing',
  templateUrl: 'update-Campaing.component.html',
  styleUrls: ['update-Campaing.component.css'],
})
export class UpdateCampaingComponent implements OnInit {
  formCampaing: FormGroup;
  
  

  constructor(
    private _getCampaingById: GetCampaingByIdUseCase,
    private _putCampaing: PutCampaingUseCase,
    private _alertService: AlertService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.createformCampaing();
    this.getCampaingbyId(this.config.data.id);
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
      descripcion: [null],
      archivos: [null],
      estado: [null],
      
    })
  }


  async getCampaingbyId(id: string) {
    try {
      const response: GetAllCampaingResponse =
        await this._getCampaingById.execute(id);
      console.log(response);
      this.formCampaing.setValue({
        nombre:response.nombre,
        fecha_inicio:response.fecha_inicio,
        fecha_fin:response.fecha_fin,
        descripcion:response.descripcion,
        archivos:response.archivos,
        estado:response.estado,
      });
      console.log(this.formCampaing.value);
    } catch (error) {
      console.error(error);
    }
  }
  async updateCampaing(id: string) {
    const form = this.formCampaing.value;
    const bodyRequestCampaing: PutCampaingRequest = {
      nombre:form.nombre,
      fecha_inicio:form.fecha_inicio,
      fecha_fin:form.fecha_fin,
      descripcion:form.descripcion,
      archivos:form.archivos,
      estado:form.estado,
      };
    this.formCampaing.markAllAsTouched();
    if (this.formCampaing.invalid) {
      this._alertService.error('Por favor llene todos los campos correctamente');
      return;
    };
    try {
      if (this.formCampaing.invalid) return;
      const response: Campaing = await this._putCampaing.execute({
        id: id,
        bodyRequest: bodyRequestCampaing,
      });

      this._alertService.success('Cambios Guardados');
      console.log(response);
      this.ref.close();
    } catch (error) {
      console.error(error);
    }
  }
}
