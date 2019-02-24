import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaAFormato'
})
export class FechaAFormatoPipe implements PipeTransform {

  transform(fecha: Date, args?: any): String {

    return null;
  }

}
