import { Component, Input } from '@angular/core';
import { saveAs } from 'file-saver';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.css']
})
export class  MomentFormComponent {
  inputNomePrestador: string = '';
  inputCpfCnpjPrestador: string = '';
  inputIncMunicPrest: string = '';
  inputNomeTomador: string = '';
  inputCpfCnpjTomador: string = '';
  inputIncMunicTomador: string = '';
  inputNfseNum: string = '';
  inputNfseDados: string = '';
  inputNfseValue: string = '';
  inputDesc: string = '';
  inputDescValue: string = '';
  inputDescQuant: string = '';
  inputDescTotalServ: string = '';
  inputImp: string = '';
  inputImpAliquota: string = '';
  inputImpValue: string = '';
  inputObv: string = '';

  constructor() {
    this.inputNomePrestador = "";
    this.inputCpfCnpjPrestador = "";
    this.inputIncMunicPrest = "";
    this.inputNomeTomador = "";
    this.inputCpfCnpjTomador = "";
    this.inputIncMunicTomador = "";
    this.inputNfseNum = "";
    this.inputNfseDados = "";
    this.inputNfseValue = "";
    this.inputDesc = "";
    this.inputDescValue = "";
    this.inputDescQuant = "";
    this.inputDescTotalServ = "";
    this.inputImp = "";
    this.inputImpAliquota = "";
    this.inputImpValue = "";
    this.inputObv = "";
  }
  gerarXML() {
    // Lógica para gerar o conteúdo XML
    let xmlContent = `
      <xml>
      Identificação do prestador de serviço
        Nome/Razão social do prestador de serviço:${this.inputNomePrestador}
        CPF/CNPJ do prestador de serviço:${this.inputCpfCnpjPrestador}
        inputIncMunicPrest:${this.inputIncMunicPrest}
      Identificação do Tomador de serviço  
        Nome/Razão social do tomador de serviço:${this.inputNomeTomador}
        CPF/CNPJ do tomador de serviço:${this.inputCpfCnpjTomador}
        Inscrição social Municipal do tomador de serviço (se houver):${this.inputIncMunicTomador}
      Dados da NFSe
        Número da NFS-e:${this.inputNfseNum}
        Data de emissão da NFS-e:${this.inputNfseDados}
        Valor Total da NFS-e:${this.inputNfseValue}
      Descrição do serviço Prestado
        Descrição detalhada do serviço prestado:${this.inputDesc}
        Valor unitário do serviço:${this.inputDescValue}
        Quantidade de unidades de serviço:${this.inputDescQuant}
        Valor total de serviço:${this.inputDescTotalServ}
      Impostos
        ISS (Imposto Sobre Serviço):${this.inputImp}
        Aliquota do ISS:${this.inputImpAliquota}
        Valor do ISS a ser retido/pago:${this.inputImpValue}
      Observações
        Observações:${this.inputObv}
        <!-- outros campos de entrada -->
      </xml>
    `;

    // Lógica para gerar o conteúdo XML
  

    // Crie um objeto Blob a partir do conteúdo XML
    const blob = new Blob([xmlContent], { type: 'application/xml' });

    // Gere um URL seguro para o objeto Blob
    const url = URL.createObjectURL(blob);

    // Salve o arquivo XML usando a biblioteca file-saver
    saveAs(url, 'arquivo.xml');

    // Revogue o URL seguro para liberar recursos
    URL.revokeObjectURL(url);
  }
}