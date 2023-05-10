import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { PrimeNGModule } from 'src/app/shared/primeng/primeng.module';
import { AuthRoutingModule } from './auth.routing';
import { LoginComponent } from './login/login.component';

const COMPONENTS = [
    LoginComponent
]

@NgModule({
    declarations: [
        COMPONENTS
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        PrimeNGModule,
        SharedModule,
        AuthRoutingModule
    ]
})

export class AuthModule { }
