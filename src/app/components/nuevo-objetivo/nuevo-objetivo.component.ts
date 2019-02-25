import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApihttpService } from './../../services/apihttp.service';
import { ObjetivosService } from './../../services/objetivos.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { validateConfig } from '@angular/router/src/config';
import { TipoObjetivo } from '../../interfaces/objetivo.interface';



@Component({
  selector: 'app-nuevo-objetivo',
  templateUrl: './nuevo-objetivo.component.html',
  styleUrls: ['./nuevo-objetivo.component.css']
})
export class NuevoObjetivoComponent implements OnInit {
  idUsuario: string;
  formularioObjetivo: FormGroup;
  constructor(private activatedroute: ActivatedRoute,
              private router: Router,
              private apihttpservice: ApihttpService,
              private objetivoservice: ObjetivosService) {
    if (!apihttpservice.logueado) {
      router.navigate(['/']);
      return;
    }
    this.formularioObjetivo = new FormGroup ({
      nombre: new FormControl('', [Validators.minLength(3), Validators.required]),
      fechaInicio: new FormControl('1/1/2019'),
      fechaFin: new FormControl('1/1/2019'),
      conseguido: new FormControl('0')
    })
    activatedroute.params.subscribe(params => {
      this.idUsuario = params.idUsuario;
      console.log('New goal for:', this.idUsuario);
      // let a: string = '2/5/2010';
      // let b = a.split('/');
      // console.log(b);
      // a = b[1] + '/' + b[0] + '/' + b[2];
      // console.log(a);
      // let fecha: Date = new Date();
      // fecha.setTime(Date.parse(a));
      // alert('Dia:' + fecha.getDate() + '/' + (fecha.getMonth() + 1) + '/' + fecha.getFullYear());
    })
   }

   Intercambiar_fecha = (fechaEuropa: string) => {
      let b = fechaEuropa.split('/');
      let fechaBD: string = b[1] + '/' + b[0] + '/' + b[2];
      return fechaBD;
    }

   Crear_objetivo = () => {
     console.log('Creando objetivo');
     let objetivoCrear = {
      usuario: this.idUsuario,
      nombre: this.formularioObjetivo.controls['nombre'].value,
      fechaInicio: this.Intercambiar_fecha(this.formularioObjetivo.controls['fechaInicio'].value),
      fechaFin: this.Intercambiar_fecha(this.formularioObjetivo.controls['fechaFin'].value)
    }
    this.objetivoservice.Crear_objetivo(objetivoCrear)
      .then(resultado => {
        console.log('Objetivo creado');
        this.router.navigate(['/']);
      })
      .catch(err => {
        alert('Error creando el objetivo');
      })
   }

  ngOnInit() {
  }

}
