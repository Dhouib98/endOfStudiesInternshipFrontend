import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchProductService {
  private apiUrl = 'http://127.0.0.1:8000/backend/searchProducts/';

  constructor(private http: HttpClient) { }

  // Method to search products by name
  searchProduct(nom: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${nom}/`);
  }
}
