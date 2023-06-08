import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Model } from 'src/app/core/models/all/response/all-responses.response';
import { ConfirmationService } from 'primeng/api';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GetAllModelsUseCase } from 'src/app/core/usecase/model/get-all-models.usecase';
import { UpdateCatalogueUseCase } from 'src/app/core/usecase/model/put-catalogue.usecase';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-catalogue',
  templateUrl: 'manage-catalogue.component.html',
  providers: [DialogService],
})
export class ManageCatalogueComponent implements OnInit {
  lCatalogue: any[] = [];
  checked: boolean;

  constructor(
    public dialogService: DialogService,
    private _confirmationService: ConfirmationService,
    private _alertService: AlertService,
    private _getAllCatalogue: GetAllModelsUseCase,
    private _updateCatalogue: UpdateCatalogueUseCase,
  ) {}
  ngOnInit() {
    this.getAllCatalogue();
  }

  async getAllCatalogue() {
    try {
      const response: Model[] = await this._getAllCatalogue.execute();

      console.log('CATALOGUE RESPUESTA BACKEND', response);
      this.lCatalogue = response.reverse();
    } catch (error) {
      console.log(error);
    }
  }

  updateCatalogue(id: string) {
    try {
      this._confirmationService.confirm({
        message: 'Esta seguro que desea cambiar el estado de modelo en la vista catalogo? ',
        accept: () => {
          this._updateCatalogue.execute(id).then(() => {
            this.getAllCatalogue();
            this._alertService.success('Se actualizo el estado del modelo');
          });
        },
        reject: () => {},
      });
    } catch (error) {}
  }
}
