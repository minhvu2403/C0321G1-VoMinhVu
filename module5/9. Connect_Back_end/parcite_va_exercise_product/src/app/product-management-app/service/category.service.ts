import {Injectable} from '@angular/core';
import {Category} from '../model/category';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  // categories: Category[] = [{
  //     id: 1,
  //     name: 'IPhone'
  //   }, {
  //     id: 2,
  //     name: 'Samsung',
  //   }, {
  //     id: 3,
  //     name: 'LG',
  //   }];


  constructor(private  http: HttpClient) {
  }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(API_URL + '/category');
  }

  saveCategory(category): Observable<Category> {
    return this.http.post<Category>(API_URL + '/category', category);

  }

  updateCategory(id: number, category: Category): Observable<Category> {
    return this.http.put<Category>(`${API_URL}/category/${id}`, category);
  }

  findById(id: number) {
    return this.http.get<Category>(`${API_URL}/category/${id}`);

  }

  deleteCategory(id: number): Observable<Category> {
    return this.http.delete<Category>(`${API_URL}/category/${id}`);

  }
}
