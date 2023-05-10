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
import { GetAllModelsUseCase } from 'src/app/core/usecase/modelo/get-all-models.usecase';
import { GetAllStatusUseCase } from 'src/app/core/usecase/status/get-all-status.usecase';
import { GetAllSuppliersUseCase } from 'src/app/core/usecase/supplier/get-all-suppliers.usecase';
import { InventoryItemResponse } from 'src/app/core/models/inventory/response/get-all-inventory.response';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-visualize-inventory',
  templateUrl: 'visualize-inventory.component.html',
  styleUrls: ['visualize-inventory.component.css'],
})
export class VisualizeInventoryComponent implements OnInit {
  formInventory: FormGroup;
  listaCategoriaMotos: Category[] = []
  listaModelo: Model[] = []
  listaMarca: Brand[] = []
  listaProveedor: Supplier[] = []
  listaStatus: Status[] = []
  constructor(
    private _getAllCategories: GetAllCategoriesUseCase,
    private _getAllModels: GetAllModelsUseCase,
    private _getAllBrands: GetAllBrandsUseCase,
    private _getAllSuppliers: GetAllSuppliersUseCase,
    private _getAllStatus: GetAllStatusUseCase,
    private _getMotoById: GetInventoryByIdUseCase,
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
  async close() {
      this.ref.close()
  }
}
