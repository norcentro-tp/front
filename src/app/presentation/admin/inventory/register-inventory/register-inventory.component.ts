import { Component, OnInit } from '@angular/core';
import {
  Brand,
  Category,
  Model,
  Status,
  Supplier,
} from 'src/app/core/models/all/response/all-responses.response';
import { PostMotoUseCase } from 'src/app/core/usecase/inventory/post-moto.usecase';
import { GetAllStatusUseCase } from 'src/app/core/usecase/status/get-all-status.usecase';
import { GetAllSuppliersUseCase } from 'src/app/core/usecase/supplier/get-all-suppliers.usecase';
import { GetAllInventoryResponse } from 'src/app/core/models/all/response/all-responses.response';
import { PostInventoryRequest } from 'src/app/core/models/all/request/all-requests.request';
import { AlertService } from 'src/app/shared/services/alert.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { GetAllModelsUseCase } from 'src/app/core/usecase/model/get-all-models.usecase';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { hexadecimalColorValidator,alphanumericValidator, allFieldsFilledValidator } from '../../validators/custom-validators';

@Component({
  selector: 'app-register-inventory',
  templateUrl: 'register-inventory.component.html',
  styleUrls: ['register-inventory.component.css'],
})
export class RegisterInventoryComponent implements OnInit {
  formInventory: FormGroup;
  listaCategoriaMotos: Category[] = [];
  listaModelo: Model[] = [];
  listaMarca: Brand[] = [];
  listaProveedor: Supplier[] = [];
  listaStatus: Status[] = [];

  constructor(
    private _getAllModels: GetAllModelsUseCase,
    private _getAllSuppliers: GetAllSuppliersUseCase,
    private _getAllStatus: GetAllStatusUseCase,
    private _postMoto: PostMotoUseCase,
    private _dialogRef: DynamicDialogRef,
    private _alertService: AlertService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.createformInventory();
    this.getAllModels();
    this.getAllSuppliers();
    this.getAllStatus();
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
    }, { validators: allFieldsFilledValidator() });
  }

  get codigoVin() {
     return this.formInventory.get('codigoVin'); 
  }

  get codigoColor() {
     return this.formInventory.get('codigoColor'); 
  }

  async getAllModels() {
    try {
      const response: Model[] = await this._getAllModels.execute();
      this.listaModelo = response;
      this.formInventory.get('modelo').setValue(null); 
    } catch (error) {
      console.error(error);
    }
  }

  async getAllSuppliers() {
    try {
      const response: Supplier[] = await this._getAllSuppliers.execute();
      this.listaProveedor = response;
      this.formInventory.get('proveedor').setValue(null); 
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  async getAllStatus() {
    try {
      const response: Status[] = await this._getAllStatus.execute();
      this.listaStatus = response;
      this.formInventory.get('estado').setValue(null); 
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  async addMoto() {
    const form = this.formInventory.value;
    const bodyRequestMotos: PostInventoryRequest = {
      codigo_vin: form.codigoVin,
      color: form.codigoColor,
      modelo: form.modelo,
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
      const response: GetAllInventoryResponse = await this._postMoto.execute(
        bodyRequestMotos
      );

      this._alertService.success('Se realizo el registro');
      console.log(response);
      this.close();
    } catch (error) {
      console.error(error);
    }
  }

  close() {
    this._dialogRef.close();
  }
}

