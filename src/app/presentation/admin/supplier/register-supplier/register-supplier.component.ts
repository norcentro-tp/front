import { Component, OnInit } from '@angular/core';
import {
  GetAllSupplierResponse,
  PostSupplierRequest,
} from 'src/app/core/models/inventory/response/get-all-inventory.response';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PostSupplierUseCase } from 'src/app/core/usecase/supplier/post-supplier.usecase';

@Component({
  selector: 'app-register-inventory',
  templateUrl: 'register-supplier.component.html',
  providers: [DynamicDialogRef],
})
export class RegisterSupplierComponent implements OnInit {
  constructor(
    private _postSupplier: PostSupplierUseCase,
    public ref: DynamicDialogRef
  ) {}

  ngOnInit() {}

  nombre: string | null = null;
  telefono: string | null = null;
  email: string | null = null;
  direccion: string | null = null;
  bodyRequestSupplier: PostSupplierRequest;

  async addSupplier() {
    this.bodyRequestSupplier = {
      nombre: this.nombre,
      telefono: this.telefono,
      correo: this.email,
      direccion: this.direccion,
    };
    try {
      const response: GetAllSupplierResponse = await this._postSupplier.execute(
        this.bodyRequestSupplier
      );
      console.log(response);
      this.ref.close();
    } catch (error) {
      console.error(error);
    }
  }
}
