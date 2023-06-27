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
      nombres: new FormControl( {value: null, disabled: true} ),
      apellido_paterno: new FormControl( {value: null, disabled: true} ),
      apellido_materno: new FormControl( {value: null, disabled: true} ),
      documento_identificador: new FormControl( {value: null, disabled: true} ),
      telefono: new FormControl( {value: null, disabled: true} ),
      correo: new FormControl( {value: null, disabled: true} ),
      usuario: new FormControl( {value: null, disabled: true} ),
      contraseña: new FormControl( {value: null, disabled: true} ),
      codigo_vin: new FormControl( {value: null, disabled: true}),
      color: new FormControl( {value: null, disabled: true}),
      modelo: new FormControl( {value: null, disabled: true}),
      precio: new FormControl( {value: null, disabled: true}),
      metodo_pago: new FormControl( {value: null, disabled: true}),
      archivo_boleta: new FormControl( {value: null, disabled: true}),
      estado: new FormControl( {value: null, disabled: true}),
    });
  }

  async getSalebyId(id: string) {
    try {
      const response:Sale =
        await this._getSaleById.execute(id);
      console.log(response);
      this.formSale.setValue({
        nombres: response.nombres,
        apellido_paterno: response.apellido_paterno,
        apellido_materno: response.apellido_materno,
        documento_identificador: response.documento_identificador,
        telefono: response.telefono,
        correo: response.correo,
        id_usuario: response.usuario._id,
        usuario: response.usuario.nombre_usuario,
        contraseña: response.usuario.password,
        precio: response.precio,
        color:response.color,
        estado: response.estado,
        codigo_vin: response.codigo_vin,
        metodo_pago: response.metodo_pago,
        modelo: response.modelo,
        archivo_boleta: response.archivo_boleta
      });
    } catch (error) {
      console.error(error);
    }
  }
  async close() {
    this.ref.close();
  }
}
