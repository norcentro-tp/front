import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RegisterSupplierComponent } from '../register-supplier/register-supplier.component';
import { GetAllSupplierResponse } from 'src/app/core/models/inventory/response/get-all-inventory.response';
import { GetAllSuppliersUseCase } from 'src/app/core/usecase/supplier/get-all-suppliers.usecase';
import { UpdateSupplierComponent } from '../update-supplier/update-supplier.component';
import { VisualizeSupplierComponent } from '../visualize-supplier/visualize-supplier.component';

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

  openRegister() {
    const ref = this.dialogService.open(RegisterSupplierComponent, {
      header: 'Agregar Moto',
      width: '60rem',
    });

    ref.onClose.subscribe((result) => {
      console.log('SE CERRO');
      this.getAllSupplier();
    });
  }

  openUpdateDialog(id: string) {
    const ref = this.dialogService.open(UpdateSupplierComponent, {
      header: 'Editar Proveedor',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      width: '80rem',
      data: {
        id: id,
      },
    });

    ref.onClose.subscribe((result) => {
      console.log('SE CERRO');
      this.getAllSupplier();
    });
  }
  openVisualizeDialog(id: string) {
    const ref = this.dialogService.open(VisualizeSupplierComponent, {
      header: 'Visualizar Proveedor',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      width: '80rem',
      data: {
        id: id,
      },
    });

    ref.onClose.subscribe((result) => {
      console.log('SE CERRO');
      this.getAllSupplier();
    });
  }
}
