import { Component, OnInit } from '@angular/core';
import {
  GetAllOfferResponse,
  Status,
} from 'src/app/core/models/all/response/all-responses.response';
import { PostOfferRequest} from 'src/app/core/models/all/request/all-requests.request';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PostOfferUseCase } from 'src/app/core/usecase/offer/post-offer.usecase';
import { DropdownModule } from 'primeng/dropdown';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { emailValidator, passwordValidator, numericValidator, alphabeticValidator, alphanumericValidator, allFieldsFilledValidator } from '../../validators/custom-validators';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-register-Offer',
  templateUrl:'register-Offer.component.html',
})
export class RegisterOfferComponent implements OnInit {
  formOffer: FormGroup;
  constructor(
    private _postOffer: PostOfferUseCase,
    public _dialogref: DynamicDialogRef,
    public _dropdownModule: DropdownModule,
    private _formBuilder: FormBuilder,
    private _alertService: AlertService
  ) {}

  ngOnInit() {
    this.createformOffer();
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


  async addOffer() {
    const form = this.formOffer.value;
    const bodyRequestOffer: PostOfferRequest = {
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
      const response: GetAllOfferResponse = await this._postOffer.execute(
        bodyRequestOffer
      );

      this._alertService.success('Se realizo el registro con exito');
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
  
  
