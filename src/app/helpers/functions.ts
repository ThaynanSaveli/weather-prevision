export function dateToUnix(date: Date) {
  let unixDate = parseInt((new Date(date).getTime() / 1000).toFixed(0))
  return unixDate
}

export function unixToDate(dateUnix: number) {
  let date = new Date(dateUnix * 1000).toLocaleTimeString('pt-BR')

  return date
}

export function getTodayDay() { 
    return new Date().getDay() ;
}

export function mpsToKmph(mps: number) { 
    return (3.6 * mps) ;
}