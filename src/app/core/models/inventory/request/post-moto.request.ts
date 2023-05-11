import { Brand, Category, Model, Status, Supplier } from "../response/get-all-inventory.response";

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
}
export interface PostSupplierRequest {
  nombre: string;
  telefono: string;
  correo: string;
  direccion: string;
}

export interface PutInventoryRequest {
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
export interface PutBrandRequest {
  id: string;
  nombre: string;
}
export interface PutCategoryRequest {
  id: string;
  nombre: string;
}

