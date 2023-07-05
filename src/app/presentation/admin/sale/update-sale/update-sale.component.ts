import { Component, OnInit } from '@angular/core';
import {
  Sale,
  GetAllSaleResponse,
} from 'src/app/core/models/all/response/all-responses.response';
import { PutSaleRequest } from 'src/app/core/models/all/request/all-requests.request';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { PutSaleUseCase } from 'src/app/core/usecase/sale/put-sale.usecase';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { emailValidator, passwordValidator, numericValidator, alphabeticValidator, alphanumericValidator, numericPlusValidator, allFieldsFilledValidator } from '../../validators/custom-validators';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GetSaleByIdUseCase } from 'src/app/core/usecase/sale/get-offer-byid.usecase';

@Component({
  selector: 'app-update-sale',
  templateUrl: 'update-sale.component.html',
  styleUrls: ['update-sale.component.css'],
})
export class UpdateSaleComponent implements OnInit {
  formVenta: FormGroup;
  selectedFiles: File[] = [];

  constructor(
    private _getSaleById: GetSaleByIdUseCase,
    private _putSale: PutSaleUseCase,
    private _alertService: AlertService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.createformSale();
    this.getSalebyId(this.config.data.id);
  }

  createformSale() {
    this.formVenta = this._formBuilder.group({
      moto: [null],
      cliente: [null],
      monto: [
        null,
        [
          numericPlusValidator()
        ],
      ],
      metodo_pago: [null],
      fecha_venta: [null],
      fecha_entrega: [null],
    },{ validators: allFieldsFilledValidator() });
  }

  
  onSelect(event: any) {
    if (event.files && event.files.length > 0) {
      this.selectedFiles[0] = event.files[0];
    }
  }

  async getSalebyId(id: string) {
    try {
      const response: GetAllSaleResponse =
        await this._getSaleById.execute(id);
      console.log(response);
      this.formVenta.setValue({
        cliente: response.cliente,
        moto: response.moto,
        fecha_venta: response.fecha_venta,
        fecha_entrega: response.fecha_entrega,
        metodo_pago: response.metodo_pago,
        monto: response.monto,
      });
    } catch (error) {
      console.error(error);
    }
  }
  async updateSale(id: string) {
    const form = this.formVenta.value;
    const bodyRequestSale: PutSaleRequest = {
      monto:form.monto,
      fecha_entrega: form.fecha_entrega,
      metodo_pago: form.metodo_pago,
      moto: form.moto,
      cliente:form.cliente,
      imageFiles: this.selectedFiles[0],
    };

    this.formVenta.markAllAsTouched();
    if (this.formVenta.invalid) {
      this._alertService.error('Por favor llene todos los campos correctamente');
      return;
    };
    try {
      if (this.formVenta.invalid) return;
      console.log(this.formVenta.value)
      const response: Sale = await this._putSale.execute( 
        bodyRequestSale
      );
      this._alertService.success('Cambios Guardados');
      console.log(response);
      this.ref.close();
    } catch (error) {
      console.error(error);
    }
  }
}

