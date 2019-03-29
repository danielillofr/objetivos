import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'labAPor'
})
export class LabAPorPipe implements PipeTransform {

  transform(diasLaborables: number, diasAnual: number): string {
    diasLaborables = diasLaborables / diasAnual;
    diasLaborables = diasLaborables * 1000;
    diasLaborables = Math.round(diasLaborables);
    diasLaborables = diasLaborables / 10;
    return diasLaborables.toString();
  }

}
