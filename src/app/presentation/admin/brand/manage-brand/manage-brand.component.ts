import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Brand } from 'src/app/core/models/inventory/response/get-all-inventory.response';
import { GetAllBrandsUseCase } from 'src/app/core/usecase/brand/get-all-brands.usecase';
import { DeleteBrandUseCase } from 'src/app/core/usecase/brand/delete-brand.usecase';
import { RegisterBrandComponent } from '../register-brand/register-brand.component';
import { UpdateBrandComponent } from '../update-brand/update-brand.component';
import { ConfirmationService } from 'primeng/api';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-manage-brand',
  templateUrl: 'manage-brand.component.html',
  providers: [DialogService],
})
export class ManageBrandComponent implements OnInit {
  lBrands: any[] = [];

  constructor(
    public dialogService: DialogService,
    private _confirmationService: ConfirmationService,
    private _alertService: AlertService,

    private _getAllBrands: GetAllBrandsUseCase,
    private _deleteBrand: DeleteBrandUseCase
  ) {}
  ref: DynamicDialogRef;
  ngOnInit() {
    this.getAllBrands();
  }

  async getAllBrands() {
    try {
      const response: Brand[] = await this._getAllBrands.execute();

      console.log('CATEGORY RESPUESTA BACKEND', response);
      this.lBrands = response.reverse();
    } catch (error) {
      console.log(error);
    }
  }

  openRegisterDialog() {
    this.ref = this.dialogService.open(RegisterBrandComponent, {
      header: 'Agregar marca',
      width: '40rem',
    });

    this.ref.onClose.subscribe((result) => {
      this.getAllBrands();
    });
  }
  openUpdateDialog(id: string) {
    const ref = this.dialogService.open(UpdateBrandComponent, {
      header: 'Editar Marca',
      width: '40rem',
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
      accept: ()=> {
        this._deleteBrand.execute(id).then(() => {
          this.getAllBrands();
          this._alertService.success('Se elimino la marca seleccionada');
        });
      },
      reject: ()=> {},
    })
      
    } catch (error) {
      
    }
}
}
