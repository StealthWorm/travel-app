import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Place } from './place';

@Injectable({
  providedIn: 'root' // o providedIn: 'root' é usado para indicar que a classe deve ser fornecida no nível raiz do aplicativo
})
export class PlaceService {

  constructor(private http: HttpClient) { }

  getPlaces(): Observable<Place[]> {
    return this.http.get<Place[]>('http://localhost:3000/places');
  }

  createPlace(place: Place): Observable<Place> {
    return this.http.post<Place>('http://localhost:3000/places', place);
  }

  getFilteredPlaces(name: string, category: string): Observable<Place[]> {
    let params = new HttpParams();

    if (name) {
      params = params.set('name_like', name);
    }
    if (category) {
      params = params.set('category.name', category);
    }

    return this.http.get<Place[]>("http://localhost:3000/places", {
      params: params
    });
  }
}
