import { IListas } from "./components/nbs-listas"

export interface IPrevisaoVenda {
    id?: number,
    id_dealer?: string,
    id_categoria_venda?: string,
    nome_dealer?: string,
    nome_categoria_venda?: string,
    mes?: string,
    ano?: string,
    quantidade?: number,
    valor?: number,
    tipo_valor?: string,
    mesDate?: Date,
    anoNumber?: number,
    todosDealers?: boolean,
    preencherArquivo?: boolean
}

export interface IPrevisaoVendasListas {
    dealers: IListas[],
    categoriaVenda: IListas[],
    ano: IListas[]
}