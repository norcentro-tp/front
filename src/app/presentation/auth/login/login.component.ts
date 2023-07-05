import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private _router: Router) {}

  informacionUsuario: any = {
    user: 'mmm@gmail.com',
    password: '123456',
  };

  user: string;
  errorUser: boolean = false;
  password: string;
  errorPassword: boolean = false;

  ngOnInit() {}

  logIn() {
    const isValidUser = this.user == this.informacionUsuario.user;
    const isValidPassword = this.password == this.informacionUsuario.password;

    this.errorPassword = false;
    this.errorUser = false;

    if (!isValidUser || !isValidPassword) {
      !isValidPassword && (this.errorPassword = true);
      !isValidUser && (this.errorUser = true);
      return;
    }
    localStorage.setItem("userLogged",'logeado')
    this._router.navigate(['/admin']);
  }
}
