import { IListas } from "./nbs-listas"

export interface IForms {
    /** Campo da entidade - field */
    formModel?: string,
    /** Valor de tratamento do data binding - value :. Usado no FormsModule NgModel */
    colSpan?: number,
    descricao?: string,
    tipoDado?: 'texto' | 'numerico' | 'data' | 'logico' | 'lista' | 'radio' | 'fileupload',
    visivel?: boolean,
    optInput?: IOptionsInput
}

interface IOptionsInput {
    modoNumerico?: 'decimal' | 'currency',
    monetario?: 'BRL' | 'USD' | 'EUR',
    locale?: 'pt-BR' | 'en-US' | 'en-IN',
    lista?: IListas[],
    listaLabel?: string,
    listaValue?: string,
    dateFormat?: string,
    dateIcon?: boolean,
    tipoData?: 'month' | 'year'
    placeholder?: string
    text?: string,
    items?: checkRadioLista[],
    fileUploadHint?: FileUploadHint,
    fileUploadBtn?: FileUploadBtn,
    onClick?: (event) => void
    onChange?: (event) => void
}

interface checkRadioLista {
    itemValue?: any,
    text?: string
}

interface FileUploadHint {
    visivel: boolean,
    hints: any[]
}

interface FileUploadBtn {
    visivel: boolean,
    toolTip: string,
    onClick?: (event) => void
}


