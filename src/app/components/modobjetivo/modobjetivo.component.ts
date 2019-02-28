import { Component, OnInit } from '@angular/core';
import { TipoObjetivoCompleto,TipoObjetivo } from './../../interfaces/objetivo.interface';
import { TipoIncidencia } from './../../interfaces/incidencia.interface';
import { TipoLog } from './../../interfaces/log.interface';
import { ObjetivosService } from './../../services/objetivos.service';
import { ApihttpService } from './../../services/apihttp.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';





@Component({
  selector: 'app-modobjetivo',
  templateUrl: './modobjetivo.component.html',
  styleUrls: ['./modobjetivo.component.css']
})
export class ModobjetivoComponent implements OnInit {
  objetivoCompleto: TipoObjetivoCompleto = null;
  formularioObjetivo: FormGroup;
  idObjetivo: String;
  idUsuario: String;
  constructor(private apihttpservice: ApihttpService,
              private objetivosservice: ObjetivosService,
              private activatedroute: ActivatedRoute,
              private router: Router) {
    if (!apihttpservice.logueado) {
      router.navigate(['/']);
    }

    this.formularioObjetivo = new FormGroup ({
      nombre: new FormControl({value: '', disabled: true}),
      fechaInicio: new FormControl({value: '', disabled: true}),
      fechaFin: new FormControl('', [this.validar_fecha, Validators.pattern('([0-9]+)/([0-9]+)/([0-9]+)')]),
      conseguido: new FormControl('', [Validators.required, Validators.pattern('([0-9]+)'), this.Validar_conseguido])
    })


    // this.formularioObjetivo.statusChanges.subscribe(status=>{
    //   console.log('Estatus:', status);
    //   console.log(this.formularioObjetivo);

    // })

    activatedroute.params.subscribe(params => {
      this.idObjetivo = params.idObjetivo;
      this.idUsuario = params.idUsuario;
      objetivosservice.Obtener_objetivo_completo(this.idObjetivo)
        .then(respuesta => {
          console.log('Respuesta:', respuesta);
          this.objetivoCompleto = <TipoObjetivoCompleto>respuesta;
          this.formularioObjetivo.controls['nombre'].setValue(this.objetivoCompleto.objetivo.nombre);

          this.formularioObjetivo.controls['fechaInicio'].setValue(this.Formatear_fecha(this.objetivoCompleto.objetivo.fechaInicio));
          this.formularioObjetivo.controls['fechaFin'].setValue(this.Formatear_fecha(this.objetivoCompleto.objetivo.fechaFin));
          this.formularioObjetivo.controls['conseguido'].setValue(this.objetivoCompleto.objetivo.conseguido);
        })
        .catch(err => {
          alert(err);
        })
    })
  }

  Intercambiar_fecha = (fechaEuropa: string) => {
    let b = fechaEuropa.split('/');
    let fechaBD: string = b[1] + '/' + b[0] + '/' + b[2];
    return fechaBD;
  }
  validar_fecha = (c: FormControl) => {
    let cadena:string = c.value;
    const partes = cadena.split('/');
    if (partes.length < 3) {
      return {
        validateDate: {
          valid: false
        }
      }
    }
    const dia = Number(partes[0]);
    const mes = Number(partes[1]);
    const ano = Number(partes[2]);
    if ((dia < 1) || (dia > 31) || (mes < 1) || (mes > 12) || (ano != 2019)){
      return {
        validateDate: {
          valid: false
        }
      }
    }
    return null;

  }

  Validar_conseguido = (c: FormControl) => {
    const numero = Number(c.value);
    if ((numero < 0) || (numero > 100)) {
      return {
        validateConseguido: {
          valid: false
        }
      }
    }
    return null;
  }

  Formatear_fecha = (fechaIn: Date) => {
    let fecha = new Date();
    fecha.setTime(Date.parse(fechaIn.toString()));
    let fechaString = fecha.getDate() + '/' + (fecha.getMonth() + 1) + '/' + fecha.getFullYear();
    return fechaString;

  }

  Modificar_conseguido = () => {
    const conseguido = this.formularioObjetivo.controls['conseguido'].value;
    this.objetivosservice.Modificar_conseguido(this.idObjetivo, conseguido)
      .then(respuesta => {
        alert(`Conseguido modificado correctamente a ${conseguido}%`);
        this.router.navigate(['/home', this.idUsuario]);
      })
      .catch(err => {
        alert(err)
      })
  }

  Cerrar_objetivo = () => {
    this.objetivosservice.Cerrar_objetivo(this.idObjetivo)
      .then(respuesta => {
        console.log(respuesta);
        const objetivoRespuesta = <TipoObjetivo>respuesta;
        alert(`Objetivo cerrado, nueva fecha de fin:${this.Formatear_fecha(objetivoRespuesta.fechaFin)}`)
        this.router.navigate(['home',this.idUsuario]);
      })
      .catch(err => {
        alert(err)
      })
  }

  Cancelar_objetivo = () => {
    this.objetivosservice.Cancelar_objetivo(this.idObjetivo)
      .then(respuesta => {
        console.log(respuesta);
        const objetivoRespuesta = <TipoObjetivo>respuesta;
        alert(`Objetivo cerrado, nueva fecha de fin:${this.Formatear_fecha(objetivoRespuesta.fechaFin)}`)
        this.router.navigate(['home',this.idUsuario]);
      })
      .catch(err => {
        alert(err)
      })
  }

  Replanificar_objetivo = () => {
    this.objetivosservice.Replanificar_objetivo(this.idObjetivo, this.Intercambiar_fecha(this.formularioObjetivo.controls['fechaFin'].value))
      .then(respuesta => {
        const objetivoRespuesta = <TipoObjetivo>respuesta;
        alert(`Objetivo replanificado, nueva fecha de fin:${this.Formatear_fecha(objetivoRespuesta.fechaFin)}`)
        this.router.navigate(['home',this.idUsuario]);
      })
      .catch(err => {
        alert(err)
      })
  }

  ngOnInit() {
  }

}
