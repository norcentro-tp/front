import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RegisterSupplierComponent } from '../register-supplier/register-supplier.component';
import {
  GetAllInventoryResponse,
  GetAllSupplierResponse,
} from 'src/app/core/models/inventory/response/get-all-inventory.response';
import { GetAllSuppliersUseCase } from 'src/app/core/usecase/supplier/get-all-suppliers.usecase';

@Component({
  selector: 'app-manage-supplier',
  templateUrl: 'manage-supplier.component.html',
  providers: [DialogService],
})
export class ManageSupplierComponent implements OnInit {
  lSuppliers: any[] = [];
  constructor(
    public dialogService: DialogService,
    private _getAllSuppliers: GetAllSuppliersUseCase
  ) {}
  ref: DynamicDialogRef;

  ngOnInit() {
    this.getAllSupplier();
  }
  async getAllSupplier() {
    try {
      const response: GetAllSupplierResponse[] =
        await this._getAllSuppliers.execute();

      console.log('INVENTARIO RESPUESTA BACKEND', response);
      this.lSuppliers = response;
    } catch (error) {
      console.log(error);
    }
  }

  openDialog() {
    this.ref = this.dialogService.open(RegisterSupplierComponent, {
      header: 'Agregar Proveedor',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      width: '80rem',
    });

    this.ref.onClose.subscribe((result) => {
      console.log(result);
    });
  }
}
