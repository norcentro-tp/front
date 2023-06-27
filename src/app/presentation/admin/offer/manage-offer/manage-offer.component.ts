import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GetAllOfferResponse } from 'src/app/core/models/all/response/all-responses.response';
import { ConfirmationService } from 'primeng/api';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GetAllOfferUseCase } from 'src/app/core/usecase/offer/get-all-offer.usecase';
import { RegisterOfferComponent } from '../register-offer/register-offer.component';
import { DeleteOfferUseCase } from 'src/app/core/usecase/offer/delete-offer.usecase';
import { UpdateOfferComponent } from '../update-offer/update-offer.component';
import { VisualizeOfferComponent } from '../visualize-offer/visualize-offer.component';

@Component({
  selector: 'app-manage-offer',
  templateUrl: 'manage-offer.component.html',
  providers: [DialogService],
})
export class ManageOfferComponent implements OnInit {
  lOffer: any[] = [];
  constructor(
    public dialogService: DialogService,
    private _confirmationService: ConfirmationService,
    private _alertService: AlertService,
    private _getAllOffer: GetAllOfferUseCase,
    private _deleteOffer: DeleteOfferUseCase
  ) {}
  ref: DynamicDialogRef;

  ngOnInit() {
    this.getAllOffer();
  }
  async getAllOffer() {
    try {
      const response: GetAllOfferResponse[] =
        await this._getAllOffer.execute();

      console.log('Oferta RESPUESTA BACKEND', response);
      this.lOffer = response.reverse();
    } catch (error) {
      console.log(error);
    }
  }

  openRegister() {
    const ref = this.dialogService.open(RegisterOfferComponent, {
      header: 'Agregar Oferta',
      width: '60rem',
    });

    ref.onClose.subscribe((result) => {
      console.log('SE CERRO');
      this.getAllOffer();
    });
  }

  openUpdateDialog(id: string) {
    const ref = this.dialogService.open(UpdateOfferComponent, {
      header: 'Editar Oferta',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      width: '80rem',
      data: {
        id: id,
      },
    });

    ref.onClose.subscribe((result) => {
      console.log('SE CERRO');
      this.getAllOffer();
    });
  }
  openVisualizeDialog(id: string) {
    const ref = this.dialogService.open(VisualizeOfferComponent, {
      header: 'Visualizar Oferta',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      width: '80rem',
      data: {
        id: id,
      },
    });

    ref.onClose.subscribe((result) => {
      console.log('SE CERRO');
      this.getAllOffer();
    });
  }
  deleteOffer(id: string) {
    try {
      this._confirmationService.confirm({
        message: 'Estás seguro que desea eliminar? ',
        accept: () => {
          this._deleteOffer.execute(id).then(() => {
            this.getAllOffer();
            this._alertService.success('Se elimino la Oferta seleccionada');
          });
        },
        reject: () => {},
      });
    } catch (error) {}
  }
}
