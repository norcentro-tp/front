import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Brand } from 'src/app/core/models/all/response/all-responses.response';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PostBrandRequest } from 'src/app/core/models/all/request/all-requests.request';
import { PostBrandUseCase } from 'src/app/core/usecase/brand/post-brand.usecase';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-register-brand',
  templateUrl: 'register-brand.component.html',
})
export class RegisterBrandComponent implements OnInit {
  formBrand: FormGroup;
  selectedFiles: File[] = [];

  constructor(
    private _postBrand: PostBrandUseCase,
    public _dialogref: DynamicDialogRef,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.createformBrand();
  }
  nombre: string | null = null;
  descripcion: string | null = null;

  createformBrand() {
    this.formBrand = this._formBuilder.group({
      nombre: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
      ],
      descripcion: [null, [Validators.required, Validators.minLength(10)]],
    });
  }
  onSelect(event: any) {
    if (event.files && event.files.length > 0) {
      this.selectedFiles[0] = event.files[0];
      console.log(this.selectedFiles[0]);
    }
  }

  async addBrand() {
    const form = this.formBrand.value;
    const bodyRequestBrand: PostBrandRequest = {
      nombre: form.nombre,
      descripcion: form.descripcion,
      imageFiles: this.selectedFiles[0],
    };
    console.log(bodyRequestBrand);
    console.log(this.formBrand);

    this.formBrand.get('nombre').markAsDirty();
    this.formBrand.get('descripcion').markAsDirty();
    try {
      if (!this.formBrand.valid) return;
      const response: Brand = await this._postBrand.execute(bodyRequestBrand);
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
