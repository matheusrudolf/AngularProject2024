import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mesnome'
})
export class MesNomePipe implements PipeTransform {

  private meses: string[] = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  transform(value: number): string {
    if (value < 1 || value > 12 || isNaN(value)) {
      return 'Mês Inválido';
    }

    return this.meses[value - 1];
  }

}
