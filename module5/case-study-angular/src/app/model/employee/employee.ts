import {Division} from "./division";
import {EducationDegree} from "./education-degree";
import {Positions} from "./positions";

export class Employee {
  id: number;
  employeeName: string;
  employeeBirthday: string;
  employeeCard: string;
  employeeSalary: number;
  employeePhone: string;
  employeeEmail: string;
  employeeAddress: string;
  division: Division;
  educationDegree: EducationDegree;
  position: Positions;
}
