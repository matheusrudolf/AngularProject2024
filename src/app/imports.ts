import { SharedComponentsModule } from './shared/components/shared-components.module';
import { PrevisaoVendaModule } from './views/previsao-venda/previsao-venda.module';
import { ControleService } from './shared/services/controle.service';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

export const IMPORTS = [
    SharedComponentsModule,
    PrevisaoVendaModule,
    ToastModule,
    ConfirmDialogModule
];

export const PROVIDERS = [
    ControleService
];
