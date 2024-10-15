import { Component, OnInit } from '@angular/core';
import { IModal } from '@model/components/nbs-modal';
import { IPrevisaoVenda } from '@model/previsao-venda';
import { FuncoesUtils } from '@shared/utils/funcoes-utils';

@Component({
  selector: 'nbs-previsao-venda',
  templateUrl: './previsao-venda.component.html',
  styleUrls: ['./previsao-venda.component.scss']
})
export class PrevisaoVendaComponent implements OnInit {
  cadastro: IPrevisaoVenda = {
    todosDealers: false,
    preencherArquivo: false,
    id_dealer: '',
    id_categoria_venda: '',
    ano: null,
    anoNumber: FuncoesUtils.conversaoAnoAtual(),
    mes: null,
    mesDate: FuncoesUtils.conversaoMesAtual(),
    tipo_valor: 'S',
    valor: 0
  };
  filtros: IPrevisaoVenda = {
    id_dealer: '',
    id_categoria_venda: '',
    ano: '',
    mes: '',
    mesDate: FuncoesUtils.conversaoMesAtual(),
    anoNumber: FuncoesUtils.conversaoAnoAtual()
  }
  exibeCadastro: boolean = false;
  exibeFiltros: boolean = false;

  constructor() { }

  ngOnInit(): void { }

  public recebeModalFiltros(modalProps: IModal): void {
    modalProps.modalCadastro = false;
    modalProps.exibeModal = !modalProps.exibeModal;
  }

  public recebeModalCadastro(modalProps: IModal): void {
    modalProps.modalCadastro = true;
    modalProps.exibeModal = !modalProps.exibeModal;
  }

  public recebeDadosCadastro(cadastro: IPrevisaoVenda): void {
    this.cadastro = cadastro;
    this.cadastro.mesDate = this.converteMesTipoDate(this.cadastro.mes);
    this.cadastro.anoNumber = Number(this.cadastro.ano);
  }

  public recebeCancelarCadastro(cadastro: IPrevisaoVenda): void {
    cadastro = this.formularioVazio();
  }

  public recebeConfirmacaoSalvar(formulario: { submitted: boolean, cadastro: IPrevisaoVenda }) {
    if (formulario.submitted) {
      this.formularioVazio();
    } else {
      this.cadastro.anoNumber = new Date(this.cadastro.ano).getFullYear() + 1;
      this.cadastro.mesDate = new Date(this.cadastro.mes);
    }
  }

  private converteMesTipoDate(mes: string): any {
    const mesDate = FuncoesUtils.converteMesParaDate(mes);
    return mesDate;
  }

  private formularioVazio(): IPrevisaoVenda {
    return this.cadastro = {
      todosDealers: false,
      preencherArquivo: false,
      id_dealer: '',
      id_categoria_venda: '',
      ano: null,
      anoNumber: FuncoesUtils.conversaoAnoAtual(),
      mes: null,
      mesDate: FuncoesUtils.conversaoMesAtual(),
      tipo_valor: 'S',
      valor: 0
    }
  }

}
