import { Component, OnInit } from '@angular/core';
import {  Model } from 'src/app/core/models/all/response/all-responses.response';
import { AlertService } from 'src/app/shared/services/alert.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PutModelRequest } from 'src/app/core/models/all/request/all-requests.request';
import { PutModelUseCase } from 'src/app/core/usecase/model/put-model.usecase';
import { GetModelByIdUseCase } from 'src/app/core/usecase/model/get-model-byid.usecase';

@Component({
  selector: 'app-update-model',
  templateUrl: 'update-model.component.html',
  styleUrls: ['update-model.component.css'],
})
export class UpdateModelComponent implements OnInit {
  formModelo: FormGroup;
  listaModelo: Model[] = [];

  constructor(
    private _getModeloById: GetModelByIdUseCase,
    private _putModelo: PutModelUseCase,
    private _alertService: AlertService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.createformModelo();
    this.getModelobyId(this.config.data.id);
  }

  createformModelo() {
    this.formModelo = this._formBuilder.group({
      nombre: [null],
      cilindrada: [null],
      velocidades: [null],
      capacidadTanque: [null],
      torque: [null],
      motor: [null],
      potencia: [null],
      precio: [null],
      descripcion: [null],
      anio: [null],
    });
  }

  async getModelobyId(id: string) {
    try {
      const response: Model = await this._getModeloById.execute(id);
      console.log(response);
      this.formModelo.setValue({
        nombre: response.nombre,
        cilindrada: response.cilindrada,
        velocidades: response.velocidades,
        capacidadTanque: response.capacidadTanque,
        torque: response.torque,
        motor: response.motor,
        potencia: response.potencia,
        precio: response.precio,
        descripcion: response.descripcion,
        anio: response.anio,
      });
    } catch (error) {
      console.error(error);
    }
  }
  async updateModelo(id: string) {
    const form = this.formModelo.value;
    const bodyRequestModelo: PutModelRequest = {
      id: id,
      nombre: form.nombre,
      cilindrada: form.cilindrada,
      velocidades: form.velocidades,
      capacidadTanque: form.capacidadTanque,
      torque: form.torque,
      motor: form.motor,
      potencia: form.potencia,
      precio: form.precio,
      descripcion: form.descripcion,
      foto: form.foto,
    };
    try {
      const response: Model = await this._putModelo.execute({
        id: id,
        bodyRequest: bodyRequestModelo,
      });

      this._alertService.success('Cambios Guardados');
      console.log(response);
      this.ref.close();
    } catch (error) {
      console.error(error);
    }
  }
}
