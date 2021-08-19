import {CustomerType} from "./customer-type";

export class Customer {
  id: number;
  customerCode: string;
  customerName: string;
  dateOfBirth: string;
  customerCard: string;
  customerPhone: string;
  customerEmail: string;
  customerAddress: string;
  customerType: CustomerType;
}

// export interface Customer {
//   id: number;
//   customerCode: string;
//   customerName: string;
//   dateOfBirth: string;
//   customerCard: string;
//   customerPhone: string;
//   customerEmail: string;
//   customerAddress: string;
//   customerType: CustomerType;
// }
