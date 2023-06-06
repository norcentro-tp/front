import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Model } from 'src/app/core/models/inventory/response/get-all-inventory.response';

import { ConfirmationService } from 'primeng/api';
import { AlertService } from 'src/app/shared/services/alert.service';

import { GetAllModeloUseCase } from 'src/app/core/usecase/modelo/get-all-modelo.usecase';
import { DeleteModeloUseCase } from 'src/app/core/usecase/modelo/delete-modelo.usecase';
import { UpdateModeloComponent } from '../update-modelo/update-modelo.component';
import { RegisterModeloComponent } from '../register-modelo/register-modelo.component';
import { VisualizeModeloComponent } from '../visualize-modelo/visualize-modelo.component';

@Component({
  selector: 'app-manage-modelo',
  templateUrl: 'manage-modelo.component.html',
  providers: [DialogService],
})
export class ManageModeloComponent implements OnInit {
  lModelo: any[] = [];

  constructor(
    public dialogService: DialogService,
    private _confirmationService: ConfirmationService,
    private _alertService: AlertService,
    private _getAllModelo: GetAllModeloUseCase,
    private _deleteModelo: DeleteModeloUseCase
  ) {}
  ngOnInit() {
    this.getAllModels();
  }

  async getAllModels() {
    try {
      const response: Model[] = await this._getAllModelo.execute();

      console.log('MODELO RESPUESTA BACKEND', response);
      this.lModelo = response.reverse();
    } catch (error) {
      console.log(error);
    }
  }
  openRegisterDialog() {
    const ref = this.dialogService.open(RegisterModeloComponent, {
      header: 'Agregar Categoria',
      width: '60rem',
    });

    ref.onClose.subscribe((result) => {
      console.log('SE CERRO');
      this.getAllModels();
    });
  }
  openUpdateDialog(id: string) {
    const ref = this.dialogService.open(UpdateModeloComponent, {
      header: 'Editar Modelo',
      width: '40rem',
      data: {
        id: id,
      },
    });

    ref.onClose.subscribe((result) => {
      console.log('SE CERRO');
      this.getAllModels();
    });
  }
  openVisualizeDialog(id: string) {
    const ref = this.dialogService.open(VisualizeModeloComponent, {
      header: 'Visualizar Modelo',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      width: '80rem',
      data: {
        id: id,
      },
    });
  }

  deleteModelo(id: string) {
    try {
      this._confirmationService.confirm({
        message: 'Estás seguro que desea eliminar? ',
        accept: () => {
          this._deleteModelo.execute(id).then(() => {
            this.getAllModels();
            this._alertService.success('Se elimino la marca seleccionada');
          });
        },
        reject: () => {},
      });
    } catch (error) {}
  }
}
