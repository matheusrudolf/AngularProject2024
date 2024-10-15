import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControleService {
  private baseUrl: string = 'http://100.0.67.32:8080/'

  constructor(private http: HttpClient) { }

  public getDados(path: string): Observable<any> {
    return this.http.get<any>(`./assets/jsons/${path}.json`);
  }

}
