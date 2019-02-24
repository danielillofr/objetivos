import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApihttpService } from './apihttp.service';
import { TipoRespuestaDatosUsuario } from './../interfaces/objetivo.interface';



@Injectable({
  providedIn: 'root'
})
export class ObjetivosService {
  env: String = 'http://localhost:3000';

  constructor(private apihttpservice: ApihttpService, private http: HttpClient) { }

  Obtener_datos_usuario = (idUsuario) => {
    const opciones = {
      headers: new HttpHeaders ({
        Authorization: this.apihttpservice.token
      })
    };
    return new Promise((resolve, reject) => {
      this.http.get<TipoRespuestaDatosUsuario>(`${this.env}/api/objetivos/${idUsuario}`, opciones)
        .subscribe(respuesta => {
          if (!respuesta.ok)
          {
            console.log('Error obteniendo los datos del usuario', respuesta);
            reject ('Error obteniendo los datos del usuario');
          }
          console.log(respuesta);
          resolve(respuesta.datos);
        }, err => {
          console.log('Error accediendo a la base de datos:', err);
          reject ('Error obteniendo lista de usuarios:');
        })
    })
  }
}
