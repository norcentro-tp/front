import { Component, OnInit } from '@angular/core';
import {
  Model,
  Status,
} from 'src/app/core/models/all/response/all-responses.response';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GetModelByIdUseCase } from 'src/app/core/usecase/model/get-model-byid.usecase';

@Component({
  selector: 'app-visualize-model',
  templateUrl: 'visualize-model.component.html',
  styleUrls: ['visualize-model.component.css'],
})
export class VisualizeModelComponent implements OnInit {
  formModelo: FormGroup;
  listaModelo: Model[] = [];
  listaStatus: Status[] = [];
  constructor(
    private _getModelById: GetModelByIdUseCase,
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
      const response: Model = await this._getModelById.execute(id);
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
        anio: response.anio
      });
    } catch (error) {
      console.error(error);
    }
  }
  async close() {
    this.ref.close();
  }
}
