import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../../model/customer/customer";
import {CustomerType} from "../../model/customer/customer-type";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private  http: HttpClient) {
  }

  getAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(API_URL + '/customers');
  }

  saveCustomer(customer): Observable<Customer> {
    return this.http.post<Customer>(API_URL + '/customers', customer);
  }

  findById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${API_URL}/customers/${id}`);
  }

  updateCustomer(id: number, customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${API_URL}/customers/${id}`, customer);
  }

  deleteCustomer(id: number): Observable<Customer> {
    return this.http.delete<Customer>(`${API_URL}/customers/${id}`);
  }

  getCustomerType(): Observable<CustomerType[]> {
    return this.http.get<CustomerType[]>(API_URL + '/customer-types');
  }

  searchByName(customerName: string, startDate: string, endDate: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(API_URL + '/customers?customerName_like=' + customerName + '&dateOfBirth_gte=' + startDate + '&dateOfBirth_lte=' + endDate);
  }
}

