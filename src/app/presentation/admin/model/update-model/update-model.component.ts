import { Component, OnInit } from '@angular/core';
import {  Brand, Category, Model } from 'src/app/core/models/all/response/all-responses.response';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { PutModelRequest } from 'src/app/core/models/all/request/all-requests.request';
import { PutModelUseCase } from 'src/app/core/usecase/model/put-model.usecase';
import { GetModelByIdUseCase } from 'src/app/core/usecase/model/get-model-byid.usecase';
import { GetAllCategoriesUseCase } from 'src/app/core/usecase/category/get-all-categories.usecase';
import { GetAllBrandsUseCase } from 'src/app/core/usecase/brand/get-all-brands.usecase';
import { alphanumericPlusValidator, numericValidator, numericPlusValidator, allFieldsFilledValidator } from '../../validators/custom-validators';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-update-model',
  templateUrl: 'update-model.component.html',
  styleUrls: ['update-model.component.css'],
})
export class UpdateModelComponent implements OnInit {
  formModelo: FormGroup;
  selectedFiles: File[]=[];
  listaCategoria: Category[] = [];
  listaMarca: Brand[] = [];

  constructor(
    private _getModeloById: GetModelByIdUseCase,
    private _getAllCategories: GetAllCategoriesUseCase,
    private _getAllBrands: GetAllBrandsUseCase,
    private _putModelo: PutModelUseCase,
    private _alertService: AlertService,
    public _dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.createformModelo();
    this.getAllCategories();
    this.getAllBrands();
    this.getModelobyId(this.config.data.id);
  }

  createformModelo() {
    this.formModelo = this._formBuilder.group({
      nombre: [
        null,
        [
          Validators.minLength(4),
          Validators.maxLength(25),
          alphanumericPlusValidator()
        ],
      ],
      categoria: [null],
      marca: [null],
      cilindrada: [
        null,
        [
          alphanumericPlusValidator()
        ],
      ],
      velocidades: [
        null,
        [
          numericValidator()
        ],
      ],
      capacidad_tanque: [
        null,
        [
          numericPlusValidator()
        ],
      ],
      torque: [
        null,
        [
          alphanumericPlusValidator()
        ],
      ],
      motor: [
        null,
        [
          alphanumericPlusValidator()
        ],
      ],
      potencia: [
        null,
        [
          alphanumericPlusValidator()
        ],
      ],
      precio: [
        null,
        [
          numericPlusValidator()
        ],
      ],
      descripcion: [
        null,
        [
          Validators.minLength(10),
          alphanumericPlusValidator()
        ]
      ],
      anio: [
        null,
        [ 
          Validators.max(2023),
          Validators.minLength(4),
          Validators.maxLength(4),
          numericValidator()
        ],
      ],
      fotos: [null],
    },{ validators: allFieldsFilledValidator() });
  }

  onSelect(event: any)  {
    if (event.files && event.files.length > 0) {
      this.selectedFiles[0]= event.files[0];
    }
  }

  async getModelobyId(id: string) {
    try {
      const response: Model = await this._getModeloById.execute(id);
      console.log(response);
      this.formModelo.setValue({
        nombre: response.nombre,
        categoria: response.categoria._id,
        marca: response.marca._id,
        cilindrada: response.cilindrada,
        velocidades: response.velocidades,
        capacidad_tanque: response.capacidad_tanque,
        torque: response.torque,
        motor: response.motor,
        potencia: response.potencia,
        precio: response.precio,
        descripcion: response.descripcion,
        anio: response.anio,
        fotos:response.fotos,
      });
    } catch (error) {
      console.error(error);
    }
  }
  async getAllCategories() {
    try {
      const response: Category[] = await this._getAllCategories.execute();
      this.listaCategoria = response;
    } catch (error) {
      console.error(error);
    }
  }

  async getAllBrands() {
    try {
      const response: Brand[] = await this._getAllBrands.execute();
      this.listaMarca = response;
    } catch (error) {
      console.error(error);
    }
  }
  async updateModelo(id: string) {
    const form = this.formModelo.value;
    const bodyRequestModelo: PutModelRequest = {
      id: id,
      nombre: form.nombre,
      categoria: form.categoria,
      marca: form.marca,
      cilindrada: form.cilindrada,
      velocidades: form.velocidades,
      capacidad_tanque: form.capacidad_tanque,
      torque: form.torque,
      motor: form.motor,
      potencia: form.potencia,
      precio: form.precio,
      descripcion: form.descripcion,
      foto: form.foto,
      anio:form.anio,
      imageFiles:this.selectedFiles[0]
    };
    this.formModelo.markAllAsTouched();
    if (this.formModelo.invalid) {
      this._alertService.error('Por favor llene todos los campos correctamente');
      return;
    };
    try {
      if (this.formModelo.invalid) return;
    console.log(bodyRequestModelo);
      const response: Model = await this._putModelo.execute( 
        bodyRequestModelo
      );

      this._alertService.success('Cambios Guardados');
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
