import {AbstractControl, FormControl} from "@angular/forms";
import {Product} from "../model/product";

export function CheckDateOfDay(control: AbstractControl):any {
  const day = control.value;
  const start = new Date(day.importDateProduct);
  const end = new Date(day.exportDateProduct);
  console.log('start:' + start)
  console.log('end:' + end);
  if (end.getTime() - start.getTime() <= 0) {
    return {validDate: true};
  }
  return null;
}
