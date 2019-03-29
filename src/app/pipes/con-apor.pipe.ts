import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'conAPor'
})
export class ConAPorPipe implements PipeTransform {

  transform(conseguido: number, datos:any): string {
    datos.diasProyecto = datos.diasProyecto / datos.diasAnual;
    conseguido = conseguido * datos.diasProyecto;
    conseguido = conseguido * 10;
    conseguido = Math.round(conseguido);
    conseguido = conseguido / 10;
    return conseguido.toString();
  }

}
