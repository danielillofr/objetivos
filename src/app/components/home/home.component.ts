import { Component, OnInit } from '@angular/core';
import { ApihttpService } from './../../services/apihttp.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  titulo: String = '';

  constructor(private apihttpservice: ApihttpService) {
    this.titulo = `Usuario: ${apihttpservice.usuarioApp.nombreCompleto}`;
   }

  ngOnInit() {
  }

}
