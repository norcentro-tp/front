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
import { PostMotoUseCase } from 'src/app/core/usecase/inventory/post-moto.usecase';
import { GetAllModelsUseCase } from 'src/app/core/usecase/modelo/get-all-models.usecase';
import { GetAllStatusUseCase } from 'src/app/core/usecase/status/get-all-status.usecase';
import { GetAllSuppliersUseCase } from 'src/app/core/usecase/supplier/get-all-suppliers.usecase';
import { GetAllInventoryResponse } from 'src/app/core/models/inventory/response/get-all-inventory.response';
import { PostInventoryRequest } from 'src/app/core/models/inventory/request/post-moto.request';
import { AlertService } from 'src/app/shared/services/alert.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-register-inventory',
  templateUrl: 'register-inventory.component.html',
  styleUrls: ['register-inventory.component.css']
})
export class RegisterInventoryComponent implements OnInit {

  constructor(
    private _getAllCategories: GetAllCategoriesUseCase,
    private _getAllModels: GetAllModelsUseCase,
    private _getAllBrands: GetAllBrandsUseCase,
    private _getAllSuppliers: GetAllSuppliersUseCase,
    private _getAllStatus: GetAllStatusUseCase,
    private _postMoto: PostMotoUseCase,
    private _dialogRef: DynamicDialogRef,
    private _alertService: AlertService
  ) { }

  ngOnInit() {
    this.getAllCategories();
    this.getAllModels();
    this.getAllBrands();
    this.getAllSuppliers();
    this.getAllStatus();
  }

  codigoVin: string | null = null;
  codigoColor: string | null = null;
  categoriaMoto: Category;
  listaCategoriaMotos: Category[];
  modelo: Model;
  listaModelo: Model[];
  listaMarca: Brand[];
  marca: Brand;
  listaProveedor: Supplier[];
  proveedor: Supplier;
  listaStatus: Status[];
  status: Status;
  bodyRequestMotos: PostInventoryRequest;

  async getAllCategories() {
    try {
      const response: Category[] = await this._getAllCategories.execute();
      this.categoriaMoto = response[0];
      this.listaCategoriaMotos = response;
    } catch (error) {
      console.error(error);
    }
  }

  async getAllModels() {
    try {
      const response: Model[] = await this._getAllModels.execute();
      this.modelo = response[0];
      this.listaModelo = response;
    } catch (error) {
      console.error(error);
    }
  }

  async getAllBrands() {
    try {
      const response: Brand[] = await this._getAllBrands.execute();
      this.marca = response[0];
      this.listaMarca = response;
    } catch (error) {
      console.error(error);
    }
  }
  async getAllSuppliers() {
    try {
      const response: Supplier[] = await this._getAllSuppliers.execute();
      this.proveedor = response[0];
      this.listaProveedor = response;
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  async getAllStatus() {
    try {
      const response: Status[] = await this._getAllStatus.execute();
      this.status = response[0];
      this.listaStatus = response;
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  async addMoto() {
    this.bodyRequestMotos = {
      codigo_vin: this.codigoVin,
      color: this.codigoColor,
      categoria: this.categoriaMoto,
      modelo: this.modelo,
      marca: this.marca,
      proveedor: this.proveedor,
      estado: this.status,
    };
    try {
      debugger
      const response: GetAllInventoryResponse = await this._postMoto.execute(
        this.bodyRequestMotos
      );

      this._alertService.success('Se realizo el registro')
      this.close()
    } catch (error) {
      console.error(error);
    }
  }

  close() {
    this._dialogRef.close()
  }
}
