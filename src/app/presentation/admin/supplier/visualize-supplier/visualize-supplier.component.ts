import { Component, OnInit } from '@angular/core';
import { SupplierItemResponse } from 'src/app/core/models/all/response/all-responses.response';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  FormBuilder,
  FormGroup,
  FormControl
} from '@angular/forms';
import { GetSupplierByIdUseCase } from 'src/app/core/usecase/supplier/get-supplier-byid.usecase';

@Component({
  selector: 'app-visualize-supplier',
  templateUrl: 'visualize-supplier.component.html',
  styleUrls: ['visualize-supplier.component.css'],
})
export class VisualizeSupplierComponent implements OnInit {
  formSupplier: FormGroup;
  constructor(
    private _getSupplierById: GetSupplierByIdUseCase,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.createformSupplier();
    this.getSupplierbyId(this.config.data.id);
  }

  createformSupplier() {
    this.formSupplier = this._formBuilder.group({
      nombre: new FormControl( {value: null, disabled: true} ),
      telefono: new FormControl( {value: null, disabled: true} ),
      correo: new FormControl( {value: null, disabled: true} ),
      direccion: new FormControl( {value: null, disabled: true} ),
    });
  }

  async getSupplierbyId(id: string) {
    try {
      const response: SupplierItemResponse =
        await this._getSupplierById.execute(id);
      console.log(response);
      this.formSupplier.setValue({
        nombre: response.nombre,
        telefono: response.telefono,
        correo: response.correo,
        direccion: response.direccion,
      });
    } catch (error) {
      console.error(error);
    }
  }
  async close() {
    this.ref.close();
  }
}
