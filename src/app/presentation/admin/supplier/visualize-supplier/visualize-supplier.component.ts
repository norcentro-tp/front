import { Component, OnInit } from '@angular/core';
import {
  Status,
  Supplier,
  SupplierItemResponse,
} from 'src/app/core/models/inventory/response/get-all-inventory.response';
import { GetAllSuppliersUseCase } from 'src/app/core/usecase/supplier/get-all-suppliers.usecase';
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
    private _getAllSuppliers: GetAllSuppliersUseCase,
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
