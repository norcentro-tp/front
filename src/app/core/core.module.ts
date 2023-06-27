import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryRepository } from './repository/inventory/inventory.repository';
import { InventoryWebRepository } from '../data/repository/inventory/inventory-web.repository';
import { CategoryRepository } from './repository/category/category.repository';
import { CategoryWebRepository } from '../data/repository/category/category-web.repository';
import { ModelRepository } from './repository/model/model.repository';
import { ModelWebRepository } from '../data/repository/model/model-web.repository';
import { BrandRepository } from './repository/brand/brand.repository';
import { BrandWebRepository } from '../data/repository/brand/brand-web.repository';
import { SupplierRepository } from './repository/supplier/supplier.repository';
import { SupplierWebRepository } from '../data/repository/supplier/supplier-web.repository';
import { StatusRepository } from './repository/status/status.repository';
import { StatusWebRepository } from '../data/repository/status/modelo-web.repository';
import { EmployeeWebRepository } from '../data/repository/employee/employee-web.repository';
import { EmployeeRepository } from './repository/employee/employee.repository';
import { ClientWebRepository } from '../data/repository/client/client-web.repository';
import { ClientRepository } from './repository/client/client.repository';
import { OfferRepository } from './repository/offer/offer.repository';
import { OfferWebRepository } from '../data/repository/offer/offer-web.repository';
import { CampaingRepository } from './repository/campaing/campaing.repository';
import { SaleRepository } from './repository/sale/sale.repository';
import { SaleWebRepository } from '../data/repository/sale/sale-web.repository';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [],
    exports: [],
    providers: [

        { provide: InventoryRepository, useClass: InventoryWebRepository },
        { provide: CategoryRepository, useClass: CategoryWebRepository },
        { provide: ModelRepository, useClass: ModelWebRepository },
        { provide: BrandRepository, useClass: BrandWebRepository },
        { provide: SupplierRepository, useClass: SupplierWebRepository },
        { provide: StatusRepository, useClass: StatusWebRepository },
        { provide: EmployeeRepository, useClass: EmployeeWebRepository },
        { provide: ClientRepository, useClass: ClientWebRepository },
        { provide: OfferRepository, useClass: OfferWebRepository },
        { provide: CampaingRepository, useClass: OfferWebRepository },
        { provide: SaleRepository, useClass: SaleWebRepository }
    ]
})

export class CoreModule { }
