import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Model } from 'src/app/core/models/all/response/all-responses.response';
import { ConfirmationService } from 'primeng/api';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GetAllModelsUseCase } from 'src/app/core/usecase/model/get-all-models.usecase';
import { DeleteModelUseCase } from 'src/app/core/usecase/model/delete-model.usecase';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-catalogue',
  templateUrl: 'manage-catalogue.component.html',
  providers: [DialogService],
})
export class ManageCatalogueComponent implements OnInit {
  lCatalogue: any[] = [];
  formCatalogue: FormGroup;

  constructor(
    public dialogService: DialogService,
    private _confirmationService: ConfirmationService,
    private _alertService: AlertService,
    private _getAllCatalogue: GetAllModelsUseCase,
    private _deleteModel: DeleteModelUseCase,
    private _formBuilder: FormBuilder
  ) {}
  ngOnInit() {
    this.getAllCatalogue();
    this.createFormCatalogue()
  }

  createFormCatalogue() {
    this.formCatalogue = this._formBuilder.group({
      city: [null]
    });
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

  deleteCatalogue(id: string) {
    try {
      this._confirmationService.confirm({
        message: 'Estás seguro que desea eliminar? ',
        accept: () => {
          this._deleteModel.execute(id).then(() => {
            this.getAllCatalogue();
            this._alertService.success('Se elimino la marca seleccionada');
          });
        },
        reject: () => {},
      });
    } catch (error) {}
  }
}
