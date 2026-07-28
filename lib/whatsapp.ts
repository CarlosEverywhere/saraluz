import { SITIO } from "@/lib/config";
import { porSlug } from "@/lib/productos";
import { mxn } from "@/lib/formato";
import type { ItemCarrito } from "@/lib/carrito";

export function linkWhatsApp(mensaje: string): string {
  return `https://wa.me/${SITIO.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

export function linkPedidoWhatsApp(items: ItemCarrito[]): string {
  const lineas = items
    .map((item) => {
      const p = porSlug(item.slug);
      if (!p) return null;
      return `• ${item.cantidad}× ${p.nombre} — talla ${item.talla}, color ${item.color} (${mxn(
        p.precioCentavos * item.cantidad,
      )})`;
    })
    .filter(Boolean)
    .join("\n");

  const mensaje = `¡Hola ${SITIO.nombre}! Quiero hacer este pedido:\n\n${lineas}\n\n¿Me apoyan con el total y el envío? Gracias.`;
  return linkWhatsApp(mensaje);
}

export function linkContactoWhatsApp(asunto?: string): string {
  return linkWhatsApp(
    asunto ? `Hola ${SITIO.nombre}, ${asunto}` : `Hola ${SITIO.nombre}, tengo una duda.`,
  );
}
