import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'labAPor'
})
export class LabAPorPipe implements PipeTransform {

  transform(diasLaborables: number): string {
    diasLaborables = diasLaborables / 261;
    diasLaborables = diasLaborables * 1000;
    diasLaborables = Math.round(diasLaborables);
    diasLaborables = diasLaborables / 10;
    return diasLaborables.toString();
  }

}
