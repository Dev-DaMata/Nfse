import { Component, Input } from '@angular/core';
import { saveAs } from 'file-saver';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { NfseService } from '../../service/nfse.service';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.css']
})
export class  MomentFormComponent {
  // Objeto nota fiscal 
  // TODO: Exportar isso para um arquivo de modelo e importar nessa pagina
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

  // Parametro de busca
  inputBuscaCnpj: string = '';

  public data: any;
  constructor(private nfseService: NfseService) {
    // Objeto nota fiscal 
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

    // Parametro de busca
    this.inputBuscaCnpj = "";
    
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
  };

  gerarXML() {
    this.nfseService.getDataByCnpj(this.inputBuscaCnpj).subscribe((response) => {
      // Modelando template da nota fiscal
      console.log(response);
      let xmlContent = `
      <xml>
        <emit>
          <CNPJ>${response.cpf_cnpj_prestador_servico}</CNPJ>
          <xNome>${response.nome_prestador_servico}</xNome>
          <xFant>${response.inscricao_prestador_servico}</xFant>
        </emit>
        <dest>  
          <CNPJ>${response.cpf_cnpj_tomador_servico}</CNPJ>
          <xNome>${response.nome_tomador_servico}</xNome>
          <xFant>${response.inscricao_tomador_servico}</xFant>
        </dest>
        <Dados da NFSe>
          <verProc>${response.numero_nfse}</verProc>
          <dEmi>${response.data_emissao_nfse}</dEmi>
          <indPag>${response.valor_total_nfse}</indPag>
        </Dados da NFSe>
        <Descrição do serviço Prestado>
          <Descrição detalhada do serviço prestado>${response.descricao_servico_prestado}</Descrição detalhada do serviço prestado>
          <Valor unitário do serviço>${response.valor_unitario_servico}</Valor unitário do serviço>
          <Quantidade de unidades de serviço>${response.quantidade_unidades_servico}</Quantidade de unidades de serviço>
          <Valor total de serviço>${response.valor_total_servico}</Valor total de serviço>
        </Descrição do serviço Prestado>
        <Impostos>
          <ISS (Imposto Sobre Serviço)>${response.iss}</ISS (Imposto Sobre Serviço)>
          <Aliquota do ISS>${response.aliquota_iss}</Aliquota do ISS>
          <Valor do ISS a ser retido/pago>${response.valor_iss_pago}</Valor do ISS a ser retido/pago>
        </Impostos>
        <Observações>
          <Observações>${response.observacoes}</Observações>
        </Observações>
          
      </xml>
    `;
    // Crie um objeto Blob a partir do conteúdo XML
    const blob = new Blob([xmlContent], { type: 'application/xml' });
    // Gere um URL seguro para o objeto Blob
    const url = URL.createObjectURL(blob);
    // Salve o arquivo XML usando a biblioteca file-saver
    saveAs(url, 'arquivo.xml');
    // Revogue o URL seguro para liberar recursos
    URL.revokeObjectURL(url);
    });
  }

  // Criar registro no banco do servico prestado
  PostForm(){
    const modelNfse = {
      nome_prestador_servico: this.inputNomePrestador,
      cpf_cnpj_prestador_servico: this.inputCpfCnpjPrestador,
      inscricao_prestador_servico: this.inputIncMunicPrest,
      nome_tomador_servico: this.inputNomeTomador,
      cpf_cnpj_tomador_servico: this.inputCpfCnpjTomador,
      inscricao_tomador_servico: this.inputIncMunicTomador,
      numero_nfse: this.inputNfseNum,
      data_emissao_nfse: this.inputNfseDados,
      valor_total_nfse: this.inputNfseValue,
      descricao_servico_prestado: this.inputDesc,
      valor_unitario_servico: this.inputDescValue,
      quantidade_unidades_servico: this.inputDescQuant,
      valor_total_servico: this.inputDescTotalServ,
      ISS: this.inputImp,
      aliquota_iss: this.inputImpAliquota,
      valor_iss_pago: this.inputImpValue,
      Observacoes:this.inputObv
    };

    this.nfseService.postData(modelNfse).subscribe()
    console.log(modelNfse)
    
  }

  
  
}

