import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from './category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // o providedIn: 'root' é usado para indicar que a classe deve ser fornecida no nível raiz do aplicativo
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:3000/categories');
  }

  // observable permite observar a resposta do servidor reativamente
  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>('http://localhost:3000/categories', category);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`http://localhost:3000/categories/${category.id}`, category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/categories/${id}`);
  }
}
