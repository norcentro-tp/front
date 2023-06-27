import { Component, OnInit } from '@angular/core';
import { Offer} from 'src/app/core/models/all/response/all-responses.response';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  FormBuilder,
  FormGroup,
  FormControl
} from '@angular/forms';
import { GetOfferByIdUseCase } from 'src/app/core/usecase/offer/get-offer-byid.usecase';

@Component({
  selector: 'app-visualize-Offer',
  templateUrl: 'visualize-Offer.component.html',
  styleUrls: ['visualize-Offer.component.css'],
})
export class VisualizeOfferComponent implements OnInit {
  formOffer: FormGroup;
  constructor(
    private _getOfferById: GetOfferByIdUseCase,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.createformOffer();
    this.getOfferbyId(this.config.data.id);
  }

  createformOffer() {
    this.formOffer = this._formBuilder.group({
      nombre: new FormControl( {value: null, disabled: true} ),
      fecha_inicio: new FormControl( {value: null, disabled: true} ),
      fecha_fin: new FormControl( {value: null, disabled: true} ),
      modelo: new FormControl( {value: null, disabled: true} ),
      estado: new FormControl( {value: null, disabled: true} ),
      descuento: new FormControl( {value: null, disabled: true} ),
      
    });
  }

  async getOfferbyId(id: string) {
    try {
      const response:Offer =
        await this._getOfferById.execute(id);
      console.log(response);
      this.formOffer.setValue({
        nombre:response.nombre,
        fecha_inicio:response.fecha_inicio,
        fecha_fin:response.fecha_fin,
        modelo:response.modelo,
        descuento:response.descuento,
        estado:response.estado,
      });
    } catch (error) {
      console.error(error);
    }
  }
  async close() {
    this.ref.close();
  }
}
