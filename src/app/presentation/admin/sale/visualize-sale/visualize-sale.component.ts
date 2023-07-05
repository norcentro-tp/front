import { Component, OnInit } from '@angular/core';
import { Sale} from 'src/app/core/models/all/response/all-responses.response';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  FormBuilder,
  FormGroup,
  FormControl
} from '@angular/forms';
import { GetSaleByIdUseCase } from 'src/app/core/usecase/sale/get-offer-byid.usecase';


@Component({
  selector: 'app-visualize-Sale',
  templateUrl: 'visualize-Sale.component.html',
  styleUrls: ['visualize-Sale.component.css'],
})
export class VisualizeSaleComponent implements OnInit {
  formSale: FormGroup;
  constructor(
    private _getSaleById: GetSaleByIdUseCase,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.createformSale();
    this.getSalebyId(this.config.data.id);
  }

  createformSale() {
    this.formSale = this._formBuilder.group({
      cliente: new FormControl( {value: null, disabled: true}),
      moto: new FormControl( {value: null, disabled: true}),
      fecha_venta: new FormControl( {value: null, disabled: true}),
      fecha_entrega: new FormControl( {value: null, disabled: true}),
      metodo_pago: new FormControl( {value: null, disabled: true}),
      monto: new FormControl( {value: null, disabled: true} ),
    });
  }

  async getSalebyId(id: string) {
    try {
      const response:Sale =
        await this._getSaleById.execute(id);
      console.log(response);
      this.formSale.setValue({
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
  async close() {
    this.ref.close();
  }
}
