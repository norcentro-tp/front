import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RegisterSupplierComponent } from '../register-supplier/register-supplier.component';
import { GetAllSupplierResponse } from 'src/app/core/models/all/response/all-responses.response';
import { GetAllSuppliersUseCase } from 'src/app/core/usecase/supplier/get-all-suppliers.usecase';
import { DeleteSupplierUseCase } from 'src/app/core/usecase/supplier/delete-supplier.usecase';
import { UpdateSupplierComponent } from '../update-supplier/update-supplier.component';
import { VisualizeSupplierComponent } from '../visualize-supplier/visualize-supplier.component';
import { ConfirmationService } from 'primeng/api';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-manage-supplier',
  templateUrl: 'manage-supplier.component.html',
  providers: [DialogService],
})
export class ManageSupplierComponent implements OnInit {
  lSuppliers: any[] = [];
  constructor(
    public dialogService: DialogService,
    private _confirmationService: ConfirmationService,
    private _alertService: AlertService,
    private _getAllSuppliers: GetAllSuppliersUseCase,
    private _deleteSupplier: DeleteSupplierUseCase
  ) {}
  ref: DynamicDialogRef;

  ngOnInit() {
    this.getAllSuppliers();
  }
  async getAllSuppliers() {
    try {
      const response: GetAllSupplierResponse[] =
        await this._getAllSuppliers.execute();

      console.log('INVENTARIO RESPUESTA BACKEND', response);
      this.lSuppliers = response.reverse();
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
      this.getAllSuppliers();
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
      this.getAllSuppliers();
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
      this.getAllSuppliers();
    });
  }
   deleteSupplier(id: string){
    try { this._confirmationService.confirm({ 
      message: "Estás seguro que desea eliminar? ",
      accept: ()=> {
        this._deleteSupplier.execute(id).then(() => {
          this.getAllSuppliers();
          this._alertService.success('Se elimino el proveedor seleccionado');
        });
      },
      reject: ()=> {},
    })
      
    } catch (error) {
      
    }
}
}
