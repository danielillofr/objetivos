import { Component, OnInit, ViewChild, ElementRef, AfterContentInit, AfterContentChecked } from '@angular/core';
import { TipoObjetivoCompleto,TipoObjetivo } from './../../interfaces/objetivo.interface';
import { TipoIncidencia } from './../../interfaces/incidencia.interface';
import { TipoLog } from './../../interfaces/log.interface';
import { ObjetivosService } from './../../services/objetivos.service';
import { ApihttpService } from './../../services/apihttp.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TipoUsuario } from '../../interfaces/usuario.interface';

declare function initDatePicker();



@Component({
  selector: 'app-modobjetivo',
  templateUrl: './modobjetivo.component.html',
  styleUrls: ['./modobjetivo.component.css']
})
export class ModobjetivoComponent implements OnInit, AfterContentChecked {
  @ViewChild('fechaInicio') fechaInicio: ElementRef;
  @ViewChild('fechaFin') fechaFin: ElementRef;

  objetivoCompleto: TipoObjetivoCompleto = null;
  formularioObjetivo: FormGroup;
  idObjetivo: String;
  idUsuario: String;
  usuarioNoIngeniero: Boolean;
  constructor(private apihttpservice: ApihttpService,
              private objetivosservice: ObjetivosService,
              private activatedroute: ActivatedRoute,
              private router: Router) {
    if (!apihttpservice.logueado) {
      router.navigate(['/']);
    }
    this.usuarioNoIngeniero = (apihttpservice.usuarioApp.role != 'INGENIERO');
    this.formularioObjetivo = new FormGroup ({
      nombre: new FormControl(''),
      fechaInicio: new FormControl('', [this.validar_fecha, Validators.pattern('([0-9]+)/([0-9]+)/([0-9]+)')]),
      fechaFin: new FormControl('', [this.validar_fecha, Validators.pattern('([0-9]+)/([0-9]+)/([0-9]+)')]),
      conseguido: new FormControl('', [Validators.required, Validators.pattern('([0-9]+)'), this.Validar_conseguido]),
      comEvaluacion: new FormControl({value: ''})
    })
    
    if(!(this.usuarioNoIngeniero)) {
      this.formularioObjetivo.controls['nombre'].disable();
      this.formularioObjetivo.controls['fechaInicio'].disable();
      this.formularioObjetivo.controls['fechaFin'].disable();
      this.formularioObjetivo.controls['conseguido'].disable();
      this.formularioObjetivo.controls['comEvaluacion'].disable();
    }

    // this.formularioObjetivo.statusChanges.subscribe(status=>{
    //   console.log('Estatus:', status);
    //   console.log(this.formularioObjetivo);

    // })

    activatedroute.params.subscribe(params => {
      this.idObjetivo = params.idObjetivo;
      objetivosservice.Obtener_objetivo_completo(this.idObjetivo)
        .then(respuesta => {
          this.objetivoCompleto = <TipoObjetivoCompleto>respuesta;
          this.idUsuario = this.objetivoCompleto.objetivo.usuario;
          this.formularioObjetivo.controls['nombre'].setValue(this.objetivoCompleto.objetivo.nombre);

          this.formularioObjetivo.controls['fechaInicio'].setValue(this.Formatear_fecha(this.objetivoCompleto.objetivo.fechaInicio));
          this.formularioObjetivo.controls['fechaFin'].setValue(this.Formatear_fecha(this.objetivoCompleto.objetivo.fechaFin));
          this.formularioObjetivo.controls['conseguido'].setValue(this.objetivoCompleto.objetivo.conseguido);
          this.formularioObjetivo.controls['comEvaluacion'].setValue(this.objetivoCompleto.objetivo.comEvaluacion);
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
    const comEvaluacion = this.formularioObjetivo.controls['comEvaluacion'].value;
    this.objetivosservice.Modificar_conseguido(this.idObjetivo, {conseguido, comEvaluacion})
      .then(respuesta => {
        // alert(`Conseguido modificado correctamente a ${conseguido}%`);
        this.router.navigate(['/home', this.idUsuario]);
      })
      .catch(err => {
        alert(err)
      })
  }

  Cerrar_objetivo = () => {
    this.objetivosservice.Cerrar_objetivo(this.idObjetivo)
      .then(respuesta => {
        const objetivoRespuesta = <TipoObjetivo>respuesta;
        // alert(`Objetivo cerrado, nueva fecha de fin:${this.Formatear_fecha(objetivoRespuesta.fechaFin)}`)
        this.router.navigate(['home',this.idUsuario]);
      })
      .catch(err => {
        alert(err)
      })
  }

  Cancelar_objetivo = () => {
    this.objetivosservice.Cancelar_objetivo(this.idObjetivo)
      .then(respuesta => {
        const objetivoRespuesta = <TipoObjetivo>respuesta;
        // alert(`Objetivo cerrado, nueva fecha de fin:${this.Formatear_fecha(objetivoRespuesta.fechaFin)}`)
        this.router.navigate(['home',this.idUsuario]);
      })
      .catch(err => {
        alert(err)
      })
  }

  Terminar_objetivo = () => {
    this.objetivosservice.Terminar_objetivo(this.idObjetivo)
      .then(respuesta => {
        const objetivoRespuesta = <TipoObjetivo>respuesta;
        // alert('Objetivo terminado correctamente');
        this.router.navigate(['home',this.idUsuario]);
      })
      .catch(err => {
        alert(err)
      })
  }
  Replanificar_objetivo = () => {
    this.formularioObjetivo.controls['fechaInicio'].setValue(this.fechaInicio.nativeElement.value);
    this.formularioObjetivo.controls['fechaFin'].setValue(this.fechaFin.nativeElement.value);    
    this.objetivosservice.Replanificar_objetivo(this.idObjetivo, this.Intercambiar_fecha(this.formularioObjetivo.controls['fechaInicio'].value), this.Intercambiar_fecha(this.formularioObjetivo.controls['fechaFin'].value))
      .then(respuesta => {
        const objetivoRespuesta = <TipoObjetivo>respuesta;
        // alert(`Objetivo replanificado, nueva fecha de fin:${this.Formatear_fecha(objetivoRespuesta.fechaFin)}`)
        this.router.navigate(['home',this.idUsuario]);
      })
      .catch(err => {
        alert(err)
      })
  }

  Cambiar_nombre_objetivo = () => {
    this.objetivosservice.Cambiar_nombre_objetivo(this.idObjetivo, this.formularioObjetivo.controls['nombre'].value)
      .then(respuesta => {
        const objetivoRespuesta = <TipoObjetivo>respuesta;
        // alert(`Objetivo cambiado nombre correctamente`);
        this.router.navigate(['home',this.idUsuario]);
      })
      .catch(err => {
        alert(err)
      })    
  }

  Eliminar_objetivo = () => {
    if (!(confirm('Estas seguro?'))) {
      return;
    }
    this.objetivosservice.Eliminar_objetivo(this.idObjetivo)
      .then(respuesta => {
        this.router.navigate(['home',this.idUsuario]);
      })
      .catch(err => {
        alert(err)
      })
  }


  ngOnInit() {
  }

  ngAfterContentChecked() {
    console.log("Renderizado");
    initDatePicker();
  }


}
