import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Place } from './place';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root' // o providedIn: 'root' é usado para indicar que a classe deve ser fornecida no nível raiz do aplicativo
})
export class PlaceService {

  constructor(private http: HttpClient) { }

  getPlaces(): Observable<Place[]> {
    return this.http.get<Place[]>(`${environment.API_URL}/places`);
  }

  createPlace(place: Place): Observable<Place> {
    return this.http.post<Place>(`${environment.API_URL}/places`, place);
  }

  getFilteredPlaces(name: string, category: string): Observable<Place[]> {
    let params = new HttpParams();

    if (name) {
      params = params.set('name_like', name);
    }
    if (category) {
      params = params.set('category.name', category);
    }

    return this.http.get<Place[]>(`${environment.API_URL}/places`, {
      params: params
    });
  }
}
