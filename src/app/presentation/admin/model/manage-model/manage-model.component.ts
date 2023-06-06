import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Model } from 'src/app/core/models/all/response/all-responses.response';
import { ConfirmationService } from 'primeng/api';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GetAllModelsUseCase } from 'src/app/core/usecase/model/get-all-models.usecase';
import { DeleteModelUseCase } from 'src/app/core/usecase/model/delete-model.usecase';
import { UpdateModelComponent } from '../update-model/update-model.component';
import { RegisterModelComponent } from '../register-model/register-model.component';
import { VisualizeModelComponent } from '../visualize-model/visualize-model.component';

@Component({
  selector: 'app-manage-modelo',
  templateUrl: 'manage-model.component.html',
  providers: [DialogService],
})
export class ManageModeloComponent implements OnInit {
  lModelo: any[] = [];

  constructor(
    public dialogService: DialogService,
    private _confirmationService: ConfirmationService,
    private _alertService: AlertService,
    private _getAllModels: GetAllModelsUseCase,
    private _deleteModel: DeleteModelUseCase
  ) {}
  ngOnInit() {
    this.getAllModels();
  }

  async getAllModels() {
    try {
      const response: Model[] = await this._getAllModels.execute();

      console.log('MODELO RESPUESTA BACKEND', response);
      this.lModelo = response.reverse();
    } catch (error) {
      console.log(error);
    }
  }
  openRegisterDialog() {
    const ref = this.dialogService.open(RegisterModelComponent, {
      header: 'Agregar Categoria',
      width: '60rem',
    });

    ref.onClose.subscribe((result) => {
      console.log('SE CERRO');
      this.getAllModels();
    });
  }
  openUpdateDialog(id: string) {
    const ref = this.dialogService.open(UpdateModelComponent, {
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
    const ref = this.dialogService.open(VisualizeModelComponent, {
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
          this._deleteModel.execute(id).then(() => {
            this.getAllModels();
            this._alertService.success('Se elimino la marca seleccionada');
          });
        },
        reject: () => {},
      });
    } catch (error) {}
  }
}
