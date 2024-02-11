export function convertDateToISOString(date: Date) {
    return date.toISOString().substring(0, 10);
}

export function convertDateToLocaleString(date: Date) {
    console.log(`Data enviada para o conversor: ${date}`)
    return date.toLocaleDateString('pt-BR');
}   

export function convertISOStringToLocaleString(isoDate: string) {
    return isoDate.split('-').reverse().join('/')
}