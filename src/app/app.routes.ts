import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { NuevoObjetivoComponent } from './components/nuevo-objetivo/nuevo-objetivo.component';
import { ModobjetivoComponent } from './components/modobjetivo/modobjetivo.component';
import { NuevaIncidenciaComponent } from './components/nueva-incidencia/nueva-incidencia.component';





const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home/:idUsuario', component: HomeComponent },
  { path: 'listusers', component: ListUsersComponent },
  { path: 'nuevoObjetivo/:idUsuario', component: NuevoObjetivoComponent },
  { path: 'modObjetivo/:idObjetivo', component: ModobjetivoComponent },
  { path: 'nuevaIncidencia/:idObjetivo', component: NuevaIncidenciaComponent },
  { path: '**', component: LoginComponent },

];


export const app_routing = RouterModule.forRoot(routes);
