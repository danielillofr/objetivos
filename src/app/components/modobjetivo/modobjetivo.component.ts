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
      conseguido: new FormControl('')
    })

    activatedroute.params.subscribe(params => {
      objetivosservice.Obtener_objetivo_completo(params.idObjetivo)
        .then(respuesta => {
          this.objetivoCompleto = <TipoObjetivoCompleto>respuesta;
          console.log(this.objetivoCompleto);
          this.formularioObjetivo.controls['nombre'].setValue(this.objetivoCompleto.objetivo.nombre);
          this.formularioObjetivo.controls['fechaInicio'].setValue(this.objetivoCompleto.objetivo.fechaInicio);
          this.formularioObjetivo.controls['fechaFin'].setValue(this.objetivoCompleto.objetivo.fechaFin);
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
    console.log(cadena);
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

  ngOnInit() {
  }

}
