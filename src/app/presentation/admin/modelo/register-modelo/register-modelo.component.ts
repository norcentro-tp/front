import { Component, OnInit } from '@angular/core';
import {
  Brand, Model
} from 'src/app/core/models/inventory/response/get-all-inventory.response';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PostBrandRequest, PostModeloRequest } from 'src/app/core/models/inventory/request/post-moto.request';
import { PostBrandUseCase } from 'src/app/core/usecase/brand/post-brand.usecase';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PostModeloUseCase } from 'src/app/core/usecase/modelo/post-modelo.usecase';
import { ModeloModule } from '../Modelo.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-modelo',
  templateUrl: 'register-modelo.component.html'
})
export class RegisterModeloComponent implements OnInit {
  formModelo:FormGroup;

  constructor(
    private _postModelo: PostModeloUseCase,
    public _dialogref: DynamicDialogRef,
    private _formBuilder:FormBuilder
  ) {}

  ngOnInit() {
    this.createformModelo();
  }
  nombre: string | null = null;
  cilindrada:string| null = null;
  velocidades:string| null = null;
  capacidadTanque:string| null = null;
  torque:string| null = null;
  motor:string| null = null;
  potencia:string| null = null;
  precio:string| null = null;
  descripcion:string| null = null;
  anio:string| null = null;
  Foto:string| null = null;

  createformModelo(){
    this.formModelo = this._formBuilder.group({
      nombre:[null],
      cilindrada:[null],
      velocidades:[null],
      capacidadTanque:[null],
      torque:[null],
      motor:[null],
      potencia:[null],
      precio:[null],
      descripcion:[null],
      anio:[null],
      foto:[null]
    })
  }

  async addModelo() {
    const form=this.formModelo.value
    const  bodyRequestModelo: PostModeloRequest ={
      nombre: form.nombre,
      cilindrada:form.cilindrada,
      velocidades:form.velocidades,
      capacidadTanque:form.capacidadTanque,
      torque:form.torque,
      motor: form.motor,
      potencia:form.potencia,
      precio:form.precio,
      descripcion:form.descripcion,
      foto:form.foto
      };
    try {
      const response: Model = await this._postModelo.execute(
        bodyRequestModelo
      );
      console.log(response);
      this.close()
    } catch (error) {
      console.error(error);
    }
  }
  close(){
    this._dialogref.close()
  }
}

