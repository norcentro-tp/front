import { Component, OnInit } from '@angular/core';
import {
  Offer,
  GetAllOfferResponse,
} from 'src/app/core/models/all/response/all-responses.response';
import { PutOfferRequest } from 'src/app/core/models/all/request/all-requests.request';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GetOfferByIdUseCase } from 'src/app/core/usecase/offer/get-offer-byid.usecase';
import { PutOfferUseCase } from 'src/app/core/usecase/offer/put-offer.usecase';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { emailValidator, passwordValidator, numericValidator, alphabeticValidator, alphanumericValidator, allFieldsFilledValidator } from '../../validators/custom-validators';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-update-Offer',
  templateUrl: 'update-Offer.component.html',
  styleUrls: ['update-Offer.component.css'],
})
export class UpdateOfferComponent implements OnInit {
  formOffer: FormGroup;
  
  

  constructor(
    private _getOfferById: GetOfferByIdUseCase,
    private _putOffer: PutOfferUseCase,
    private _alertService: AlertService,
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
      nombre: [
        null,
        [
          Validators.minLength(4),
          Validators.maxLength(20),
          alphabeticValidator()
        ],
      ],
      fecha_inicio: [null],
      fecha_fin: [null],
      modelo: [null],
      descuento: [null],
      estado: [null],
      
    })
  }


  async getOfferbyId(id: string) {
    try {
      const response: GetAllOfferResponse =
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
      console.log(this.formOffer.value);
    } catch (error) {
      console.error(error);
    }
  }
  async updateOffer(id: string) {
    const form = this.formOffer.value;
    const bodyRequestOffer: PutOfferRequest = {
      nombre:form.nombre,
      fecha_inicio:form.fecha_inicio,
      fecha_fin:form.fecha_fin,
      modelo:form.modelo,
      descuento:form.descuento,
      estado:form.estado,
      };
    this.formOffer.markAllAsTouched();
    if (this.formOffer.invalid) {
      this._alertService.error('Por favor llene todos los campos correctamente');
      return;
    };
    try {
      if (this.formOffer.invalid) return;
      const response: Offer = await this._putOffer.execute({
        id: id,
        bodyRequest: bodyRequestOffer,
      });

      this._alertService.success('Cambios Guardados');
      console.log(response);
      this.ref.close();
    } catch (error) {
      console.error(error);
    }
  }
}
