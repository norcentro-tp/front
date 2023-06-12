import { Component, OnInit } from '@angular/core';
import { Model, Category, Brand } from 'src/app/core/models/all/response/all-responses.response';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PostModelRequest } from 'src/app/core/models/all/request/all-requests.request';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PostModelUseCase } from 'src/app/core/usecase/model/post-model.usecase';
import { GetAllBrandsUseCase } from 'src/app/core/usecase/brand/get-all-brands.usecase';
import { GetAllCategoriesUseCase } from 'src/app/core/usecase/category/get-all-categories.usecase';

@Component({
  selector: 'app-register-model',
  templateUrl: 'register-model.component.html'
})
export class RegisterModelComponent implements OnInit {
  formModelo:FormGroup;
  selectedFiles: File[]=[];
  listaCategoria: Category[] = [];
  listaMarca: Brand[] = [];

  constructor(
    private _postModelo: PostModelUseCase,
    public _dialogref: DynamicDialogRef,
    private _formBuilder:FormBuilder,
    private _getAllBrands: GetAllBrandsUseCase,
    private _getAllCategories:  GetAllCategoriesUseCase,
  ) {}

  ngOnInit() {
    this.getAllCategories();
    this.getAllBrands();
    this.createformModelo();
  }
  nombre: string | null = null;
  cilindrada:string| null = null;
  velocidades:string| null = null;
  capacidad_tanque:string| null = null;
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
      categoria: [null],
      marca: [null],
      cilindrada:[null],
      velocidades:[null],
      capacidad_tanque:[null],
      torque:[null],
      motor:[null],
      potencia:[null],
      precio:[null],
      descripcion:[null],
      anio:[null],
      fotos:[null],
    })
  }

  async getAllCategories() {
    try {
      const response: Category[] = await this._getAllCategories.execute();
      this.listaCategoria = response;
    } catch (error) {
      console.error(error);
    }
  }

  async getAllBrands() {
    try {
      const response: Brand[] = await this._getAllBrands.execute();
      this.listaMarca = response;
    } catch (error) {
      console.error(error);
    }
  }
  onSelect(event: any)  {
    if (event.files && event.files.length > 0) {
      this.selectedFiles[0]= event.files[0];
      console.log(this.selectedFiles[0])
    }
  }

  async addModelo() {
    const form=this.formModelo.value
    const  bodyRequestModelo: PostModelRequest ={
      nombre: form.nombre,
      categoria: form.categoria,
      marca: form.marca,
      cilindrada:form.cilindrada,
      velocidades:form.velocidades,
      capacidad_tanque:form.capacidad_tanque,
      torque:form.torque,
      motor: form.motor,
      potencia:form.potencia,
      precio:form.precio,
      descripcion:form.descripcion,
      fotos:form.fotos,
      anio:form.anio,
      imageFiles:this.selectedFiles[0]
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

