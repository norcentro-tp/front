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
                icon: 'pi pi-fw pi-box',
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
                        icon: 'pi pi-fw pi-building',
                        command: () => this._router.navigate(['admin/supplier'])
                    }
                ]
            },
            {
                label: 'Catalogo',
                icon: 'pi pi-fw pi-building',
                items: [
                    {
                        label: 'Gestionar Catalogo',
                        icon: 'pi pi-fw pi-building',
                        command: () => this._router.navigate(['admin/catalogue'])
                    }
                ]
            },
            {
                label: 'Usuarios',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Gestionar Usuario',
                        icon: 'pi pi-fw pi-reddit',
                        command: () => this._router.navigate(['admin/user'])
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