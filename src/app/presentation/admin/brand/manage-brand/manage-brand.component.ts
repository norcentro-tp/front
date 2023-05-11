import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  Brand,
  Category,
} from 'src/app/core/models/inventory/response/get-all-inventory.response';
import { GetAllBrandsUseCase } from 'src/app/core/usecase/brand/get-all-brands.usecase';
import { RegisterBrandComponent } from '../register-brand/register-brand.component';
import { UpdateBrandComponent } from '../update-brand/update-brand.component';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-manage-brand',
  templateUrl: 'manage-brand.component.html',
  providers: [DialogService],
})
export class ManageBrandComponent implements OnInit {
  lBrand: Brand[] = [];

  constructor(
    public dialogService: DialogService,
    private _confirmationService: ConfirmationService,
    private _getAllBrands: GetAllBrandsUseCase
  ) {}
  ref: DynamicDialogRef;
  ngOnInit() {
    this.getAllBrands();
  }

  async getAllBrands() {
    try {
      const response: Brand[] = await this._getAllBrands.execute();

      console.log('Brand RESPUESTA BACKEND', response);
      this.lBrand = response;
    } catch (error) {
      console.log(error);
    }
  }
  //
  openRegister() {
    this.ref = this.dialogService.open(RegisterBrandComponent, {
      header: 'Agregar marca',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      width: '80rem',
    });

    this.ref.onClose.subscribe((result) => {
      this.getAllBrands();
    });
  }
  openUpdate(id: string) {
    const ref = this.dialogService.open(UpdateBrandComponent, {
      header: 'Editar Marca',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      width: '80rem',
      data: {
        id: id,
      },
    });

    ref.onClose.subscribe((result) => {
      console.log('SE CERRO');
      this.getAllBrands();
    });
  }
  deleteBrand(id: string){
    try { this._confirmationService.confirm({ 
      message: "Estás seguro que desea eliminar? ",
      accept: ()=> {},
      reject: ()=> {},
    })
      
    } catch (error) {
      
    }
}
}
