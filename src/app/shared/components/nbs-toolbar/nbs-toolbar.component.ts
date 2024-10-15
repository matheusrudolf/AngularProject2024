import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'nbs-toolbar',
  templateUrl: './nbs-toolbar.component.html',
  styleUrls: ['./nbs-toolbar.component.scss']
})
export class NbsToolbarComponent implements OnInit {
  @Input() tabelaCrud!: boolean;
  @Input() btnCirculo!: boolean;
  @Input() btnSombreado!: boolean;
  @Input() apenasXlsx!: boolean;
  @Input() selecionados!: any[];
  @Output() emitRecarregarDados: EventEmitter<any> = new EventEmitter<any>();
  @Output() emitSelecionados: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() emitModalNovoRegistro: EventEmitter<any> = new EventEmitter<any>();
  @Output() emitModalFiltros: EventEmitter<any> = new EventEmitter<any>();
  exportMenu: MenuItem[] = [];

  constructor(private message: MessageService, private confirmation: ConfirmationService) { }

  ngOnInit() {
    this.exportMenu = [
      { label: 'Exportar excel', icon: 'pi pi-file-excel' },
      { label: 'Exportar pdf', icon: 'pi pi-file-pdf' }
    ];
  }

  public recarregarDados(): void {
    this.emitRecarregarDados.emit(true);
  }

  public removeRegistrosSelecionados(): void {
    this.confirmation.confirm({
      header: 'Confirmar',
      message: `Deseja remover os registros selecionados? (${this.selecionados.length})`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.message.add({ severity: 'success', summary: 'Sucesso', detail: 'Registros removidos com sucesso!', life: 3000 });
        this.selecionados = [];
        this.emitSelecionados.emit(this.selecionados);
        this.emitRecarregarDados.emit(true);
      }
    });
  }

  public chamaModalNovoRegistro(): void {
    this.emitModalNovoRegistro.emit(true);
  }

  public chamaModalFiltros(): void {
    this.emitModalFiltros.emit(true);
  }

}
