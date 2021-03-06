import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs';
import { TipoUsuario, RespuestaListaUsuarios } from './../interfaces/usuario.interface';
import { environment } from './../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ApihttpService {
  public token;
  public logueado: Boolean = false;
  public usuarioApp: TipoUsuario;

   //env: String = '';
    env: String = environment.ruta_backend;

  constructor(private http: HttpClient) {
  }

  Solicitar_api() {
    console.log('Solicitando api en el servidcio');
    // return this.http.get('http://localhost:3000/api/hola');
    return this.http.get<any>(`${this.env}/api/hola`);
  }

  solicitar_token (usuario: String, clave: String) {
    // return this.http.post('http://localhost:3000/api/usuarios/login', {nombre: usuario, clave});
    return this.http.post<any>(`${this.env}/api/usuarios/login`, {nombre: usuario, clave});
  }

  solicitar_usuarios () {
    const opciones = {
      headers: new HttpHeaders ({
        Authorization: this.token
      })
    };
    // return this.http.get(`http://localhost:3000/api/usuarios`, opciones);
    return this.http.get(`${this.env}/api/usuarios`, opciones);
  }

  eliminar_usuario (id: String) {
    const opciones = {
      headers: new HttpHeaders ({
        Authorization: this.token
      })
    };
    // return this.http.delete(`http://localhost:3000/api/usuarios/${id}`, opciones);
    return this.http.delete(`${this.env}/api/usuarios/${id}`, opciones);
  }

  modificar_usuario (id: String)
  {
    const opciones = {
      headers: new HttpHeaders ({
        Authorization: this.token
      })
    };
    // return this.http.put(`http://localhost:3000/api/usuarios/${id}`, {nombre: 'Nuevo nombre'}, opciones);
    return this.http.put(`${this.env}/api/usuarios/${id}`, {nombre: 'Nuevo nombre'}, opciones);
  }

  //Solicitar los usuarios del usuario que está logueado

  Obtener_usuarios_de_aprobador = () => {
    const opciones = {
      headers: new HttpHeaders ({
        Authorization: this.token
      })
    };
    return new Promise((resolve,reject) => {
      this.http.get<RespuestaListaUsuarios>(`${this.env}/api/usuarios`, opciones)
        .subscribe((respuesta) => {
          if (!respuesta.ok) {
            console.log('Error obteniendo lista de usuarios:', respuesta);
            reject('Error obteniendo lista de usuarios:');
          }
          resolve (respuesta.usuarios);
        }, (err) => {
          console.log('Error accediendo a la base de datos:', err);
          reject ('Error obteniendo lista de usuarios:');
        });
    });
  }

}
