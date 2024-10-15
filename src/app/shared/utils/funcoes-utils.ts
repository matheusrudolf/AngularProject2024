export class FuncoesUtils {

    public static conversaoMesAtual(): Date {
        return new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    }

    public static conversaoAnoAtual(): number {
        return Number(new Date().getFullYear());
    }

    public static converteMesParaDate(mes: string): Date {
        return new Date(new Date().getFullYear(), Number(mes) - 1, 1);
    }

}
