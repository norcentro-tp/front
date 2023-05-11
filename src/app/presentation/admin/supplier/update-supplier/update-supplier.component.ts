import { Component, OnInit } from '@angular/core';
import {
  Supplier,
  SupplierItemResponse,
} from 'src/app/core/models/inventory/response/get-all-inventory.response';
import { GetAllSuppliersUseCase } from 'src/app/core/usecase/supplier/get-all-suppliers.usecase';
import { PutSupplierRequest } from 'src/app/core/models/inventory/request/post-moto.request';
import { AlertService } from 'src/app/shared/services/alert.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GetSupplierByIdUseCase } from 'src/app/core/usecase/supplier/get-supplier-byid.usecase';
import { PutSupplierUseCase } from 'src/app/core/usecase/supplier/put-supplier.usecase';

@Component({
  selector: 'app-update-supplier',
  templateUrl: 'update-supplier.component.html',
  styleUrls: ['update-supplier.component.css'],
})
export class UpdateSupplierComponent implements OnInit {
  formSupplier: FormGroup;
  listaProveedor: Supplier[] = [];

  constructor(
    private _getAllSuppliers: GetAllSuppliersUseCase,
    private _getSupplierById: GetSupplierByIdUseCase,
    private _putSupplier: PutSupplierUseCase,
    private _alertService: AlertService,
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
  async updateSupplier(id: string) {
    const form = this.formSupplier.value;
    const bodyRequestSupplier: PutSupplierRequest = {
      nombre: form.nombre,
      telefono: form.telefono,
      correo: form.correo,
      direccion: form.direccion,
    };
    try {
      const response: SupplierItemResponse = await this._putSupplier.execute({
        id: id,
        bodyRequest: bodyRequestSupplier,
      });

      this._alertService.success('Cambios Guardados');
      console.log(response);
      this.ref.close();
    } catch (error) {
      console.error(error);
    }
  }
}
