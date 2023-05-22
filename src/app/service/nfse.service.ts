import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class NfseService {
  private apiUrl = 'https://localhost:7063/Nfse';

  constructor(private http: HttpClient) {}

  public getData(): Observable<any> {
    const url = `${this.apiUrl}/getNfse` ;
    const response = this.http.get(url);
    console.log(response);
    return response;
  }

  public getDataByCnpj(cnpj: any): Observable<any> {
    const url = `${this.apiUrl}/getCnpj?cpf_cnpj_prestador_servico=${cnpj}`;
    const response = this.http.get(url);
    console.log(response);
    return response;
  }

  public postData(modelNfse: any): Observable<any> {
    const url = `${this.apiUrl}/CreateNfse`;
    return this.http.post(url, modelNfse);
  }

}