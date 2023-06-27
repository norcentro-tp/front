import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GetAllCampaingResponse } from 'src/app/core/models/all/response/all-responses.response';
import { ConfirmationService } from 'primeng/api';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GetAllCampaingUseCase } from 'src/app/core/usecase/campaing/get-all-campaing.usecase';

import { DeleteCampaingUseCase } from 'src/app/core/usecase/campaing/delete-campaing.usecase';

import { VisualizeCampaingComponent } from '../visualize-campaing/visualize-campaing.component';
import { RegisterCampaingComponent } from '../register-campaing/register-campaing.component';
import { UpdateCampaingComponent } from '../update-campaing/update-campaing.component';

@Component({
  selector: 'app-manage-Campaing',
  templateUrl: 'manage-Campaing.component.html',
  providers: [DialogService],
})
export class ManageCampaingComponent implements OnInit {
  lCampaing: any[] = [];
  constructor(
    public dialogService: DialogService,
    private _confirmationService: ConfirmationService,
    private _alertService: AlertService,
    private _getAllCampaing: GetAllCampaingUseCase,
    private _deleteCampaing: DeleteCampaingUseCase
  ) {}
  ref: DynamicDialogRef;

  ngOnInit() {
    this.getAllCampaing();
  }
  async getAllCampaing() {
    try {
      const response: GetAllCampaingResponse[] =
        await this._getAllCampaing.execute();

      console.log('Campaña RESPUESTA BACKEND', response);
      this.lCampaing = response.reverse();
    } catch (error) {
      console.log(error);
    }
  }

  openRegister() {
    const ref = this.dialogService.open(RegisterCampaingComponent, {
      header: 'Agregar Campaña',
      width: '60rem',
    });

    ref.onClose.subscribe((result) => {
      console.log('SE CERRO');
      this.getAllCampaing();
    });
  }

  openUpdateDialog(id: string) {
    const ref = this.dialogService.open(UpdateCampaingComponent, {
      header: 'Editar Campaña',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      width: '80rem',
      data: {
        id: id,
      },
    });

    ref.onClose.subscribe((result) => {
      console.log('SE CERRO');
      this.getAllCampaing();
    });
  }
  openVisualizeDialog(id: string) {
    const ref = this.dialogService.open(VisualizeCampaingComponent, {
      header: 'Visualizar Campaña',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      width: '80rem',
      data: {
        id: id,
      },
    });

    ref.onClose.subscribe((result) => {
      console.log('SE CERRO');
      this.getAllCampaing();
    });
  }
  deleteCampaing(id: string) {
    try {
      this._confirmationService.confirm({
        message: 'Estás seguro que desea eliminar? ',
        accept: () => {
          this._deleteCampaing.execute(id).then(() => {
            this.getAllCampaing();
            this._alertService.success('Se elimino la Campaña seleccionada');
          });
        },
        reject: () => {},
      });
    } catch (error) {}
  }
}
