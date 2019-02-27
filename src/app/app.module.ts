import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { HttpClientModule } from '@angular/common/http';


import { app_routing } from './app.routes';
import { HomeComponent } from './components/home/home.component';
import { ListUsersComponent } from './components/list-users/list-users.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FechaAFormatoPipe } from './pipes/fecha-aformato.pipe';
import { LabAPorPipe } from './pipes/lab-apor.pipe';
import { ConAPorPipe } from './pipes/con-apor.pipe';
import { NuevoObjetivoComponent } from './components/nuevo-objetivo/nuevo-objetivo.component';
import { ModobjetivoComponent } from './components/modobjetivo/modobjetivo.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ListUsersComponent,
    FechaAFormatoPipe,
    LabAPorPipe,
    ConAPorPipe,
    NuevoObjetivoComponent,
    ModobjetivoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    app_routing,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
