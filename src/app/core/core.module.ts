import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryRepository } from './repository/inventory/inventory.repository';
import { InventoryWebRepository } from '../data/repository/inventory/inventory-web.repository';
import { CategoryRepository } from './repository/category/category.repository';
import { CategoryWebRepository } from '../data/repository/category/category-web.repository';
import { ModeloRepository } from './repository/modelo/modelo.repository';
import { ModeloWebRepository } from '../data/repository/modelo/modelo-web.repository';
import { BrandRepository } from './repository/brand/brand.repository';
import { BrandWebRepository } from '../data/repository/brand/brand-web.repository';
import { SupplierRepository } from './repository/supplier/supplier.repository';
import { SupplierWebRepository } from '../data/repository/supplier/supplier-web.repository';
import { StatusRepository } from './repository/status/status.repository';
import { StatusWebRepository } from '../data/repository/status/modelo-web.repository';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [],
    exports: [],
    providers: [

        { provide: InventoryRepository, useClass: InventoryWebRepository },
        { provide: CategoryRepository, useClass: CategoryWebRepository },
        { provide: ModeloRepository, useClass: ModeloWebRepository },
        { provide: BrandRepository, useClass: BrandWebRepository },
        { provide: SupplierRepository, useClass: SupplierWebRepository },
        { provide: StatusRepository, useClass: StatusWebRepository }

    ]
})

export class CoreModule { }
