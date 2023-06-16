import { Component, OnInit } from '@angular/core';
import {
  Model,
  Category,
  Brand,
} from 'src/app/core/models/all/response/all-responses.response';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PostModelRequest } from 'src/app/core/models/all/request/all-requests.request';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { PostModelUseCase } from 'src/app/core/usecase/model/post-model.usecase';
import { GetAllBrandsUseCase } from 'src/app/core/usecase/brand/get-all-brands.usecase';
import { GetAllCategoriesUseCase } from 'src/app/core/usecase/category/get-all-categories.usecase';
import { alphanumericPlusValidator, numericValidator, numericPlusValidator, allFieldsFilledValidator } from '../../validators/custom-validators';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-register-model',
  templateUrl: 'register-model.component.html',
})
export class RegisterModelComponent implements OnInit {
  formModelo: FormGroup;
  selectedFiles: File[] = [];
  listaCategoria: Category[] = [];
  listaMarca: Brand[] = [];
  fileSelected: Boolean = false;


  constructor(
    private _postModelo: PostModelUseCase,
    public _dialogref: DynamicDialogRef,
    private _formBuilder: FormBuilder,
    private _getAllBrands: GetAllBrandsUseCase,
    private _getAllCategories: GetAllCategoriesUseCase,
    private _alertService: AlertService
  ) {}

  ngOnInit() {
    this.getAllCategories();
    this.getAllBrands();
    this.createformModelo();
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
      ]
    },{ validators: allFieldsFilledValidator() });
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
  onSelect(event: any) {
    if (event.files && event.files.length > 0) {
      this.selectedFiles[0] = event.files[0];
      this.fileSelected = true;
    }
  }

  async addModelo() {
    const form = this.formModelo.value;
    const bodyRequestModelo: PostModelRequest = {
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
      anio: form.anio,
      imageFiles: this.selectedFiles[0],
    };
    this.formModelo.markAllAsTouched();
    if (this.formModelo.invalid && this.fileSelected) {
      this._alertService.error('Por favor llene todos los campos correctamente');
      return;
    };
    try {
      if (this.formModelo.invalid && this.fileSelected) return;
      const response: Model = await this._postModelo.execute(bodyRequestModelo);
      

      this._alertService.success('Se realizo el registro con exito');
      console.log(response);
      this.close();
    } catch (error) {
      console.error(error);
    }
  }
  close() {
    this._dialogref.close();
  }
}
