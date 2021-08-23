import {AbstractControl,FormControl} from "@angular/forms";

export function CheckDateOfDay(control: AbstractControl) {
  const day = control.value;
  const start = new Date(day.importDateProduct);
  const end = new Date(day.exportDateProduct);
  console.log('day:' +start)
  if (end.getTime()- start.getTime() <= 0) {
    return {validDate: true};
  }
  return null;
}
