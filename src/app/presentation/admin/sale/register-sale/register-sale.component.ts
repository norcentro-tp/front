import { Component, OnInit } from '@angular/core';
import {
  GetAllInventoryResponse,
  GetAllClientResponse,
  GetAllSaleResponse,
  Brand,
  Status,
  Client,
} from 'src/app/core/models/all/response/all-responses.response';
import { PostSaleRequest } from 'src/app/core/models/all/request/all-requests.request';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PostSaleUseCase } from 'src/app/core/usecase/sale/post-sale.usecase';
import { DropdownModule } from 'primeng/dropdown';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  emailValidator,
  passwordValidator,
  numericValidator,
  numericPlusValidator,
  alphabeticValidator,
  alphanumericValidator,
  allFieldsFilledValidator,
} from '../../validators/custom-validators';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GetAllInventoryUseCase } from 'src/app/core/usecase/inventory/get-all-inventory.usecase';
import { GetAllClientUseCase } from 'src/app/core/usecase/client/get-all-client.usecase';

@Component({
  selector: 'app-register-sale',
  templateUrl: 'register-sale.component.html',
  styleUrls: ['register-sale.component.css'],
})
export class RegisterSaleComponent implements OnInit {
  formVenta: FormGroup;
  selectedFiles: File[] = [];
  fileSelected: Boolean = false;
  listaMoto: any[] = [];
  listaCliente: any[] = [];
  listaMotoFiltrado: any[] = [];
  selectedMoto: any = null;

  constructor(
    private _postVenta: PostSaleUseCase,
    private _getAllMoto: GetAllInventoryUseCase,
    private _getAllClient: GetAllClientUseCase,
    public _dialogref: DynamicDialogRef,
    public _dropdownModule: DropdownModule,
    private _formBuilder: FormBuilder,
    private _alertService: AlertService
  ) {}

  ngOnInit() {
    this.getAllInventory();
    this.getAllClient();
    this.createformSale();
  }
  createformSale() {
    this.formVenta = this._formBuilder.group(
      {
        moto: [null],
        cliente: [null],
        monto: [null, [numericPlusValidator()]],
        metodo_pago: [null],
        fecha_entrega: [null],
        filtro_moto: [null],
        codigo_vin: new FormControl( {value: null, disabled: true} ),
        modelo: new FormControl( {value: null, disabled: true} ),
        marca: new FormControl( {value: null, disabled: true} ),
        color: new FormControl( {value: null, disabled: true} ),
        precio: new FormControl( {value: null, disabled: true} ),
      },
      { validators: allFieldsFilledValidator() }
    );
  }

  async getAllInventory() {
    try {
      const response: GetAllInventoryResponse[] =
        await this._getAllMoto.execute();
      console.log('INVENTARIO RESPUESTA BACKEND', response);
      this.listaMoto = response.reverse();
      this.listaMotoFiltrado = [...this.listaMoto];
      console.log(this.listaMoto);
    } catch (error) {
      console.log(error);
    }
  }
  async getAllClient() {
    try {
      const response: GetAllClientResponse[] =
        await this._getAllClient.execute();

      console.log('Cliente RESPUESTA BACKEND', response);
      this.listaCliente = response.map(cliente => ({
        ...cliente,
        label: `${cliente.apellido_paterno} ${cliente.apellido_materno}, ${cliente.nombres}`
      }));
    } catch (error) {
      console.log(error);
    }
  }

  applyFilter() {
    const filtro = this.formVenta.get('filtro_moto')?.value?.toLowerCase();
    if (filtro) {
      this.listaMotoFiltrado = this.listaMoto.filter(
        (moto) =>
          moto.modelo?.marca?.nombre?.toLowerCase().includes(filtro) ||
          moto.modelo?.nombre?.toLowerCase().includes(filtro) ||
          moto.color?.toLowerCase().includes(filtro)
      );
    } else {
      this.listaMotoFiltrado = [...this.listaMoto];
    }
  }

  onSelect(event: any) {
    if (event.files && event.files.length > 0) {
      this.selectedFiles[0] = event.files[0];
      this.fileSelected = true;
    }
  }

  async addSale() {
    const form = this.formVenta.value;
    const bodyRequestSale: PostSaleRequest = {
      monto: form.monto,
      fecha_entrega: form.fecha_entrega,
      metodo_pago: form.metodo_pago,
      moto: form.moto,
      cliente: form.cliente,
      imageFiles: this.selectedFiles[0],
    };

    this.formVenta.markAllAsTouched();
    if (this.formVenta.invalid) {
      this._alertService.error(
        'Por favor llene todos los campos correctamente'
      );
      return;
    }
    try {
      if (this.formVenta.invalid) return;
      const response: GetAllSaleResponse = await this._postVenta.execute(
        bodyRequestSale
      );

      this._alertService.success('Se realizo el registro con exito');
      console.log(response);
      this.close();
    } catch (error) {
      console.error(error);
    }
  }

  SeleccionarMoto(id: string) {
    this.selectedMoto = this.listaMoto.find((moto) => moto._id === id);
    console.log(this.selectedMoto);
    this.formVenta.patchValue({
      moto: id,
      codigo_vin: this.selectedMoto.codigo_vin,
      modelo: this.selectedMoto.modelo.nombre,
      marca: this.selectedMoto.modelo.marca.nombre,
      color: this.selectedMoto.color,
      precio: this.selectedMoto.modelo.precio,
    });

    console.log(this.formVenta.value);
    this.formVenta.markAsDirty();
  }

  DeseleccionarMoto() {
    this.selectedMoto = null;

    this.formVenta.patchValue({
      moto: null,
      codigo_vin: null,
      modelo: null,
      marca: null,
      color: null,
      precio: null,
    });

    this.formVenta.markAsDirty();
  }

  close() {
    this._dialogref.close();
  }
}
