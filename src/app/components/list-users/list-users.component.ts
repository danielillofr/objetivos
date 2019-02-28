import { Component, OnInit } from '@angular/core';
import { ApihttpService } from './../../services/apihttp.service';
import { Router } from '@angular/router';
import { TipoUsuario } from './../../interfaces/usuario.interface';


@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  usuarios: TipoUsuario[] = null;

  constructor(private apihttpservice: ApihttpService, private router: Router) {
    if (!(apihttpservice.logueado)) {
      router.navigate(['/']);
      return;
    }
    if (apihttpservice.usuarioApp.role === 'INGENIERO') {
      router.navigate(['/home', apihttpservice.usuarioApp._id]);
      return;
    }
    apihttpservice.Obtener_usuarios_de_aprobador()
      .then(usuarios => {
        this.usuarios = <TipoUsuario[]>usuarios;
      })
  }




  ngOnInit() {
  }

}
