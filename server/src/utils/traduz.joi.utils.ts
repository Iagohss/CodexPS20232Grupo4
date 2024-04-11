/**
 * Traduz as strings de erro do JOI para português.
 * @param erroJOI - O erro do JOI a ser traduzido.
 * @returns A mensagem de erro traduzida.
 */
export function traduzErroJOI(erroJOI: string): string {
    const regex = /"([^"]+)"/
    const matches = erroJOI.match(regex)
    if (matches && matches.length > 1) {
        const variable = matches[1]
        return `${variable} inválido(a)`
    }
    return erroJOI
}
