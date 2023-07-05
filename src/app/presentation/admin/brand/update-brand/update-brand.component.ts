import { Component, OnInit } from '@angular/core';
import { BrandItemResponse} from 'src/app/core/models/all/response/all-responses.response';
import { AlertService } from 'src/app/shared/services/alert.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { GetBrandByIdUseCase } from 'src/app/core/usecase/brand/get-brand-byid.usecase';
import { PutBrandRequest } from 'src/app/core/models/all/request/all-requests.request';
import { PutBrandUseCase } from 'src/app/core/usecase/brand/put-brand.usecase';
import { alphanumericPlusValidator, allFieldsFilledValidator } from '../../validators/custom-validators';

@Component({
  selector: 'app-update-brand',
  templateUrl: 'update-brand.component.html',
  styleUrls: ['update-brand.component.css'],
})
export class UpdateBrandComponent implements OnInit {
  formBrand: FormGroup;
  selectedFiles: File[]=[];

  constructor(
    private _getBrandById: GetBrandByIdUseCase,
    private _putBrand: PutBrandUseCase,
    private _alertService: AlertService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.createformBrand();
    this.getBrandbyId(this.config.data.id);
  }

  createformBrand() {
    this.formBrand = this._formBuilder.group({
      nombre: new FormControl(
        null,
        [
          Validators.minLength(3),
          Validators.maxLength(10),
          alphanumericPlusValidator()
        ]
      ),
      descripcion:new FormControl(
        null,
        [
          Validators.minLength(10)
        ]
      ),
      icono: [null]
    },{ validators: allFieldsFilledValidator() });
  }

  get nombre() {
     return this.formBrand.get('nombre'); 
  }

  get descripcion() {
     return this.formBrand.get('descripcion'); 
  }

  onSelect(event: any)  {
    if (event.files && event.files.length > 0) {
      this.selectedFiles[0]= event.files[0];
      console.log(this.selectedFiles[0])
    }
  }

  async getBrandbyId(id: string) {
    try {
      const response: BrandItemResponse = await this._getBrandById.execute(id);
      console.log(response);
      this.formBrand.setValue({
        nombre: response.nombre,
        descripcion: response.descripcion,
        icono: response.icono,
      });
    } catch (error) {
      console.error(error);
    }
  }
  async updateBrand(id: string) {
    const form = this.formBrand.value;
    const bodyRequestBrand: PutBrandRequest = {
      id: id,
      nombre: form.nombre,
      descripcion: form.descripcion,
      icono: form.icono,
      imageFiles:this.selectedFiles[0],
    };

    this.formBrand.markAllAsTouched();
    if (this.formBrand.invalid) {
      this._alertService.error('Por favor llene todos los campos correctamente');
      return;
    };

    try {
      if (this.formBrand.invalid) return
      const response: BrandItemResponse = await this._putBrand.execute(
        bodyRequestBrand
      );

      this._alertService.success('Cambios guardados exitosamente');
      console.log(response);
      this.ref.close();
    } catch (error) {
      console.error(error);
    }
  }
}
