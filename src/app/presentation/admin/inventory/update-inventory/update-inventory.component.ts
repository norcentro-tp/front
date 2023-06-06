import { Component, OnInit } from '@angular/core';
import {
  Brand,
  Category,
  Model,
  Status,
  Supplier,
} from 'src/app/core/models/inventory/response/get-all-inventory.response';
import { GetAllBrandsUseCase } from 'src/app/core/usecase/brand/get-all-brands.usecase';
import { GetAllCategoriesUseCase } from 'src/app/core/usecase/category/get-all-categories.usecase';
import { GetInventoryByIdUseCase } from 'src/app/core/usecase/inventory/get-moto-byid.usecase';
import { PutMotoUseCase } from 'src/app/core/usecase/inventory/put-moto.usecase';
import { GetAllModeloUseCase } from 'src/app/core/usecase/modelo/get-all-modelo.usecase';
import { GetAllStatusUseCase } from 'src/app/core/usecase/status/get-all-status.usecase';
import { GetAllSuppliersUseCase } from 'src/app/core/usecase/supplier/get-all-suppliers.usecase';
import { InventoryItemResponse } from 'src/app/core/models/inventory/response/get-all-inventory.response';
import { PutInventoryRequest } from 'src/app/core/models/inventory/request/post-moto.request';
import { AlertService } from 'src/app/shared/services/alert.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-inventory',
  templateUrl: 'update-inventory.component.html',
  styleUrls: ['update-inventory.component.css'],
})
export class UpdateInventoryComponent implements OnInit {
  formInventory: FormGroup;
  listaCategoriaMotos: Category[] = []
  listaModelo: Model[] = []
  listaMarca: Brand[] = []
  listaProveedor: Supplier[] = []
  listaStatus: Status[] = []
  constructor(
    private _getAllCategories: GetAllCategoriesUseCase,
    private _getAllModels: GetAllModeloUseCase,
    private _getAllBrands: GetAllBrandsUseCase,
    private _getAllSuppliers: GetAllSuppliersUseCase,
    private _getAllStatus: GetAllStatusUseCase,
    private _getMotoById: GetInventoryByIdUseCase,
    private _putMoto: PutMotoUseCase,
    private _alertService: AlertService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.createformInventory();
    this.getAllCategories();
    this.getAllModels();
    this.getAllBrands();
    this.getAllSuppliers();
    this.getAllStatus();
    this.getMotobyId(this.config.data.id)
  }

  createformInventory() {
    this.formInventory = this._formBuilder.group({
      codigoVin: [null],
      codigoColor: [null],
      categoriaMotos: [null],
      modelo: [null],
      marca: [null],
      proveedor: [null],
      estado: [null]

    })
  }

  async getMotobyId(id: string) {
    try {
      const response: InventoryItemResponse = await this._getMotoById.execute(id);
      console.log(response);
      this.formInventory.setValue({
        codigoVin: response.codigo_vin,
        codigoColor: response.color,
        categoriaMotos: response.categoria._id,
        modelo: response.modelo._id,
        marca: response.marca._id,
        proveedor: response.proveedor._id,
        estado: response.estado._id

      })
    } catch (error) {
      console.error(error);
    }
  }

  async getAllCategories() {
    try {
      const response: Category[] = await this._getAllCategories.execute();
      this.listaCategoriaMotos = response;
    } catch (error) {
      console.error(error);
    }
  }

  async getAllModels() {
    try {
      const response: Model[] = await this._getAllModels.execute();
      this.listaModelo = response;
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
  async getAllSuppliers() {
    try {
      const response: Supplier[] = await this._getAllSuppliers.execute();
      this.listaProveedor = response;
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  async getAllStatus() {
    try {
      const response: Status[] = await this._getAllStatus.execute();
      this.listaStatus = response;
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  async updateMoto(id: string) {
    const form = this.formInventory.value
    const bodyRequestMotos: PutInventoryRequest = {
      codigo_vin: form.codigoVin,
      color: form.codigoColor,
      categoria: form.categoriaMotos,
      modelo: form.model,
      marca: form.marca,
      proveedor: form.proveedor,
      estado: form.estado,
    };
    try {
      const response: InventoryItemResponse = await this._putMoto.execute({
        id: id,
        bodyRequest: bodyRequestMotos
      });

      this._alertService.success('Cambios Guardados')
      console.log(response);
      this.ref.close();
    } catch (error) {
      console.error(error);
    }
  }
}
