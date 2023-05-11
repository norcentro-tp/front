import { Component, OnInit } from '@angular/core';
import {
  Brand,
  BrandItemResponse,
} from 'src/app/core/models/inventory/response/get-all-inventory.response';
import { AlertService } from 'src/app/shared/services/alert.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GetBrandByIdUseCase } from 'src/app/core/usecase/brand/get-brand-byid.usecase';
import { GetAllBrandsUseCase } from 'src/app/core/usecase/brand/get-all-brands.usecase';
import { PutBrandRequest } from 'src/app/core/models/inventory/request/post-moto.request';
import { PutBrandUseCase } from 'src/app/core/usecase/brand/put-brand.usecase';

@Component({
  selector: 'app-update-brand',
  templateUrl: 'update-brand.component.html',
  styleUrls: ['update-brand.component.css'],
})
export class UpdateBrandComponent implements OnInit {
  formBrand: FormGroup;
  listaBrand: Brand[] = [];

  constructor(
    private _getAllBrand: GetAllBrandsUseCase,
    private _getBrandById: GetBrandByIdUseCase,
    private _putBrand: PutBrandUseCase,
    private _alertService: AlertService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.createformBrand();
    this.getAllBrand();
    this.getBrandbyId(this.config.data.id);
  }

  createformBrand() {
    this.formBrand = this._formBuilder.group({
      nombre: [null],
    });
  }

  async getBrandbyId(id: string) {
    try {
      const response: BrandItemResponse = await this._getBrandById.execute(id);
      console.log(response);
      this.formBrand.setValue({
        nombre: response.nombre,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async getAllBrand() {
    try {
      const response: Brand[] = await this._getAllBrand.execute();
      this.listaBrand = response;
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  async updateBrand(id: string) {
    const form = this.formBrand.value;
    const bodyRequestBrand: PutBrandRequest = {
      id: id,
      nombre: form.nombre,
    };
    try {
      const response: BrandItemResponse = await this._putBrand.execute(
        bodyRequestBrand
      );

      this._alertService.success('Cambios Guardados');
      console.log(response);
      this.ref.close();
    } catch (error) {
      console.error(error);
    }
  }
}
