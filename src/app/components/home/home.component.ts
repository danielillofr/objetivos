import { Component, OnInit } from '@angular/core';
import { ApihttpService } from './../../services/apihttp.service';
import { TipoDatosUsuario, TipoObjetivo } from './../../interfaces/objetivo.interface';
import { ObjetivosService } from './../../services/objetivos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  formularioUsuario: FormGroup;
  titulo: String = '';
  idUsuario: String;
  datosUsuario: TipoDatosUsuario = null;
  constructor(private apihttpservice: ApihttpService,
              private objetivosservice: ObjetivosService,
              private activatedroute: ActivatedRoute, private router: Router) {
    if (!apihttpservice.logueado) {
      router.navigate(['/']);
      return;
    }
    this.formularioUsuario = new FormGroup({
      planificado_dias: new FormControl(''),
      planificado_porcentaje: new FormControl(''),
      porcentaje_conseguido: new FormControl(''),
      fechaPlan: new FormControl(''),
      proyecto_dias : new FormControl(''),
      proyecto_porcentaje: new FormControl(''),
      proyectoVsTotal: new FormControl('')
    })
    activatedroute.params.subscribe(params => {
      this.idUsuario = params.idUsuario;
      objetivosservice.Obtener_datos_usuario(params.idUsuario)
      .then((respuesta) => {
        this.datosUsuario = <TipoDatosUsuario>respuesta;
        this.titulo = `Datos de ${this.datosUsuario.usuario.nombreCompleto}`;
        //Total
        this.formularioUsuario.controls['planificado_dias'].setValue(this.datosUsuario.datos.totales.dias);
        this.formularioUsuario.controls['planificado_porcentaje'].setValue(`${this.datosUsuario.datos.totales.porcentaje}%`);
        let fecha = new Date();
        fecha.setTime(Date.parse(<string>this.datosUsuario.datos.fechaPlan));
        let fechaString = fecha.getDate() + '/' + fecha.getMonth() + '/' + fecha.getFullYear();
        this.formularioUsuario.controls['fechaPlan'].setValue(fechaString);
        this.formularioUsuario.controls['porcentaje_conseguido'].setValue(`${this.datosUsuario.datos.porcentajeConseguido}%`)
        //Proyecto
        this.formularioUsuario.controls['proyecto_dias'].setValue(this.datosUsuario.datos.proyecto.dias);
        this.formularioUsuario.controls['proyecto_porcentaje'].setValue(`${this.datosUsuario.datos.proyecto.porcentaje}%`);
        this.formularioUsuario.controls['proyectoVsTotal'].setValue(`${this.datosUsuario.datos.proyecto.vsTotal}%`);



        })
        .catch(err => {
          alert(err);
        })
    })
  }

  ngOnInit() {
  }

}
