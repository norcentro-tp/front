import { Component, OnInit } from '@angular/core';
import {
  Brand,
  BrandItemResponse,
  Category,
  CategoryItemResponse,
} from 'src/app/core/models/inventory/response/get-all-inventory.response';
import { AlertService } from 'src/app/shared/services/alert.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GetCategoryByIdUseCase } from 'src/app/core/usecase/category/get-category-byid.usecase';
import { PutBrandRequest, PutCategoryRequest } from 'src/app/core/models/inventory/request/post-moto.request';
import { GetAllCategoriesUseCase } from 'src/app/core/usecase/category/get-all-categories.usecase';
import { PutCategoryUseCase } from 'src/app/core/usecase/category/put-category.usecase';

@Component({
  selector: 'app-update-brand',
  templateUrl: 'update-category.component.html',
  styleUrls: ['update-category.component.css'],
})
export class UpdateCategoryComponent implements OnInit {
  formCategory: FormGroup;
  listaCategory: Category[] = [];

  constructor(
    private _getAllCategories: GetAllCategoriesUseCase,
    private _getCategoryById: GetCategoryByIdUseCase,
    private _putCategory: PutCategoryUseCase,
    private _alertService: AlertService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.createformCategory();
    this.getAllCategories();
    this.getCategorybyId(this.config.data.id);
  }

  createformCategory() {
    this.formCategory = this._formBuilder.group({
      nombre: [null],
    });
  }

  async getCategorybyId(id: string) {
    try {
      const response: CategoryItemResponse = await this._getCategoryById.execute(id);
      console.log(response);
      this.formCategory.setValue({
        nombre: response.nombre,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async getAllCategories() {
    try {
      const response: Category[] = await this._getAllCategories.execute();
      this.listaCategory = response;
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  async updateCategory(id: string) {
    const form = this.formCategory.value;
    const bodyRequestCategory: PutCategoryRequest = {
      id: id,
      nombre: form.nombre,
    };
    try {
      const response: CategoryItemResponse = await this._putCategory.execute(
        bodyRequestCategory
      );

      this._alertService.success('Cambios Guardados');
      console.log(response);
      this.ref.close();
    } catch (error) {
      console.error(error);
    }
  }
}
