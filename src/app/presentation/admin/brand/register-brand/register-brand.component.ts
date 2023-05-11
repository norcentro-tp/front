import { Component, OnInit } from '@angular/core';
import {
  Brand
} from 'src/app/core/models/inventory/response/get-all-inventory.response';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PostBrandRequest } from 'src/app/core/models/inventory/request/post-moto.request';
import { PostBrandUseCase } from 'src/app/core/usecase/brand/post-brand.usecase';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-register-brand',
  templateUrl: 'register-brand.component.html',
  
  providers: [DynamicDialogRef],
})
export class RegisterBrandComponent implements OnInit {
  formBrand:FormGroup;

  constructor(
    private _postBrand: PostBrandUseCase,
    public _dialogref: DynamicDialogRef,
    private _formBuilder:FormBuilder
  ) {}

  ngOnInit() {
    this.createformBrand();
  }
  nombre: string | null = null;

  createformBrand(){
    this.formBrand = this._formBuilder.group({
      nombre:[null]
    })
  }

  async addBrand() {
    const form=this.formBrand.value
    const bodyRequestBrand: PostBrandRequest ={
      nombre: form.nombre
    };
    try {
      const response: Brand = await this._postBrand.execute(
        bodyRequestBrand
      );
      console.log(response);
      this.close()
    } catch (error) {
      console.error(error);
    }
  }
  close(){
    this._dialogref.close()
  }
}
