import { Component } from '@angular/core';
import { IColunas, IBtnAcoesCustom, ITabela } from '@model/components/nbs-tabelas';
import { IPrevisaoVenda } from '@model/previsao-venda';
import { ControleService } from '@shared/services/controle.service';
import { CrudViewAbstractComponent } from '@shared/templates/crud-view-template.abstract';
import { IToolbar } from '@model/components/nbs-toolbar';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DecimalPipe } from '@angular/common';
import { MesNomePipe } from '@shared/pipes/mes-nome.pipe';
import { ExportersService } from '@shared/services/exporters.service';

@Component({
  selector: 'nbs-previsao-venda-view',
  templateUrl: '../../../shared/templates/crud-view-template.html',
  styleUrls: ['./previsao-venda-view.component.scss']
})
export class PrevisaoVendaViewComponent extends CrudViewAbstractComponent {
  toolbarProps: IToolbar = { minimalista: true, btnSombreado: true, btnCircular: true, apenasXlsx: false, tabelaCrud: true };
  tabelaProps: ITabela = {
    nomeTabela: 'previsao-venda', dados: [], colunas: [], colunasCustom: true, acoes: true, campoOrdenacao: '', carregando: false, grouping: false, acoesCustom: false,
    camposAgrupar: []
  };
  filtrosGlobais: string[] = ['nome_dealer', 'nome_categoria_venda', 'ano', 'mes', 'valor'];

  constructor(public requestService: ControleService,
    public messageService: MessageService,
    public confirmationService: ConfirmationService,
    public exporters: ExportersService,
    private number: DecimalPipe,
    private mes: MesNomePipe) {
    super(requestService, messageService, confirmationService, exporters);
  }

  protected constroiColunasDinamicas(colunas: IColunas[]): IColunas[] {
    return colunas = [
      { field: 'nome_dealer', header: 'Dealer', width: 'auto', alignment: 'text-left', grouped: false },
      { field: 'nome_categoria_venda', header: 'Categoria Venda', width: 'auto', alignment: 'text-left', grouped: false },
      { field: 'ano', header: 'Ano', width: 'auto', alignment: 'text-left', grouped: false },
      { field: 'mes', header: 'Mês', width: 'auto', type: this.mes, alignment: 'text-left', grouped: false },
      { field: 'valor', header: 'Valor', width: 'auto', type: this.number, arg: '4.2-5', alignment: 'text-left', grouped: false }
    ];
  }

  protected trataFiltrosGlobais(value: string): any {
    const meses: string[] = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const mesIndex = meses.indexOf(value);

    if (mesIndex !== -1) {
      value = (mesIndex + 1).toString();
    }

    return value;
  }

  protected constroiColunaAcaoCustom(botoes: IBtnAcoesCustom[]): IBtnAcoesCustom[] {
    return botoes = [
      {
        icon: 'pi pi-eye-slash',
        tooltip: 'Exibir',
        btnText: true,
        btnCirculo: true,
        btnSombreado: false,
        btnCor: 'primary',
        class: 'p-button-sm',
        evento: (data) => this.acaoVisivel(data)
      }
    ];
  }

  protected capturaDescricaoRegistroRemocao(rowData: IPrevisaoVenda): string {
    return rowData.nome_dealer;
  }

  private acaoVisivel(rowData: IPrevisaoVenda): void {
    !rowData.hasOwnProperty('icon') ? rowData['icon'] = 'pi pi-eye-slash' : null;
    rowData['icon'] = rowData['icon'] === 'pi pi-eye-slash' ? 'pi pi-eye' : 'pi pi-eye-slash';
  }
}