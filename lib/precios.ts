/**
 * ÚNICA fuente de verdad para calcular totales. Corre solo en el servidor.
 * El cliente manda slugs y cantidades; los precios salen del catálogo, nunca
 * del navegador.
 */
import "server-only";
import { porSlug } from "@/lib/productos";
import { SITIO } from "@/lib/config";

export interface ItemPedido {
  slug: string;
  talla: string;
  color: string;
  cantidad: number;
}

export interface Totales {
  lineas: {
    slug: string;
    nombre: string;
    talla: string;
    color: string;
    cantidad: number;
    precioUnitarioCentavos: number;
    importeCentavos: number;
  }[];
  subtotalCentavos: number;
  envioCentavos: number;
  totalCentavos: number;
}

export function calcularTotales(items: ItemPedido[]): Totales {
  const lineas = items.map((item) => {
    const producto = porSlug(item.slug);
    if (!producto) throw new Error(`Producto inexistente: ${item.slug}`);
    if (!producto.tallas.includes(item.talla)) {
      throw new Error(`Talla inválida para ${item.slug}: ${item.talla}`);
    }
    if (producto.tallasAgotadas?.includes(item.talla)) {
      throw new Error(`Talla agotada para ${producto.nombre}: ${item.talla}`);
    }
    const cantidad = Math.min(Math.max(Math.trunc(item.cantidad), 1), 20);
    return {
      slug: producto.slug,
      nombre: producto.nombre,
      talla: item.talla,
      color: item.color,
      cantidad,
      precioUnitarioCentavos: producto.precioCentavos,
      importeCentavos: producto.precioCentavos * cantidad,
    };
  });

  const subtotalCentavos = lineas.reduce((suma, l) => suma + l.importeCentavos, 0);
  const envioCentavos =
    subtotalCentavos >= SITIO.envioGratisDesdeCentavos ? 0 : SITIO.costoEnvioCentavos;

  return {
    lineas,
    subtotalCentavos,
    envioCentavos,
    totalCentavos: subtotalCentavos + envioCentavos,
  };
}
