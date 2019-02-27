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
    //Comprobamos que estamos logueado, y si no, al /
    if (!apihttpservice.logueado) {
      router.navigate(['/']);
      return;
    }
    //Creamos el formulario con todos los campos
    this.formularioUsuario = new FormGroup({
      planificado_dias: new FormControl({value:'', disabled: true}),
      planificado_porcentaje: new FormControl({value:'',disabled: true}),
      porcentaje_conseguido: new FormControl({value: '', disabled: true}),
      porcentaje_total: new FormControl({value:'',disabled:true}),
      fechaPlan: new FormControl({value:'', disabled: true}),
      proyecto_dias : new FormControl({value:'', disabled: true}),
      proyecto_porcentaje: new FormControl({value: '', disabled: true}),
      proyectoVsTotal: new FormControl({value: '', disabled: true}),
      incidencia_dias : new FormControl({value: '', disabled: true}),
      incidencia_porcentaje: new FormControl({value: '', disabled: true}),
      incidenciaVsTotal: new FormControl({value: '', disabled: true})
    })
    //Obtenemos el id del usuario desde la url
    activatedroute.params.subscribe(params => {
      this.idUsuario = params.idUsuario;
      //Obtenemos los datos de usuario desde la estructura
      objetivosservice.Obtener_datos_usuario(params.idUsuario)
      .then((respuesta) => {
        this.datosUsuario = <TipoDatosUsuario>respuesta;
        this.titulo = `Datos de ${this.datosUsuario.usuario.nombreCompleto}`;
        //Total
        this.formularioUsuario.controls['planificado_dias'].setValue(this.datosUsuario.datos.totales.dias);
        this.formularioUsuario.controls['planificado_porcentaje'].setValue(`${this.datosUsuario.datos.totales.porcentaje}%`);
        let fecha = new Date();
        fecha.setTime(Date.parse(<string>this.datosUsuario.datos.fechaPlan));
        let fechaString = fecha.getDate() + '/' + (fecha.getMonth() + 1) + '/' + fecha.getFullYear();
        this.formularioUsuario.controls['fechaPlan'].setValue(fechaString);
        this.formularioUsuario.controls['porcentaje_conseguido'].setValue(`${this.datosUsuario.datos.porcentajeConseguido}%`)
        let porcentajeTotal: number = <number>this.datosUsuario.datos.porcentajeConseguido;
        porcentajeTotal += <number>this.datosUsuario.datos.incidencias.porcentaje;
        this.formularioUsuario.controls['porcentaje_total'].setValue(`${porcentajeTotal}%`)
        //Proyecto
        this.formularioUsuario.controls['proyecto_dias'].setValue(this.datosUsuario.datos.proyecto.dias);
        this.formularioUsuario.controls['proyecto_porcentaje'].setValue(`${this.datosUsuario.datos.proyecto.porcentaje}%`);
        this.formularioUsuario.controls['proyectoVsTotal'].setValue(`${this.datosUsuario.datos.proyecto.vsTotal}%`);
        //Incidencia
        this.formularioUsuario.controls['incidencia_dias'].setValue(this.datosUsuario.datos.incidencias.dias);
        this.formularioUsuario.controls['incidencia_porcentaje'].setValue(`${this.datosUsuario.datos.incidencias.porcentaje}%`);
        this.formularioUsuario.controls['incidenciaVsTotal'].setValue(`${this.datosUsuario.datos.incidencias.vsTotal}%`);



        })
        .catch(err => {
          alert(err);
        })
    })
  }

  ngOnInit() {
  }

}
