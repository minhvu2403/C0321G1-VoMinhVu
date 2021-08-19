import {RentType} from "./rent-type";

export class Service {
  id: number;
  serviceCode: string;
  serviceName: string;
  serviceArea: number;
  serviceCost: number;
  serviceMaxPeople: number;
  numberOfFloor: number;
  serviceStatus: string;
  rentType: RentType;

}
