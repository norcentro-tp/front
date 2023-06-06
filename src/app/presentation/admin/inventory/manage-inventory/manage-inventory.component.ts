import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GetAllInventoryResponse } from 'src/app/core/models/all/response/all-responses.response';
import { GetAllInventoryUseCase } from 'src/app/core/usecase/inventory/get-all-inventory.usecase';
import { DeleteMotoUseCase } from 'src/app/core/usecase/inventory/delete-moto.usecase';
import { RegisterInventoryComponent } from '../register-inventory/register-inventory.component';
import { UpdateInventoryComponent } from '../update-inventory/update-inventory.component';
import { ConfirmationService } from 'primeng/api';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-manage-inventory',
  templateUrl: 'manage-inventory.component.html',
  providers: [DialogService],
})

export class ManageInventoryComponent implements OnInit {
  lInventory: any[] = [];

  constructor(
    public dialogService: DialogService,
    private _confirmationService: ConfirmationService,
    private _alertService: AlertService,

    private _getAllInventory: GetAllInventoryUseCase,
    private _deleteMoto: DeleteMotoUseCase
  ) {}
  ngOnInit() {
    this.getAllInventory();
  }

  async getAllInventory() {
    try {
      const response: GetAllInventoryResponse[] =
        await this._getAllInventory.execute();

      console.log('INVENTARIO RESPUESTA BACKEND', response);
      this.lInventory = response.reverse();
    } catch (error) {
      console.log(error);
    }
  }

  openRegisterDialog() {
    const ref = this.dialogService.open(RegisterInventoryComponent, {
      header: 'Agregar Moto',
      width: '60rem',
    });

    ref.onClose.subscribe((result) => {
      console.log('SE CERRO')
      this.getAllInventory();
    });
  }

  openVisualizeDialog(id:string) {
    const ref = this.dialogService.open(UpdateInventoryComponent, {
      header: 'Visualizar Moto',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      width: '80rem',      
      data: {
        id: id
      }
    });    

    ref.onClose.subscribe((result) => {
      console.log('SE CERRO')
      this.getAllInventory();
    });
  }
  
  openUpdateDialog(id:string) {
    const ref = this.dialogService.open(UpdateInventoryComponent, {
      header: 'Editar Moto',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      width: '80rem',      
      data: {
        id: id
      }
    });    

    ref.onClose.subscribe((result) => {
      console.log('SE CERRO')
      this.getAllInventory();
    });
  }
  
  deleteInventory(id: string){
    try { this._confirmationService.confirm({ 
      message: "Estás seguro que desea eliminar? ",
      accept: ()=> {
        this._deleteMoto.execute(id).then(() => {
          this.getAllInventory();
          this._alertService.success('Se elimino el producto seleccionado');
        });
      },
      reject: ()=> {},
    })
      
    } catch (error) {
      
    }

  }
}
