import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class NfseService {
  private apiUrl = 'https://viacep.com.br/ws/01001000/json/';

  constructor(private http: HttpClient) {}

  public getData(): Observable<any> {
    const url = `${this.apiUrl}`;
    const response = this.http.get(url);
    console.log(response);
    return response;
  }
}