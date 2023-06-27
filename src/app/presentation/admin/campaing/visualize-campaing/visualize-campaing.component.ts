import { Component, OnInit } from '@angular/core';
import { Campaing} from 'src/app/core/models/all/response/all-responses.response';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  FormBuilder,
  FormGroup,
  FormControl
} from '@angular/forms';
import { GetCampaingByIdUseCase } from 'src/app/core/usecase/campaing/get-campaing-byid.usecase';

@Component({
  selector: 'app-visualize-Campaing',
  templateUrl: 'visualize-Campaing.component.html',
  styleUrls: ['visualize-Campaing.component.css'],
})
export class VisualizeCampaingComponent implements OnInit {
  formCampaing: FormGroup;
  constructor(
    private _getCampaingById: GetCampaingByIdUseCase,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.createformCampaing();
    this.getCampaingbyId(this.config.data.id);
  }

  createformCampaing() {
    this.formCampaing = this._formBuilder.group({
      nombre: new FormControl( {value: null, disabled: true} ),
      fecha_inicio: new FormControl( {value: null, disabled: true} ),
      fecha_fin: new FormControl( {value: null, disabled: true} ),
      descripcion: new FormControl( {value: null, disabled: true} ),
      archivos: new FormControl( {value: null, disabled: true} ),
      descuento: new FormControl( {value: null, disabled: true} ),
      
    });
  }

  async getCampaingbyId(id: string) {
    try {
      const response:Campaing =
        await this._getCampaingById.execute(id);
      console.log(response);
      this.formCampaing.setValue({
        nombre:response.nombre,
        fecha_inicio:response.fecha_inicio,
        fecha_fin:response.fecha_fin,
        descripcion:response.descripcion,
        archivos:response.archivos,
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
