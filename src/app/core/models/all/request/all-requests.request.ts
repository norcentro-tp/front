import { Brand, Category, Model, Status, Supplier } from "../response/all-responses.response";

export interface PostInventoryRequest {
    codigo_vin: string;
    color: string;
    categoria: Category;
    modelo: Model;
    marca: Brand;
    proveedor: Supplier;
    estado: Status;
}

export interface PostCategoryRequest {
  nombre: string;
}
export interface PostBrandRequest {
  nombre: string;
  descripcion: string;
  imageFiles: File;
}
export interface PostModelRequest {
  nombre: string;
  categoria: Category;
  marca: Brand;
  cilindrada:string;
  velocidades:string;
  capacidad_tanque:string;
  torque:string;
  motor:string;
  potencia:string;
  precio:string;
  descripcion:string;
  fotos:string;
  anio:string;
  imageFiles: File;    
  }


export interface PostSupplierRequest {
  nombre: string;
  telefono: string;
  correo: string;
  direccion: string;
}

export interface PutInventoryRequest {
  id: string;
  codigo_vin: string;
  color: string;
  categoria: Category;
  modelo: Model;
  marca: Brand;
  proveedor: Supplier;
  estado: Status;
}
export interface PutSupplierRequest {
  nombre: string;
  telefono: string;
  correo: string;
  direccion: string;
}
export interface PutEmployeeRequest {
  _id?: string;
  nombres: string;
  apellido_paterno: string;
  apellido_materno:string;
  fecha_nacimiento:string;
  estado: string;
  documento_identificador:object;
  telefono: string;
  correo: string;
  usuario:object;
}
export interface PutClientRequest {
  _id?: string;
  nombres: string;
  apellido_paterno: string;
  apellido_materno:string;
  estado: string;
  documento_identificador:object;
  telefono: string;
  correo: string;
  usuario:object;
}
export interface PutBrandRequest {
  id: string;
  nombre: string;
  descripcion:string;
  icono:string;
  imageFiles: File;
}
export interface PutModelRequest {
  id: string;
  nombre: string;
  categoria: Category;
  marca: Brand;
  cilindrada:string;
  velocidades:string;
  capacidad_tanque:string;
  torque:string;
  motor:string;
  potencia:string;
  precio:string;
  descripcion:string;
  foto:string;
  anio:string;
  imageFiles: File;    
  }
export interface PutCategoryRequest {
  id: string;
  nombre: string;
}

export interface PostEmployeeRequest {
  _id?: string;
  nombres: string;
  apellido_paterno: string;
  apellido_materno:string;
  fecha_nacimiento:string;
  estado: string;
  documento_identificador:object;
  telefono: string;
  correo: string;
  usuario:object;
}
export interface PostClientRequest {
  _id?: string;
  nombres: string;
  apellido_paterno: string;
  apellido_materno:string;
  fecha_nacimiento:string;
  estado: string;
  documento_identificador:object;
  telefono: string;
  correo: string;
  usuario:object;
}