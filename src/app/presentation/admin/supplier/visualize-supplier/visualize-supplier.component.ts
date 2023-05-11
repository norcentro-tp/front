import { Component, OnInit } from '@angular/core';
import {
  Brand,
  Category,
  Model,
  Status,
  Supplier,
  SupplierItemResponse,
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
import { GetSupplierByIdUseCase } from 'src/app/core/usecase/supplier/get-supplier-byid.usecase';

@Component({
  selector: 'app-supplier-inventory',
  templateUrl: 'visualize-supplier.component.html',
  styleUrls: ['visualize-supplier.component.css'],
})
export class VisualizeSupplierComponent implements OnInit {
  formSupplier: FormGroup;
  listaProveedor: Supplier[] = [];
  listaStatus: Status[] = [];
  constructor(
    private _getAllCategories: GetAllCategoriesUseCase,
    private _getAllModels: GetAllModelsUseCase,
    private _getAllBrands: GetAllBrandsUseCase,
    private _getAllSuppliers: GetAllSuppliersUseCase,
    private _getAllStatus: GetAllStatusUseCase,
    private _getMotoById: GetInventoryByIdUseCase,
    private _getSupplierById: GetSupplierByIdUseCase,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.createformSupplier();
    this.getAllSuppliers();
    this.getSupplierbyId(this.config.data.id);
  }

  createformSupplier() {
    this.formSupplier = this._formBuilder.group({
      nombre: [null],
      telefono: [null],
      correo: [null],
      direccion: [null],
    });
  }

  async getSupplierbyId(id: string) {
    try {
      const response: SupplierItemResponse =
        await this._getSupplierById.execute(id);
      console.log(response);
      this.formSupplier.setValue({
        nombre: response.nombre,
        telefono: response.telefono,
        correo: response.correo,
        direccion: response.direccion,
      });
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
  async close() {
    this.ref.close();
  }
}
