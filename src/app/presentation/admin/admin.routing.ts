import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const DEFAULT_ROUTE: string = 'inventory'

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [

            // Ruta Default
            {
                path: '',
                redirectTo: DEFAULT_ROUTE,
                pathMatch: 'full'
            },

            {
                path: 'inventory',
                loadChildren: () => import('./inventory/inventory.module').then(m => m.InventoryModule)
            },
            {
                path: 'supplier',
                loadChildren: () => import('./supplier/supplier.module').then(m => m.SupplierModule)
            },
          
            {
                path: 'employee',
                loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule)
            },
            {
                path: 'client',
                loadChildren: () => import('./client/client.module').then(m => m.ClientModule)
            },
            {
                path: 'category',
                loadChildren: () => import('./category/category.module').then(m => m.CategoryModule)
            },
            {
                path: 'brand',
                loadChildren: () => import('./brand/brand.module').then(m => m.BrandModule)
            },
            {
                path: 'model',
                loadChildren: () => import('./model/model.module').then(m => m.ModelModule)
            },
            {
                path: 'catalogue',
                loadChildren: () => import('./catalogue/catalogue.module').then(m => m.CatalogueModule)
            },
            {
                path: 'offer',
                loadChildren: () => import('./offer/offer.module').then(m => m.OfferModule)
            },
            {
                path: 'campaing',
                loadChildren: () => import('./campaing/campaing.module').then(m => m.CampaingModule)
            },
            {
                path: 'sale',
                loadChildren: () => import('./sale/sale.module').then(m => m.SaleModule)
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule { }
