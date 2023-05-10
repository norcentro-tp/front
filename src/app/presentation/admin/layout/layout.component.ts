import { Component, OnInit } from '@angular/core';
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

    ngOnInit() {
        this.setItemsMenu()
    }

    setItemsMenu() {

        this.items = [
            {
                label: 'Inventario',
                url: 'inventory'
            },
            {
                label: 'Proveedores',
                url: 'supplier'
            },
            {
                label: 'Usuarios',
                url: 'user'
            },
        ]
    }

}