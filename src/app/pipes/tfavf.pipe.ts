import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tfavf'
})
export class TfavfPipe implements PipeTransform {

  transform(value: Boolean): String {
    if (value) {
      return 'SI';
    }
    return 'NO';
  }

}
