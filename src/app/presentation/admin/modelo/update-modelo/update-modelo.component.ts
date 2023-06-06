import { Component, OnInit } from '@angular/core';
import {
  Brand,
  BrandItemResponse,
  Model,
} from 'src/app/core/models/inventory/response/get-all-inventory.response';
import { AlertService } from 'src/app/shared/services/alert.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PutModeloRequest } from 'src/app/core/models/inventory/request/post-moto.request';
import { GetAllModeloUseCase } from 'src/app/core/usecase/modelo/get-all-modelo.usecase';
import { PutModeloUseCase } from 'src/app/core/usecase/modelo/put-modelo.usecase';
import { GetModeloByIdUseCase } from 'src/app/core/usecase/modelo/get-modelo-byid.usecase';

@Component({
  selector: 'app-update-modelo',
  templateUrl: 'update-modelo.component.html',
  styleUrls: ['update-modelo.component.css'],
})
export class UpdateModeloComponent implements OnInit {
  formModelo: FormGroup;
  listaModelo: Model[] = [];

  constructor(
    private _getAllModelo: GetAllModeloUseCase,
    private _getModeloById: GetModeloByIdUseCase,
    private _putModelo: PutModeloUseCase,
    private _alertService: AlertService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.createformModelo();
    this.getAllModelo();
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

  async getAllModelo() {
    try {
      const response: Model[] = await this._getAllModelo.execute();
      this.listaModelo = response;
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  async updateModelo(id: string) {
    const form = this.formModelo.value;
    const bodyRequestModelo: PutModeloRequest = {
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
