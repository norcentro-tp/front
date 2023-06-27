import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GetAllSaleResponse } from 'src/app/core/models/all/response/all-responses.response';
import { ConfirmationService } from 'primeng/api';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GetAllSaleUseCase } from 'src/app/core/usecase/sale/get-all-sale.usecase';
import { RegisterSaleComponent } from '../register-sale/register-sale.component';
import { DeleteSaleUseCase } from 'src/app/core/usecase/sale/delete-sale.usecase';
import { UpdateSaleComponent } from '../update-sale/update-sale.component';
import { VisualizeSaleComponent } from '../visualize-sale/visualize-sale.component';

@Component({
  selector: 'app-manage-Sale',
  templateUrl: 'manage-Sale.component.html',
  providers: [DialogService],
})
export class ManageSaleComponent implements OnInit {
  lSale: any[] = [];
  constructor(
    public dialogService: DialogService,
    private _confirmationService: ConfirmationService,
    private _alertService: AlertService,
    private _getAllSale: GetAllSaleUseCase,
    private _deleteSale: DeleteSaleUseCase
  ) {}
  ref: DynamicDialogRef;

  ngOnInit() {
    this.getAllSale();
  }
  async getAllSale() {
    try {
      const response: GetAllSaleResponse[] =
        await this._getAllSale.execute();

      console.log('Venta RESPUESTA BACKEND', response);
      this.lSale = response.reverse();
    } catch (error) {
      console.log(error);
    }
  }

  openRegister() {
    const ref = this.dialogService.open(RegisterSaleComponent, {
      header: 'Agregar Venta',
      width: '60rem',
    });

    ref.onClose.subscribe((result) => {
      console.log('SE CERRO');
      this.getAllSale();
    });
  }

  openUpdateDialog(id: string) {
    const ref = this.dialogService.open(UpdateSaleComponent, {
      header: 'Editar Venta',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      width: '80rem',
      data: {
        id: id,
      },
    });

    ref.onClose.subscribe((result) => {
      console.log('SE CERRO');
      this.getAllSale();
    });
  }
  openVisualizeDialog(id: string) {
    const ref = this.dialogService.open(VisualizeSaleComponent, {
      header: 'Visualizar Venta',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      width: '80rem',
      data: {
        id: id,
      },
    });

    ref.onClose.subscribe((result) => {
      console.log('SE CERRO');
      this.getAllSale();
    });
  }
  deleteSale(id: string) {
    try {
      this._confirmationService.confirm({
        message: 'Estás seguro que desea eliminar? ',
        accept: () => {
          this._deleteSale.execute(id).then(() => {
            this.getAllSale();
            this._alertService.success('Se elimino la Oferta seleccionada');
          });
        },
        reject: () => {},
      });
    } catch (error) {}
  }
}
