import { NgModule, LOCALE_ID } from '@angular/core';
import { DecimalPipe, registerLocaleData } from '@angular/common';
import { PrevisaoVendaComponent } from './previsao-venda.component';
import { PrevisaoVendaViewComponent } from './previsao-venda-view/previsao-venda-view.component';
import { PrevisaoVendaFiltroComponent } from './previsao-venda-filtro/previsao-venda-filtro.component';
import { PrevisaoVendaCadastroComponent } from './previsao-venda-cadastro/previsao-venda-cadastro.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

@NgModule({
  imports: [
    SharedComponentsModule
  ],
  declarations: [
    PrevisaoVendaComponent,
    PrevisaoVendaViewComponent,
    PrevisaoVendaFiltroComponent,
    PrevisaoVendaCadastroComponent
  ],
  exports: [
    PrevisaoVendaComponent,
    PrevisaoVendaViewComponent,
    PrevisaoVendaFiltroComponent,
    PrevisaoVendaCadastroComponent
  ],
  providers: [
    MessageService,
    ConfirmationService,
    DecimalPipe,
    { provide: LOCALE_ID, useValue: 'pt' }
  ]
})
export class PrevisaoVendaModule { }
