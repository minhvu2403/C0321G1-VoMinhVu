import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product";
import {Category} from "../model/category";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {
  }
  getAllProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(API_URL + '/products');
  }

  saveProduct(product): Observable<Product> {
    return this.http.post<Product>(API_URL + '/products', product);
  }

  findById(id: number): Observable<Product> {
    return this.http.get<Product>(`${API_URL}/products/${id}`);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.patch<Product>(`${API_URL}/products/${id}`, product);
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${API_URL}/products/${id}`);
  }

  getListCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(API_URL + '/category');
  }
}
