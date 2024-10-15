import { Directive, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { IModal } from "@model/components/nbs-modal";
import { IForms } from "@model/components/nbs-forms";
import { ControleService } from "../services/controle.service";
import { Estado } from "@shared/enum/estado.enum";
import { CrudAbstractComponent } from "./crud-template.abstract";
import { MessageService, ConfirmationService } from "primeng/api";
import { ITabela } from "@model/components/nbs-tabelas";

@Directive()
export abstract class CrudFormsAbstractComponent extends CrudAbstractComponent implements OnInit, OnChanges {
    @Input() abstract modalProps: IModal;
    abstract filtros: any;
    abstract formFiltros: IForms[];
    abstract listas: any;
    abstract formCadastro: IForms[];
    abstract cadastro: any;
    abstract tabelaProps: ITabela;
    @Input() nomeTabela!: string;
    @Input() estado!: Estado;
    @Output() emitCancelarCadastro: EventEmitter<any> = new EventEmitter<any>();
    @Output() emitFiltro: EventEmitter<any> = new EventEmitter<any>();

    constructor(requestService: ControleService, messageService: MessageService, confirmationService: ConfirmationService) {
        super(requestService, messageService, confirmationService)
    }

    ngOnInit(): void {
        this.constroiListas();
        this.constroiFormulario();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.hasOwnProperty('estado')) {
            this.estado = changes['estado'].currentValue;

            if (this.estado === Estado.novo) {
                this.modalProps.titulo = 'Cadastrar';
            } else if (this.estado === Estado.visualizar) {
                this.modalProps.titulo = 'Visualizar';
            } else if (this.estado === Estado.alterar) {
                this.modalProps.titulo = 'Editar';
            }

        }

        this.constroiFormulario();
    }

    public salvar(): void {
        this.tratarCampos();
        this.requisicaoSalvar(this.modalProps, this.cadastro, this.tabelaProps);
    }

    public cancelar(): void {
        this.modalProps.exibeModal = !this.modalProps.exibeModal;
        this.modalProps.fileUpload = false;
        this.emitCancelarCadastro.emit(this.cadastro);
    }

    public filtrar(): void {
        this.tratarCampos();

        const filtrosCampos: string[] = Object.keys(this.filtros);
        const filtrosValores: any[] = Object.values(this.filtros);

        let queryParams: string[] = [];

        filtrosCampos.forEach((campo, index) => {
            const valor = filtrosValores[index];
            queryParams.push(`${campo}=${valor}`);
        });

        const filtros = `?${queryParams.join('&')}`;

        this.retornaDados(this.tabelaProps, filtros);
        this.limparFormulario();
        
        this.modalProps.exibeModal = !this.modalProps.exibeModal;
    }

    public upload(event: any): void {
        console.log(event)
    }

    protected abstract tratarCampos(): void;
    protected abstract constroiListas(): void
    protected abstract constroiFormulario(): void;
    protected abstract limparFormulario(): void;
}