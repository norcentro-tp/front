import { Component, OnInit } from '@angular/core';
import {  Brand, Category, Model } from 'src/app/core/models/all/response/all-responses.response';
import { AlertService } from 'src/app/shared/services/alert.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PutModelRequest } from 'src/app/core/models/all/request/all-requests.request';
import { PutModelUseCase } from 'src/app/core/usecase/model/put-model.usecase';
import { GetModelByIdUseCase } from 'src/app/core/usecase/model/get-model-byid.usecase';
import { GetAllCategoriesUseCase } from 'src/app/core/usecase/category/get-all-categories.usecase';
import { GetAllBrandsUseCase } from 'src/app/core/usecase/brand/get-all-brands.usecase';

@Component({
  selector: 'app-update-model',
  templateUrl: 'update-model.component.html',
  styleUrls: ['update-model.component.css'],
})
export class UpdateModelComponent implements OnInit {
  formModelo: FormGroup;
  selectedFiles: File[]=[];
  listaCategoria: Category[] = [];
  listaMarca: Brand[] = [];

  constructor(
    private _getModeloById: GetModelByIdUseCase,
    private _getAllCategories: GetAllCategoriesUseCase,
    private _getAllBrands: GetAllBrandsUseCase,
    private _putModelo: PutModelUseCase,
    private _alertService: AlertService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.createformModelo();
    this.getAllCategories();
    this.getAllBrands();
    this.getModelobyId(this.config.data.id);
  }

  createformModelo() {
    this.formModelo = this._formBuilder.group({
      nombre: [null],
      categoria: [null],
      marca: [null],
      cilindrada: [null],
      velocidades: [null],
      capacidad_tanque: [null],
      torque: [null],
      motor: [null],
      potencia: [null],
      precio: [null],
      descripcion: [null],
      anio: [null],
      fotos:[null],
    });
  }
  onSelect(event: any)  {
    if (event.files && event.files.length > 0) {
      this.selectedFiles[0]= event.files[0];
      console.log(this.selectedFiles[0])
    }
  }

  async getModelobyId(id: string) {
    try {
      const response: Model = await this._getModeloById.execute(id);
      console.log(response);
      this.formModelo.setValue({
        nombre: response.nombre,
        categoria: response.categoria._id,
        marca: response.marca._id,
        cilindrada: response.cilindrada,
        velocidades: response.velocidades,
        capacidad_tanque: response.capacidad_tanque,
        torque: response.torque,
        motor: response.motor,
        potencia: response.potencia,
        precio: response.precio,
        descripcion: response.descripcion,
        anio: response.anio,
        fotos:response.fotos,
      });
    } catch (error) {
      console.error(error);
    }
  }
  async getAllCategories() {
    try {
      const response: Category[] = await this._getAllCategories.execute();
      this.listaCategoria = response;
    } catch (error) {
      console.error(error);
    }
  }

  async getAllBrands() {
    try {
      const response: Brand[] = await this._getAllBrands.execute();
      this.listaMarca = response;
    } catch (error) {
      console.error(error);
    }
  }
  async updateModelo(id: string) {
    const form = this.formModelo.value;
    const bodyRequestModelo: PutModelRequest = {
      id: id,
      nombre: form.nombre,
      categoria: form.categoria,
      marca: form.marca,
      cilindrada: form.cilindrada,
      velocidades: form.velocidades,
      capacidad_tanque: form.capacidad_tanque,
      torque: form.torque,
      motor: form.motor,
      potencia: form.potencia,
      precio: form.precio,
      descripcion: form.descripcion,
      foto: form.foto,
      anio:form.anio,
      imageFiles:this.selectedFiles[0]
    };
    try {
      const response: Model = await this._putModelo.execute( 
        bodyRequestModelo
      );

      this._alertService.success('Cambios Guardados');
      console.log(response);
      this.ref.close();
    } catch (error) {
      console.error(error);
    }
  }
}
