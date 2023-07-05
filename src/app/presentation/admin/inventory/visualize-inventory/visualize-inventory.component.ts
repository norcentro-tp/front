import { Component, OnInit } from '@angular/core';
import {
  Brand,
  Category,
  Model,
  Status,
  Supplier,
} from 'src/app/core/models/all/response/all-responses.response';
import { GetInventoryByIdUseCase } from 'src/app/core/usecase/inventory/get-moto-byid.usecase';
import { InventoryItemResponse } from 'src/app/core/models/all/response/all-responses.response';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { 
  FormBuilder,
  FormGroup,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-visualize-inventory',
  templateUrl: 'visualize-inventory.component.html',
  styleUrls: ['visualize-inventory.component.css'],
})
export class VisualizeInventoryComponent implements OnInit {
  formInventory: FormGroup;
  listaCategoriaMotos: Category[] = []
  listaModelo: Model[] = []
  listaMarca: Brand[] = []
  listaProveedor: Supplier[] = []
  listaStatus: Status[] = []
  constructor(
    private _getMotoById: GetInventoryByIdUseCase,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.createformInventory();
    this.getMotobyId(this.config.data.id)
  }

  createformInventory() {
    this.formInventory = this._formBuilder.group({
      codigoVin: new FormControl( {value: null, disabled: true} ),
      codigoColor: new FormControl( {value: null, disabled: true} ),
      modelo: new FormControl( {value: null, disabled: true} ),
      proveedor: new FormControl( {value: null, disabled: true} ),
      estado: new FormControl( {value: null, disabled: true} ),

    })
  }

  async getMotobyId(id: string) {
    try {
      const response: InventoryItemResponse = await this._getMotoById.execute(id);
      console.log(response);
      this.formInventory.setValue({
        codigoVin: response.codigo_vin,
        codigoColor: response.color,
        modelo: response.modelo.nombre,
        proveedor: response.proveedor.nombre,
        estado: response.estado.nombre

      })
    } catch (error) {
      console.error(error);
    }
  }
  async close() {
      this.ref.close()
  }
}
