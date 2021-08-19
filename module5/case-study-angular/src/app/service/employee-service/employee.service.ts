import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "../../model/employee/employee";
import {Division} from "../../model/employee/division";
import {EducationDegree} from "../../model/employee/education-degree";
import {Positions} from "../../model/employee/positions";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private  http: HttpClient) {
  }

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(API_URL + '/employees');
  }

  saveEmployee(employee): Observable<Employee> {
    return this.http.post<Employee>(API_URL + '/employees', employee);
  }

  findById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${API_URL}/employees/${id}`);
  }

  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${API_URL}/employees/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<Employee> {
    return this.http.delete<Employee>(`${API_URL}/employees/${id}`);
  }

  getListDivision(): Observable<Division[]> {
    return this.http.get<Division[]>(API_URL + '/divisions');
  }

  getListPosition(): Observable<Positions[]> {
    return this.http.get<Positions[]>(API_URL + '/positions');
  }

  getListEducationDegree(): Observable<EducationDegree[]> {
    return this.http.get<EducationDegree[]>(API_URL + '/education-degrees');
  }
}
