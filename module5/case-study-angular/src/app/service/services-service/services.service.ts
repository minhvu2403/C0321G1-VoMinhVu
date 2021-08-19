import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Service} from "../../model/services/service";
import {RentType} from "../../model/services/rent-type";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private  http: HttpClient) {
  }

  getAll(): Observable<Service[]> {
    return this.http.get<Service[]>(API_URL + '/services');
  }

  saveService(service): Observable<Service> {
    return this.http.post<Service>(API_URL + '/services', service);
  }

  findById(id: number): Observable<Service> {
    return this.http.get<Service>(`${API_URL}/services/${id}`);
  }

  updateService(id: number, service: Service): Observable<Service> {
    return this.http.put<Service>(`${API_URL}/services/${id}`, service);
  }

  deleteService(id: number): Observable<Service> {
    return this.http.delete<Service>(`${API_URL}/services/${id}`);
  }

  getListRentType(): Observable<RentType[]> {
    return this.http.get<RentType[]>(API_URL + '/rent-types');
  }
}
