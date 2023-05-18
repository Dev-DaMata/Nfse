import { Component, OnInit } from '@angular/core';
import { NfseService } from '../../service/nfse.service';

@Component({
  selector: 'app-first-component',
  templateUrl: './first-component.component.html',
  styleUrls: ['./first-component.component.css']
})
export class FirstComponentComponent implements OnInit {
  public data: any; // Certifique-se de ter essa declaração da propriedade data
  name = "Guilherme";
  constructor(private nfseService: NfseService) {}

  ngOnInit() {
    this.getDataFromApi();
  }

  getDataFromApi() {
    this.nfseService.getData().subscribe(
      data => {
        this.data = data;
        console.log(this.data); // Faça algo com os dados da API
      },
      error => {
        console.error(error); // Trate qualquer erro de requisição
      }
    );
  }
}


//Dados do template: para chamar o valor de variaveis no front use {{o nome da variavel}} * concatene com -
