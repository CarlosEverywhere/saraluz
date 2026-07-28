/** El dinero vive en centavos (entero) y solo se formatea al mostrarse. */
export function mxn(centavos: number): string {
  return (centavos / 100).toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}
