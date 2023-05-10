export interface GetAllInventoryResponse {
  _id: string;
  codigo_vin: string;
  color: string;
  categoria: Category;
  modelo: Model;
  marca: Brand;
  proveedor: Supplier;
  estado: Status;
  oferta: string[];
}
export interface GetAllSupplierResponse{
  _id: string;
  nombre: string;
  telefono: string;
  correo: string;
  direccion: string;
}
export interface Category {
  _id: string;
  nombre: string;
}

export interface Brand {
  _id: string;
  nombre: string;
}

export interface Status {
  _id: string;
  nombre: string;
}

export interface Model {
  _id: string;
  nombre: string;
  anio: string;
  descripcion: string;
  precio: number;
  fotos: Photo[];
}

export interface Photo {
  nombre_foto: string;
  link: string;
}

export interface Supplier {
  _id: string;
  nombre: string;
  telefono: string;
  correo: string;
  direccion: string;
}

export interface PostInventoryRequest {
  codigo_vin: string;
  color: string;
  categoria: Category;
  modelo: Model;
  marca: Brand;
  proveedor: Supplier;
  estado: Status;
}
export interface PostSupplierRequest {
  nombre: string;
  telefono: string;
  correo: string;
  direccion: string;
}
