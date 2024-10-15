import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Estado } from '../../enum/estado.enum';
import { IForms } from '../../../model/components/nbs-forms';

@Component({
  selector: 'nbs-modal',
  templateUrl: './nbs-modal.component.html',
  styleUrls: ['./nbs-modal.component.scss']
})
export class NbsModalComponent implements OnInit {
  @Input() titulo!: string;
  @Input() exibeModal!: boolean;
  @Input() largura!: string;
  @Input() ModalCadastro!: boolean;
  @Input() estadoCrud!: Estado;
  @Input() formFiltros!: IForms[];
  @Input() filtros!: any;
  @Input() formCadastro!: IForms[];
  @Input() cadastro: any;
  @Output() emitFiltro: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() emitCadastro: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() emitLimparFormulario: EventEmitter<any> = new EventEmitter<any>();
  @Output() emitCancelamento: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {}

  public salvar(): void {
    this.emitCadastro.emit(this.cadastro);
  }

  public filtrar(): void {
    this.emitFiltro.emit(this.filtros);
  }

  public limparFormulario(): void {
    if (this.ModalCadastro) {
      this.emitLimparFormulario.emit(this.cadastro);
    } else {
      this.emitLimparFormulario.emit(this.filtros);
    }
  }

  public cancelar(): void {
    this.exibeModal = false;
    this.emitCancelamento.emit(this.exibeModal);
  }

}
