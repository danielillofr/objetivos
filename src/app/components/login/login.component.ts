import { Component, OnInit } from '@angular/core';
import { ApihttpService } from './../../services/apihttp.service';
import { Router } from '@angular/router';
import { TipoUsuario } from './../../interfaces/usuario.interface';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./grid-layout.css']
})
export class LoginComponent implements OnInit {
  usuario: String = '';
  clave: String = '';
  titulo: String = 'Login';
  errorAcceso: String = '';

  constructor(private apihttp: ApihttpService, private router: Router) {

  }

  ngOnInit() {
  }

  Login () {
    this.apihttp.solicitar_token(this.usuario, this.clave).subscribe (data => {
      if (data.ok === false) {
        if (data.errBaseDatos) {
          this.errorAcceso = 'Error accediendo a la base de datos';
        } else {
          this.errorAcceso = data.err;
        }
        return;
      }
      this.apihttp.token = data.token;
      this.apihttp.logueado = true;
      console.log('Datos:', data);
      console.log('Token', data.token);
      this.apihttp.usuarioApp = <TipoUsuario>data.usuario;
      this.router.navigate(['listusers']);
    }, (err) => {
      this.errorAcceso = 'Error accediendo a la base de datos';
    });

  }

}
