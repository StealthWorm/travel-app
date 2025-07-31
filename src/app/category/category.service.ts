import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from './category';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root' // o providedIn: 'root' é usado para indicar que a classe deve ser fornecida no nível raiz do aplicativo
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.API_URL}/categories`);
  }

  // observable permite observar a resposta do servidor reativamente
  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${environment.API_URL}/categories`, category);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${environment.API_URL}/categories/${category.id}`, category);
  }

  deleteCategory(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.API_URL}/categories/${id}`);
  }
}
