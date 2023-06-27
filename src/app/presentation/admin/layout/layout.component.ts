import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { filter, map, Subscription } from 'rxjs';

@Component({
    selector: 'app-layout',
    templateUrl: 'layout.component.html',
    styleUrls: ['./layout.component.scss']
})

export class LayoutComponent implements OnInit {


    display: boolean
    items: MenuItem[] = []

    constructor(
        private _router: Router
    ) { }
    ngOnInit() {
        this.setItemsMenu()
    }

    setItemsMenu() {

        this.items = [
            {
                label: 'Inventario',
                icon: 'pi pi-fw pi-book',
                items: [
                    {
                        label: 'Gestionar Inventario',
                        icon: 'pi pi-fw pi-box',
                        command: () => this._router.navigate(['admin/inventory'])
                    },
                    {
                        label: 'Gestionar Marca',
                        icon: 'pi pi-fw pi-apple',
                        command: () => this._router.navigate(['admin/brand'])
                    },
                    {
                        label: 'Gestionar Categoria',
                        icon: 'pi pi-fw pi-briefcase',
                        command: () => this._router.navigate(['admin/category'])
                    },
                    {
                        label: 'Gestionar Modelo',
                        icon: 'pi pi-fw pi-slack',
                        command: () => this._router.navigate(['admin/model'])
                    }
                ]
            },
            {
                label: 'Proveedores',
                icon: 'pi pi-fw pi-building',
                items: [
                    {
                        label: 'Gestionar Proveedor',
                        icon: 'pi pi-fw pi-truck',
                        command: () => this._router.navigate(['admin/supplier'])
                    }
                ]
            },
            {
                label: 'Catalogo',
                icon: 'pi pi-fw pi-images',
                items: [
                    {
                        label: 'Gestionar Catalogo',
                        icon: 'pi pi-fw pi-th-large',
                        command: () => this._router.navigate(['admin/catalogue'])
                    }
                ]
            },
            {
                label: 'Usuarios',
                icon: 'pi pi-fw pi-users',
                items: [
                    {
                        label: 'Gestionar Empleado',
                        icon: 'pi pi-fw pi-android',
                        command: () => this._router.navigate(['admin/employee'])
                    },
                    {
                        label: 'Gestionar Cliente',
                        icon: 'pi pi-fw pi-reddit',
                        command: () => this._router.navigate(['admin/client'])
                    }
                    
                ]
            },
            {
                label: 'Postventa',
                icon: 'pi pi-fw pi-bitcoin',
                items: [
                    {
                        label: 'Gestionar Oferta',
                        icon: 'pi pi-fw pi-chart-pie',
                        command: () => this._router.navigate(['admin/offer'])
                    },
                    {
                        label: 'Gestionar Campaña',
                        icon: 'pi pi-fw pi-file-export',
                        command: () => this._router.navigate(['admin/campaing'])
                    }
                    
                ]
            },
            {
                label: 'Ventas ',
                icon: 'pi pi-fw pi-bitcoin',
                items: [
                    {
                        label: 'Gestionar Venta Tienda',
                        icon: 'pi pi-fw pi-chart-pie',
                        command: () => this._router.navigate(['admin/sale'])
                    },
                    {
                        label: 'Gestionar Venta Pedido',
                        icon: 'pi pi-fw pi-file-export',
                        command: () => this._router.navigate(['admin/order'])
                    }
                    
                ]
            },
            
            {
                label: 'Cerrar Sesión',
                icon: 'pi pi-fw pi-sign-out',
                command: () => this._router.navigate(['login'])
            }
        ]
    }

}