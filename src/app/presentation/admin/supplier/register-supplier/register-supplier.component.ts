import { Component, OnInit } from '@angular/core';
import { GetAllSupplierResponse } from 'src/app/core/models/all/response/all-responses.response';
import { PostSupplierRequest } from 'src/app/core/models/all/request/all-requests.request';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PostSupplierUseCase } from 'src/app/core/usecase/supplier/post-supplier.usecase';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register-inventory',
  templateUrl: 'register-supplier.component.html',

})
export class RegisterSupplierComponent implements OnInit {
  formSupplier:FormGroup;
  constructor(
    private _postSupplier: PostSupplierUseCase,
    public _dialogref: DynamicDialogRef,
    private _formBuilder:FormBuilder
  ) {}

  ngOnInit() {
    this.createformSupplier();
  }

  nombre: string | null = null;
  telefono: string | null = null;
  correo: string | null = null;
  direccion: string | null = null;
  
  
  createformSupplier(){
    this.formSupplier = this._formBuilder.group({
      nombre:[null],
      telefono:[null],
      correo: [null],
      direccion:[null]
    })
  }

  async addSupplier() {
    const form=this.formSupplier.value
    const bodyRequestSupplier: PostSupplierRequest ={
      nombre: form.nombre,
      telefono: form.telefono,
      correo: form.correo,
      direccion: form.direccion
    };
    try {
      const response: GetAllSupplierResponse = await this._postSupplier.execute(
        bodyRequestSupplier
      );
      console.log(response);
      this.close();
    } catch (error) {
      console.error(error);
    }
  }
  close(){
    this._dialogref.close()
  }
}
