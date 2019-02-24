import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApihttpService } from './../../services/apihttp.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { validateConfig } from '@angular/router/src/config';



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
              private apihttpservice: ApihttpService) {
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

  ngOnInit() {
  }

}
