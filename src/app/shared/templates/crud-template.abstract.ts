import { ConfirmationService, MessageService } from "primeng/api";
import { ControleService } from "@shared/services/controle.service";
import { IColunas, ITabela } from "@model/components/nbs-tabelas";
import { IModal } from "@model/components/nbs-modal";
import { Directive, EventEmitter, Output } from "@angular/core";

@Directive()
export abstract class CrudAbstractComponent {
    selecionados: any[] = [];
    @Output() emiteNovoFormulario: EventEmitter<any> = new EventEmitter<any>();

    constructor(public requestService: ControleService, public messageService: MessageService, public confirmationService: ConfirmationService) { }

    public retornaDados(tabelaProps: ITabela, filtros?: string): void {
        tabelaProps.carregando = true;

        const request: string = filtros ? tabelaProps.nomeTabela + filtros : tabelaProps.nomeTabela;

        this.requestService.getDados(request).subscribe({
            next: (res: any) => {
                tabelaProps.dados = res.dados;
                tabelaProps.carregando = false;

                this.constroiColunasPorRequisicao(tabelaProps);
            },
            error: (error: any) => {
                console.error(error);
            }
        });
    }

    public requisicaoRemocao(descricao: string, tabelaProps: ITabela): void {
        this.confirmationService.confirm({
            message: `Tem certeza de que deseja remover o registro <b>${descricao}</b>?`,
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Registro removido com sucesso!', life: 3000 });
                this.retornaDados(tabelaProps);
            }
        });
    }

    public requisicaoRemocaoMultipla(tabelaProps: ITabela): void {
        this.confirmationService.confirm({
            message: `Tem certeza de que deseja remover os <b>${this.selecionados.length}</b> registros?`,
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Registros removidos com sucesso!', life: 3000 });
                this.selecionados = [];
                this.retornaDados(tabelaProps);
            }
        });
    }

    public requisicaoSalvar(modalProps: IModal, cadastro: any, tabelaProps: ITabela): void {
        this.confirmationService.confirm({
            message: 'Deseja salvar o registro?',
            header: 'Salvar',
            icon: 'pi pi-save',
            accept: () => {
                this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Registro salvo com sucesso!', life: 3000 });
                modalProps.exibeModal = false;

                this.retornaDados(tabelaProps);
                const formulario = { submitted: true, cadastro: cadastro };
                this.emiteNovoFormulario.emit(formulario);
            },
            reject: () => {
                modalProps.exibeModal = true;

                const formulario = { submitted: false, cadastro: cadastro };
                this.emiteNovoFormulario.emit(formulario);
            }
        });
    }

    private constroiColunasPorRequisicao(tabelaProps: ITabela): void {
        if (!tabelaProps.colunasCustom) {
            let reqColunas: any[] = [];

            Object.keys(tabelaProps.dados[0]).forEach(key => {
                const header = key.replace(/_/g, ' ').charAt(0).toUpperCase() + key.replace(/_/g, ' ').slice(1);
                reqColunas.push({ field: key, header: header, width: 'auto' });
                tabelaProps.colunas = reqColunas;
            });

            this.constroiColunaAcoes(tabelaProps.colunas, tabelaProps.acoes);
        }
    }

    public constroiColunaAcoes(colunas: IColunas[], acoes: boolean): void {
        if (colunas.length > 0 && acoes) {
            colunas.push({ field: 'edit', header: 'Ações', width: '50px' });
        }
    }

}
