import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GetAllInventoryResponse } from 'src/app/core/models/inventory/response/get-all-inventory.response';
import { GetAllInventoryUseCase } from 'src/app/core/usecase/inventory/get-all-inventory.usecase';
import { RegisterInventoryComponent } from '../register-inventory/register-inventory.component';

@Component({
  selector: 'app-manage-inventory',
  templateUrl: 'manage-inventory.component.html',
  providers: [DialogService],
})
export class ManageInventoryComponent implements OnInit {
  lInventory: any[] = [];

  constructor(
    public dialogService: DialogService,

    private _getAllInventory: GetAllInventoryUseCase
  ) {}
  ref: DynamicDialogRef;
  ngOnInit() {
    this.getAllInventory();
  }

  async getAllInventory() {
    try {
      const response: GetAllInventoryResponse[] =
        await this._getAllInventory.execute();

      console.log('INVENTARIO RESPUESTA BACKEND', response);
      this.lInventory = response;
    } catch (error) {
      console.log(error);
    }
  }

  openDialog() {
    this.ref = this.dialogService.open(RegisterInventoryComponent, {
      header: 'Agregar moto',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      width: '80rem',
    });

    this.ref.onClose.subscribe((result) => {
      this.getAllInventory();
    });
  }
}
