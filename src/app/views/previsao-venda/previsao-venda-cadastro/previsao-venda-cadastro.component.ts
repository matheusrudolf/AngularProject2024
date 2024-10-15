import { Component, Input } from '@angular/core';
import { CrudFormsAbstractComponent } from '@shared/templates/crud-forms-template.abstract';
import { IForms } from '@model/components/nbs-forms';
import { IModal } from '@model/components/nbs-modal';
import { ControleService } from '@shared/services/controle.service';
import { IPrevisaoVenda, IPrevisaoVendasListas, } from '@model/previsao-venda';
import { Estado } from '@shared/enum/estado.enum';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ITabela } from '@model/components/nbs-tabelas';

@Component({
  selector: 'nbs-previsao-venda-cadastro',
  templateUrl: '../../../shared/templates/crud-forms-template.html',
  styleUrls: ['./previsao-venda-cadastro.component.scss'],
})
export class PrevisaoVendaCadastroComponent extends CrudFormsAbstractComponent {
  modalProps: IModal = { titulo: 'Cadastrar', exibeModal: false, largura: '800px', modalCadastro: true, fileUpload: false };
  formFiltros: IForms[] = [];
  listas: IPrevisaoVendasListas = { dealers: [], categoriaVenda: [], ano: [] };
  formCadastro: IForms[] = [];
  @Input() tabelaProps: ITabela;
  @Input() cadastro: IPrevisaoVenda;
  @Input() filtros: IPrevisaoVenda;

  constructor(requestService: ControleService, messageService: MessageService, confirmationService: ConfirmationService) {
    super(requestService, messageService, confirmationService);
  }

  public constroiListas(): void {
    this.requestService.getDados('dealers').subscribe({
      next: (res) =>
        res.filtros.forEach((dealer) => this.listas.dealers.push({ label: dealer.descricao, value: dealer.id }))
    });

    this.requestService.getDados('categoria-venda').subscribe({
      next: (res) => res.filtros.forEach((venda) => this.listas.categoriaVenda.push({ label: venda.descricao, value: venda.id }))
    });

    for (let i = 0; i <= 30; i++) {
      this.listas.ano.push({ label: `20${i < 10 ? '0' + i : i}`, value: 2000 + i });
    }
  }

  protected constroiFormulario(): void {
    this.formCadastro = [
      {
        colSpan: 6,
        visivel: this.estado === Estado.novo && !this.cadastro.preencherArquivo,
        formModel: 'todosDealers',
        tipoDado: 'logico',
        optInput: {
          text: 'Todos os Dealers',
          onChange: (event: any) => this.retornaCondicaoTodosDealers(event),
        },
      },
      {
        colSpan: 6,
        visivel: this.estado === Estado.novo,
        formModel: 'preencherArquivo',
        tipoDado: 'logico',
        optInput: {
          text: 'Preenchimento via Arquivo',
          onChange: (event: any) => this.retornaCondicaoPreencherArquivo(event),
        },
      },
      {
        colSpan: 12,
        visivel: !this.cadastro.todosDealers && !this.cadastro.preencherArquivo,
        formModel: 'id_dealer',
        descricao: 'Dealers',
        tipoDado: 'lista',
        optInput: {
          lista: this.listas.dealers,
          listaLabel: 'label',
          listaValue: 'value',
          placeholder: 'Selecione um dealer...',
        },
      },
      {
        colSpan: 12,
        visivel: !this.cadastro.preencherArquivo,
        formModel: 'id_categoria_venda',
        descricao: 'Previsão Venda',
        tipoDado: 'lista',
        optInput: {
          lista: this.listas.categoriaVenda,
          listaLabel: 'label',
          listaValue: 'value',
          placeholder: 'Selecione uma categoria...',
        },
      },
      {
        colSpan: 6,
        visivel: !this.cadastro.preencherArquivo,
        formModel: 'anoNumber',
        descricao: 'Ano',
        tipoDado: 'lista',
        optInput: {
          lista: this.listas.ano,
          listaLabel: 'label',
          listaValue: 'value',
          placeholder: 'Selecione o ano...',
        },
      },
      {
        colSpan: 6,
        visivel: !this.cadastro.preencherArquivo,
        formModel: 'mesDate',
        descricao: 'Mês',
        tipoDado: 'data',
        optInput: {
          dateFormat: 'MM',
          tipoData: 'month',
        },
      },
      {
        colSpan: 12,
        visivel: !this.cadastro.preencherArquivo,
        formModel: 'valor',
        descricao: 'Valor',
        tipoDado: 'numerico',
        optInput: {
          modoNumerico: this.cadastro.tipo_valor === 'S' ? 'currency' : 'decimal',
          monetario: 'BRL',
          locale: 'pt-BR',
        },
      },
      {
        colSpan: 12,
        visivel: !this.cadastro.preencherArquivo,
        formModel: 'tipo_valor',
        tipoDado: 'radio',
        descricao: 'Tipo Valor',
        optInput: {
          items: [
            { text: 'Monetário', itemValue: 'S' },
            { text: 'Quantidade', itemValue: 'N' },
          ],
          onClick: (event: any) => this.retornaCondicaoTipoValor(event),
        },
      },
      {
        colSpan: 12,
        visivel: this.cadastro.preencherArquivo,
        tipoDado: 'fileupload',
        optInput: {
          fileUploadHint: { visivel: true, hints: this.retornaHintsFileUpload() },
          fileUploadBtn: { visivel: true, toolTip: 'Baixar o modelo', onClick: () => alert('baixa arquivo') },
        },
      },
    ];
  }

  protected tratarCampos(): void {
    this.cadastro.ano = this.cadastro.anoNumber.toString();
    this.cadastro.mes = (this.cadastro.mesDate.getMonth() + 1).toString();

    delete this.cadastro.anoNumber;
    delete this.cadastro.mesDate;
  }

  private retornaCondicaoTodosDealers(todosDealers: boolean): void {
    this.cadastro.todosDealers = todosDealers;
    this.constroiFormulario();
  }

  private retornaCondicaoTipoValor(tipoValor: string): void {
    this.cadastro.tipo_valor = tipoValor;
    this.constroiFormulario();
  }

  private retornaCondicaoPreencherArquivo(preencherArquivo: boolean): void {
    this.modalProps.fileUpload = !this.modalProps.fileUpload;
    preencherArquivo ? (this.modalProps.largura = '950px') : (this.modalProps.largura = '800px');
    this.cadastro.preencherArquivo = preencherArquivo;
    this.constroiFormulario();
  }

  private retornaHintsFileUpload(): any[] {
    return [
      '1. Criar arquivo com 5 campos: Coluna A: dealer / Coluna B: categoria de compra / Coluna C: ano / Coluna D: mes / Coluna E: valor / Coluna F: monetario.',
      '2. Nome da planilha precisa ser "NBS".',
      '3. Deverá conter uma segunda planilha, para código e descrição das categorias, nomear de "Categorias"',
      '4. Não pode ter Dealer repetidos.',
      '5. Baixa arquivo modelo.',
    ];
  }

  protected limparFormulario(): void { }
}
