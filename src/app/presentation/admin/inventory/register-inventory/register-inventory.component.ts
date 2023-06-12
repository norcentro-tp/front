import { Component, OnInit } from '@angular/core';
import {
  Brand,
  Category,
  Model,
  Status,
  Supplier,
} from 'src/app/core/models/all/response/all-responses.response';
import { GetAllBrandsUseCase } from 'src/app/core/usecase/brand/get-all-brands.usecase';
import { GetAllCategoriesUseCase } from 'src/app/core/usecase/category/get-all-categories.usecase';
import { PostMotoUseCase } from 'src/app/core/usecase/inventory/post-moto.usecase';
import { GetAllStatusUseCase } from 'src/app/core/usecase/status/get-all-status.usecase';
import { GetAllSuppliersUseCase } from 'src/app/core/usecase/supplier/get-all-suppliers.usecase';
import { GetAllInventoryResponse } from 'src/app/core/models/all/response/all-responses.response';
import { PostInventoryRequest } from 'src/app/core/models/all/request/all-requests.request';
import { AlertService } from 'src/app/shared/services/alert.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { GetAllModelsUseCase } from 'src/app/core/usecase/model/get-all-models.usecase';

@Component({
  selector: 'app-register-inventory',
  templateUrl: 'register-inventory.component.html',
  styleUrls: ['register-inventory.component.css'],
})
export class RegisterInventoryComponent implements OnInit {
  formInventory: FormGroup;
  listaCategoriaMotos: Category[] = [];
  listaModelo: Model[] = [];
  listaMarca: Brand[] = [];
  listaProveedor: Supplier[] = [];
  listaStatus: Status[] = [];

  constructor(
    private _getAllCategories: GetAllCategoriesUseCase,
    private _getAllModels: GetAllModelsUseCase,
    private _getAllBrands: GetAllBrandsUseCase,
    private _getAllSuppliers: GetAllSuppliersUseCase,
    private _getAllStatus: GetAllStatusUseCase,
    private _postMoto: PostMotoUseCase,
    private _dialogRef: DynamicDialogRef,
    private _alertService: AlertService,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.createformInventory();
    this.getAllCategories();
    this.getAllModels();
    this.getAllBrands();
    this.getAllSuppliers();
    this.getAllStatus();
  }

  createformInventory() {
    this.formInventory = this._formBuilder.group({
      codigoVin: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
      codigoColor: new FormControl(null, [
        Validators.required,
      ]),
      categoriaMotos: [null],
      modelo: [null],
      marca: [null],
      proveedor: [null],
      estado: [null],
    });
  }

  async getAllCategories() {
    try {
      const response: Category[] = await this._getAllCategories.execute();
      this.listaCategoriaMotos = response;
    } catch (error) {
      console.error(error);
    }
  }

  get codigoVin() { return this.formInventory.get('codigoVin'); }

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
  async addMoto() {
    if (!this.formInventory.valid) return
    const form = this.formInventory.value;
    const bodyRequestMotos: PostInventoryRequest = {
      codigo_vin: form.codigoVin,
      color: form.codigoColor,
      categoria: form.categoriaMotos,
      modelo: form.modelo,
      marca: form.marca,
      proveedor: form.proveedor,
      estado: form.estado,
    };
    try {
      const response: GetAllInventoryResponse = await this._postMoto.execute(
        bodyRequestMotos
      );

      this._alertService.success('Se realizo el registro');
      console.log(response);
      this.close();
    } catch (error) {
      console.error(error);
    }
  }

  close() {
    this._dialogRef.close();
  }
}
