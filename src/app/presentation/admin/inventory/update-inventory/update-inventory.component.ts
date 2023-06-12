import { Component, OnInit } from '@angular/core';
import {
  Brand,
  Category,
  Model,
  Status,
  Supplier,
} from 'src/app/core/models/all/response/all-responses.response';
import { GetAllBrandsUseCase } from 'src/app/core/usecase/brand/get-all-brands.usecase';
import { GetAllCategoriesUseCase } from 'src/app/core/usecase/category/get-all-categories.usecase';
import { GetInventoryByIdUseCase } from 'src/app/core/usecase/inventory/get-moto-byid.usecase';
import { PutMotoUseCase } from 'src/app/core/usecase/inventory/put-moto.usecase';
import { GetAllModelsUseCase } from 'src/app/core/usecase/model/get-all-models.usecase';
import { GetAllStatusUseCase } from 'src/app/core/usecase/status/get-all-status.usecase';
import { GetAllSuppliersUseCase } from 'src/app/core/usecase/supplier/get-all-suppliers.usecase';
import { InventoryItemResponse } from 'src/app/core/models/all/response/all-responses.response';
import { PutInventoryRequest } from 'src/app/core/models/all/request/all-requests.request';
import { AlertService } from 'src/app/shared/services/alert.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { hexadecimalColorValidator,alphanumericValidator, allFieldsFilledValidator } from '../../validators/custom-validators';

@Component({
  selector: 'app-update-inventory',
  templateUrl: 'update-inventory.component.html',
  styleUrls: ['update-inventory.component.css'],
})
export class UpdateInventoryComponent implements OnInit {
  formInventory: FormGroup;
  listaCategoriaMotos: Category[] = []
  listaModelo: Model[] = []
  listaMarca: Brand[] = []
  listaProveedor: Supplier[] = []
  listaStatus: Status[] = []
  constructor(
    private _getAllModels: GetAllModelsUseCase,
    private _getAllSuppliers: GetAllSuppliersUseCase,
    private _getAllStatus: GetAllStatusUseCase,
    private _getMotoById: GetInventoryByIdUseCase,
    private _putMoto: PutMotoUseCase,
    private _alertService: AlertService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.createformInventory();
    this.getAllModels();
    this.getAllSuppliers();
    this.getAllStatus();
    this.getMotobyId(this.config.data.id)
  }

  createformInventory() {
    this.formInventory = this._formBuilder.group({
      codigoVin: new FormControl(null, [
        Validators.minLength(3),
        Validators.maxLength(17),
        alphanumericValidator()
      ]),
      codigoColor: new FormControl(null, [
        hexadecimalColorValidator()
      ]),
      modelo: [null],
      proveedor: [null],
      estado: [null],
    }, { validators: allFieldsFilledValidator() })
  }

  get codigoVin() {
     return this.formInventory.get('codigoVin'); 
  }

  get codigoColor() {
     return this.formInventory.get('codigoColor'); 
  }

  async getMotobyId(id: string) {
    try {
      const response: InventoryItemResponse = await this._getMotoById.execute(id);
      console.log(response);
      this.formInventory.setValue({
        codigoVin: response.codigo_vin,
        codigoColor: response.color,
        modelo: response.modelo._id,
        proveedor: response.proveedor._id,
        estado: response.estado._id
      })
    } catch (error) {
      console.error(error);
    }
  }

  async getAllModels() {
    try {
      const response: Model[] = await this._getAllModels.execute();
      this.listaModelo = response;
    } catch (error) {
      console.error(error);
    }
  }

  async getAllSuppliers() {
    try {
      const response: Supplier[] = await this._getAllSuppliers.execute();
      this.listaProveedor = response;
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  async getAllStatus() {
    try {
      const response: Status[] = await this._getAllStatus.execute();
      this.listaStatus = response;
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  async updateMoto(id: string) {
    const form = this.formInventory.value
    const bodyRequestMotos: PutInventoryRequest = {
      id:id,
      codigo_vin: form.codigoVin,
      color: form.codigoColor,
      modelo: form.model,
      proveedor: form.proveedor,
      estado: form.estado,
    };
    this.formInventory.markAllAsTouched();
    if (this.formInventory.invalid) {
      this._alertService.error('Por favor llene todos los campos correctamente');
      return;
    };
    try {
      if (!this.formInventory.valid) return;
      const response: InventoryItemResponse = await this._putMoto.execute(bodyRequestMotos);

      this._alertService.success('Cambios Guardados')
      console.log(response);
      this.ref.close();
    } catch (error) {
      console.error(error);
    }
  }
}
