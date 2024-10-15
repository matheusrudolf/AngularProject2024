export interface ITabela {
    nomeTabela: string
    dados: any[];
    colunas: IColunas[];
    colunasCustom: boolean;
    acoes: boolean;
    acoesCustom?: boolean;
    btnAcoesCustom?: IBtnAcoesCustom[];
    campoOrdenacao: string;
    carregando: boolean;
    grouping?: boolean;
    camposAgrupar?: IColunas[],
}

export interface IColunas {
    field: string;
    header: string;
    width?: string;
    type?: any,
    arg?: string;
    alignment?: 'text-left' | 'text-center' | 'text-right';
    grouped?: boolean;
    icone?: string,
}

export interface IBtnAcoesCustom {
    icon: string;
    tooltip: string;
    class: string;
    btnText: boolean;
    btnCirculo: boolean;
    btnSombreado: boolean;
    btnCor: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'help' | 'danger' | 'contrast';
    evento: (data, btn?, index?) => void;
}

export interface ISeletorColunas {
    visivel: boolean;
    estilo: {};
    _colunasSelecionadas: any[];
}

interface ICampos {
    field: string,
    header: string
}

export interface IColunaAgrupar {
    campos: ICampos;
}
