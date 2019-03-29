import { Component, OnInit } from '@angular/core';
import { TipoIncidencia } from './../../interfaces/incidencia.interface';
import { ObjetivosService } from './../../services/objetivos.service';
import { ApihttpService } from './../../services/apihttp.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { formControlBinding } from '@angular/forms/src/directives/ng_model';



@Component({
  selector: 'app-nueva-incidencia',
  templateUrl: './nueva-incidencia.component.html',
  styleUrls: ['./nueva-incidencia.component.css']
})
export class NuevaIncidenciaComponent implements OnInit {
formularioIncidencia: FormGroup;
idObjetivo: string;
  constructor(private apihttpservice: ApihttpService,
              private activatedroute: ActivatedRoute,
              private router: Router,
              private objetivoservice: ObjetivosService) {
    if (!apihttpservice.logueado) {
      router.navigate(['/']);
      return;
    }
    this.formularioIncidencia = new FormGroup({
      dias: new FormControl('', [Validators.required, Validators.pattern('([0-9])+'),this.Validar_dias]),
      motivo: new FormControl('', [Validators.required, Validators.minLength(3)]),
      ausencia: new FormControl(false, Validators.required)
    });
    this.formularioIncidencia.statusChanges.subscribe(status=>{
      console.log(this.formularioIncidencia);
    })

    activatedroute.params.subscribe(params => {
      this.idObjetivo = params.idObjetivo;
    })


  }

  Validar_dias = (c: FormControl) => {
    let valor:number = Number(c.value);
    if ((valor < 0) || (valor > 261)) {
      return {
        validateDias:{
          valid: false
        }
      }
    }
    return null;
  }
  Crear_incidencia = () => {
    let incidencia = {
      objetivo: this.idObjetivo,
      dias: this.formularioIncidencia.controls['dias'].value,
      motivo: this.formularioIncidencia.controls['motivo'].value,
      ausencia: this.formularioIncidencia.controls['ausencia'].value
    }
    this.objetivoservice.Crear_incidencia(incidencia)
      .then(respuesta => {
        this.router.navigate(['/modObjetivo', this.idObjetivo]);
      })
      .catch(err => {
        alert(err);
      })
  }
  ngOnInit() {
  }

}
