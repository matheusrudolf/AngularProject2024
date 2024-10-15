import { Component, Input } from '@angular/core';
import { CrudFormsAbstractComponent } from '@shared/templates/crud-forms-template.abstract';
import { IModal } from '@model/components/nbs-modal';
import { IForms } from '@model/components/nbs-forms';
import { IPrevisaoVenda, IPrevisaoVendasListas } from '@model/previsao-venda';
import { ControleService } from '@shared/services/controle.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FuncoesUtils } from '@shared/utils/funcoes-utils';
import { ITabela } from '@model/components/nbs-tabelas';

@Component({
  selector: 'nbs-previsao-venda-filtro',
  templateUrl: '../../../shared/templates/crud-forms-template.html',
  styleUrls: ['./previsao-venda-filtro.component.scss']
})
export class PrevisaoVendaFiltroComponent extends CrudFormsAbstractComponent {
  modalProps: IModal = {
    titulo: 'Definir Filtros',
    exibeModal: false,
    largura: '800px',
    modalCadastro: false,
    fileUpload: false
  };
  formFiltros: IForms[] = [];
  listas: IPrevisaoVendasListas = { dealers: [], categoriaVenda: [], ano: [] };
  formCadastro: IForms[];
  @Input() tabelaProps: ITabela;
  @Input() cadastro: IPrevisaoVenda;
  @Input() filtros: IPrevisaoVenda;

  constructor(requestService: ControleService, messageService: MessageService, confirmationService: ConfirmationService) {
    super(requestService, messageService, confirmationService)
  }

  protected constroiListas(): void {
    this.requestService.getDados('dealers').subscribe({
      next: (res) => res.filtros.forEach(dealer => this.listas.dealers.push({ label: dealer.descricao, value: dealer.id }))
    });

    this.requestService.getDados('categoria-venda').subscribe({
      next: (res) => res.filtros.forEach(venda => this.listas.categoriaVenda.push({ label: venda.descricao, value: venda.id }))
    });

    for (let i = 0; i <= 30; i++) {
      this.listas.ano.push({ label: `20${i < 10 ? '0' + i : i}`, value: 2000 + i });
    }
  }

  protected constroiFormulario(): void {
    this.formFiltros = [
      {
        colSpan: 6,
        formModel: 'id_dealer',
        descricao: 'Dealers',
        tipoDado: 'lista',
        optInput: {
          lista: this.listas.dealers,
          listaLabel: 'label',
          listaValue: 'value',
          placeholder: 'Selecione um dealer...'
        }
      },
      {
        colSpan: 6,
        formModel: 'id_categoria_venda',
        descricao: 'Previsão Venda',
        tipoDado: 'lista',
        optInput: {
          lista: this.listas.categoriaVenda,
          listaLabel: 'label',
          listaValue: 'value',
          placeholder: 'Selecione uma categoria...'
        }
      },
      {
        colSpan: 6,
        formModel: 'anoNumber',
        descricao: 'Ano',
        tipoDado: 'lista',
        optInput: {
          lista: this.listas.ano,
          listaLabel: 'label',
          listaValue: 'value',
          placeholder: 'Selecione o ano...'
        }
      },
      {
        colSpan: 6,
        formModel: 'mesDate',
        descricao: 'Mês',
        tipoDado: 'data',
        optInput: {
          dateFormat: 'MM',
          tipoData: 'month'
        }
      }
    ];
  }

  protected tratarCampos(): void {
    const mes = this.filtros.mesDate.getMonth() + 1;

    this.filtros.ano = this.filtros.anoNumber.toString();
    this.filtros.mes = mes.toString();

    delete this.filtros.anoNumber;
    delete this.filtros.mesDate;
  }

  protected limparFormulario(): void {
    this.filtros = {
      id_dealer: '',
      id_categoria_venda: '',
      ano: '',
      mes: '',
      mesDate: FuncoesUtils.conversaoMesAtual(),
      anoNumber: FuncoesUtils.conversaoAnoAtual()
    };
  }

}
