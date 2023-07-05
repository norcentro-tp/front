import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GetAllClientResponse } from 'src/app/core/models/all/response/all-responses.response';
import { ConfirmationService } from 'primeng/api';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GetAllClientUseCase } from 'src/app/core/usecase/client/get-all-client.usecase';
import { RegisterClientComponent } from '../register-client/register-client.component';
import { DeleteClientUseCase } from 'src/app/core/usecase/client/delete-client.usecase';
import { UpdateClientComponent } from '../update-client/update-client.component';
import { VisualizeClientComponent } from '../visualize-client/visualize-client.component';

@Component({
  selector: 'app-manage-client',
  templateUrl: 'manage-client.component.html',
  providers: [DialogService],
})
export class ManageClientComponent implements OnInit {
  lClient: any[] = [];
  constructor(
    public dialogService: DialogService,
    private _confirmationService: ConfirmationService,
    private _alertService: AlertService,
    private _getAllClient: GetAllClientUseCase,
    private _deleteClient: DeleteClientUseCase
  ) {}
  ref: DynamicDialogRef;

  ngOnInit() {
    this.getAllClient();
  }
  async getAllClient() {
    try {
      const response: GetAllClientResponse[] =
        await this._getAllClient.execute();

      console.log('Cliente RESPUESTA BACKEND', response);
      this.lClient = response.reverse();
    } catch (error) {
      console.log(error);
    }
  }

  openRegister() {
    const ref = this.dialogService.open(RegisterClientComponent, {
      header: 'Agregar Cliente',
      width: '60rem',
    });

    ref.onClose.subscribe((result) => {
      console.log('SE CERRO');
      this.getAllClient();
    });
  }

  openUpdateDialog(id: string) {
    const ref = this.dialogService.open(UpdateClientComponent, {
      header: 'Editar Cliente',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      width: '80rem',
      data: {
        id: id,
      },
    });

    ref.onClose.subscribe((result) => {
      console.log('SE CERRO');
      this.getAllClient();
    });
  }
  openVisualizeDialog(id: string) {
    const ref = this.dialogService.open(VisualizeClientComponent, {
      header: 'Visualizar Client',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      width: '80rem',
      data: {
        id: id,
      },
    });

    ref.onClose.subscribe((result) => {
      console.log('SE CERRO');
      this.getAllClient();
    });
  }
  deleteClient(id: string) {
    try {
      this._confirmationService.confirm({
        message: 'Estás seguro que desea eliminar? ',
        accept: () => {
          this._deleteClient.execute(id).then(() => {
            this.getAllClient();
            this._alertService.success('Se elimino el cliente seleccionado');
          });
        },
        reject: () => {},
      });
    } catch (error) {}
  }
}
