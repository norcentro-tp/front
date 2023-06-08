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
                path: 'user',
                loadChildren: () => import('./user/user.module').then(m => m.UserModule)
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
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule { }
