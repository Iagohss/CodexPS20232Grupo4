export function traduzErroJOI(erroJOI: string): string {
    const regex = /"([^"]+)"/
    const matches = erroJOI.match(regex)
    if (matches && matches.length > 1) {
        const variable = matches[1]
        return `${variable} inválido(a)`
    }
    return erroJOI
}
