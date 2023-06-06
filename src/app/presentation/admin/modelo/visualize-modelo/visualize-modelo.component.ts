import { Component, OnInit } from '@angular/core';
import {
  Model,
  Status,
} from 'src/app/core/models/inventory/response/get-all-inventory.response';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GetAllModeloUseCase } from 'src/app/core/usecase/modelo/get-all-modelo.usecase';
import { GetModeloByIdUseCase } from 'src/app/core/usecase/modelo/get-modelo-byid.usecase';

@Component({
  selector: 'app-modelo-inventory',
  templateUrl: 'visualize-modelo.component.html',
  styleUrls: ['visualize-modelo.component.css'],
})
export class VisualizeModeloComponent implements OnInit {
  formModelo: FormGroup;
  listaModelo: Model[] = [];
  listaStatus: Status[] = [];
  constructor(
    private _getAllModelo: GetAllModeloUseCase,
    private _getModeloById: GetModeloByIdUseCase,
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
        anio: response.anio
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
  async close() {
    this.ref.close();
  }
}
