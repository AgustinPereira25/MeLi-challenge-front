export function getDecimals(value: number): number {
    const numberStr = value.toString();
  
    if (/^-?[0-9]+$/.test(numberStr)) {
      return 0;
    }
  
    //convierte a numero los digitos despues del punto decimal. 
    return +numberStr.substring(numberStr.indexOf('.') + 1);
  }