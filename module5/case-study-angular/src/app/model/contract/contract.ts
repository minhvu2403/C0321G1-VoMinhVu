import {Customer} from "../customer/customer";
import {Employee} from "../employee/employee";
import {Service} from "../services/service";

export class Contract {
  id: number;
  contractStartDate: string;
  contractEndDate: string ;
  contractDeposit: number;
  contractTotalMoney: number;
  customer: Customer;
  employee: Employee;
  service: Service;
}
