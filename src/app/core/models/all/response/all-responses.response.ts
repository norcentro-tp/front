export interface GetAllInventoryResponse {
  _id: string;
  codigo_vin: string;
  color: string;
  modelo: Model;
  proveedor: Supplier;
  estado: Status;
  oferta: string[];
}

export interface GetAllSupplierResponse {
  _id?: string;
  nombre: string;
  telefono: string;
  correo: string;
  direccion: string;
}

export interface TemporalEmployeeResponse {
  data:GetAllEmployeeResponse
}
export interface GetAllEmployeeResponse {
  _id?: string;
  nombres: string;
  apellido_paterno: string;
  apellido_materno:string;
  documento_identificador:Documento;
  telefono: string;
  correo: string;
  usuario:Usuario;
}
export interface GetAllClientResponse {
  _id?: string;
  nombres: string;
  apellido_paterno: string;
  apellido_materno:string;
  documento_identificador:Documento;
  telefono: string;
  correo: string;
  usuario:Usuario;
 
}
export interface SupplierItemResponse {
  _id?: string;
  nombre: string;
  telefono: string;
  correo: string;
  direccion: string;
}
export interface BrandItemResponse {
  _id?: string;
  nombre: string;
  descripcion:string;
  icono:string;
  
}
export interface CategoryItemResponse {
  _id?: string;
  nombre: string;
  
}
export interface InventoryItemResponse {
  _id: string;
  codigo_vin: string;
  color: string;
  modelo: Model;
  proveedor: Supplier;
  estado: Status;
  oferta: string[];
}
export interface Category {
  _id: string;
  nombre: string;
}

export interface Brand {
  _id: string;
  nombre: string;
  descripcion:string;
  icono:string;
}

export interface Status {
  _id: string;
  nombre: string;
}

export interface Model {
  _id: string;
  nombre: string;
  categoria: Category;
  marca: Brand;
  anio: string;
  descripcion: string;
  precio: number;
  cilindrada: string;
  velocidades: string;
  capacidad_tanque: string;
  torque: string;
  motor: string;
  potencia: string;
  fotos: Photo[];
  catalogo:string;
 
}
export interface Usuario {
  _id?: string;
  nombre_usuario: string;
  password: string
}

export interface Documento {
  tipo_documento: string;
  numero_documento: string;
}

export interface Photo {
  nombre_foto: string;
  link: string;
}

export interface Employee {
  _id?: string;
  nombres: string;
  apellido_paterno: string;
  apellido_materno:string;
  documento_identificador:Documento;
  telefono: string;
  correo: string;
  usuario:Usuario;
}
export interface Client {
  _id?: string;
  nombres: string;
  apellido_paterno: string;
  apellido_materno:string;
  documento_identificador:Documento;
  telefono: string;
  correo: string;
  usuario:Usuario;
  
}

export interface Supplier {
  _id?: string;
  nombre: string;
  telefono: string;
  correo: string;
  direccion: string;
}