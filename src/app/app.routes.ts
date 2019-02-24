import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ListUsersComponent } from './components/list-users/list-users.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home/:idUsuario', component: HomeComponent },
  { path: 'listusers', component: ListUsersComponent },
  { path: '**', component: LoginComponent },

];


export const app_routing = RouterModule.forRoot(routes);
