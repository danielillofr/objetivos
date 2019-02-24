import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'conAPor'
})
export class ConAPorPipe implements PipeTransform {

  transform(conseguido: number, diasProyecto: number): string {
    diasProyecto = diasProyecto / 261;
    conseguido = conseguido * diasProyecto;
    conseguido = conseguido * 10;
    conseguido = Math.round(conseguido);
    conseguido = conseguido / 10;
    return conseguido.toString();
  }

}
