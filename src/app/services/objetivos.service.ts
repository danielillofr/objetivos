import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApihttpService } from './apihttp.service';
import { TipoRespuestaDatosUsuario } from './../interfaces/objetivo.interface';
import { TipoRespuestaObjetivo, TipoRespuestaObjetivoCompleto } from '../interfaces/objetivo.interface';
import { TipoRespuestaIncidencia } from './../interfaces/incidencia.interface';
import { environment } from './../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ObjetivosService {
  // env: String = 'http://localhost:3000';
  env: String = environment.ruta_backend;
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
          resolve(respuesta.datos);
        }, err => {
          console.log('Error accediendo a la base de datos:', err);
          reject ('Error obteniendo lista de usuarios:');
        })
    })
  }

  Crear_objetivo = (objetivo: any) => {
    const opciones = {
      headers: new HttpHeaders ({
        Authorization: this.apihttpservice.token
      })
    };
    return new Promise((resolve,reject) => {
      this.http.post<TipoRespuestaObjetivo>(`${this.env}/api/objetivos`, objetivo, opciones)
        .subscribe(respuesta => {
          if (!respuesta.ok) {
            console.log('Error creando objetivo:', respuesta);
            reject('Error creando objetivo');
          }
          resolve(respuesta.objetivo);
        }, err => {
          console.log('Error accediendo a la base de datos:', err);
          reject ('Error obteniendo lista de usuarios:');
        })
    })
  }

  Obtener_objetivo_completo = (idObjetivo) => {
    const opciones = {
      headers: new HttpHeaders ({
        Authorization: this.apihttpservice.token
      })
    };
    return new Promise((resolve,reject) => {
      this.http.get<TipoRespuestaObjetivoCompleto>(`${this.env}/api/objetivos/completo/${idObjetivo}`,opciones)
        .subscribe(respuesta => {
          if (!respuesta.ok){
            console.log('Error obteniendo el objetivo:', respuesta);
            reject('Error obteniendo el objetivo');
          }
          resolve(respuesta.objetivoCompleto);
        }, err => {
          console.log('Error accediendo a la base de datos:', err);
          reject('Error accediendo a la base de datos');
        })
    })
  }

  Modificar_conseguido = (idObjetivo, datos) => {
    const opciones = {
      headers: new HttpHeaders ({
        Authorization: this.apihttpservice.token
      })
    };
    return new Promise((resolve,reject) => {
      this.http.put<TipoRespuestaObjetivo>(`${this.env}/api/objetivos/${idObjetivo}`,datos,opciones)
        .subscribe(respuesta => {
          if (!respuesta.ok) {
            console.log('Error modificando objetivo:', respuesta);
            reject('Error modificando objetivo');
          }
          resolve(respuesta.objetivo);
        }, (err => {
          console.log('Error conectando con base de datos:', err);
          reject('Error conectando con base de datos');
        }));
    });
  }
  Cerrar_objetivo = (idObjetivo) => {
    const opciones = {
      headers: new HttpHeaders ({
        Authorization: this.apihttpservice.token
      })
    };
    return new Promise((resolve,reject) => {
      this.http.post<TipoRespuestaObjetivo>(`${this.env}/api/objetivos/cerrar/${idObjetivo}`,{},opciones)
        .subscribe(respuesta => {
          if (!respuesta.ok) {
            console.log('Error cerrando objetivo:', respuesta);
            reject('Error cerrando objetivo');
          }
          resolve(respuesta.objetivo);
        }, (err => {
          console.log('Error accediendo a base de datos');
          reject('Error accediendo a base de datos');
        }));
    });
  }

  Cancelar_objetivo = (idObjetivo) => {
    const opciones = {
      headers: new HttpHeaders ({
        Authorization: this.apihttpservice.token
      })
    };
    return new Promise((resolve,reject) => {
      this.http.post<TipoRespuestaObjetivo>(`${this.env}/api/objetivos/cancelar/${idObjetivo}`,{},opciones)
        .subscribe(respuesta => {
          if (!respuesta.ok) {
            console.log('Error cancelando objetivo:', respuesta);
            reject('Error cancelando objetivo');
          }
          resolve(respuesta.objetivo);
        }, (err => {
          console.log('Error accediendo a base de datos');
          reject('Error accediendo a base de datos');
        }));
    });
  }

  Terminar_objetivo = (idObjetivo) => {
    const opciones = {
      headers: new HttpHeaders ({
        Authorization: this.apihttpservice.token
      })
    };
    return new Promise((resolve,reject) => {
      this.http.post<TipoRespuestaObjetivo>(`${this.env}/api/objetivos/terminar/${idObjetivo}`,{},opciones)
        .subscribe(respuesta => {
          if (!respuesta.ok) {
            console.log('Error terminando objetivo:', respuesta);
            reject('Error terminando objetivo');
          }
          resolve(respuesta.objetivo);
        }, (err => {
          console.log('Error accediendo a base de datos');
          reject('Error accediendo a base de datos');
        }));
    });
  }

  Replanificar_objetivo = (idObjetivo, fechaFin) => {
    const opciones = {
      headers: new HttpHeaders ({
        Authorization: this.apihttpservice.token
      })
    };
    return new Promise((resolve,reject) => {
      this.http.post<TipoRespuestaObjetivo>(`${this.env}/api/objetivos/replanificar/${idObjetivo}`,{fechaFin},opciones)
        .subscribe(respuesta => {
          if (!respuesta.ok) {
            console.log('Error replanificando objetivo:', respuesta);
            reject('Error replanificando objetivo');
          }
          resolve(respuesta.objetivo);
        }, (err => {
          console.log('Error accediendo a base de datos');
          reject('Error accediendo a base de datos');
        }));
    });
  }

  Cambiar_nombre_objetivo = (idObjetivo, nombre) => {
    const opciones = {
      headers: new HttpHeaders ({
        Authorization: this.apihttpservice.token
      })
    };
    return new Promise((resolve,reject) => {
      this.http.put<TipoRespuestaObjetivo>(`${this.env}/api/objetivos/${idObjetivo}`,{nombre},opciones)
        .subscribe(respuesta => {
          if (!respuesta.ok) {
            console.log('Error cambiando nombre de  objetivo:', respuesta);
            reject('Error cambiando nombre de  objetivo');
          }
          resolve(respuesta.objetivo);
        }, (err => {
          console.log('Error accediendo a base de datos');
          reject('Error accediendo a base de datos');
        }));
    });
  }

  Crear_incidencia = (incidencia) => {
    const opciones = {
      headers: new HttpHeaders ({
        Authorization: this.apihttpservice.token
      })
    };
    return new Promise ((resolve,reject) => {
      this.http.post<TipoRespuestaIncidencia>(`${this.env}/api/incidencias`,incidencia,opciones)
        .subscribe(respuesta => {
          if (!respuesta.ok) {
            console.log('Error creando la incidencia:', respuesta);
            reject('Error creando la incidencia')
          }
          resolve(respuesta.incidencia);
        },(err=> {
          console.log('Error accediendo a base de datos');
          reject('Error accediendo a base de datos');
        }))
    })
  }



}
