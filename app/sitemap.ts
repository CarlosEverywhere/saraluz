import type { MetadataRoute } from "next";
import { PRODUCTOS } from "@/lib/productos";
import { SITIO } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const estaticas = [
    "",
    "/tienda",
    "/tienda/mujer",
    "/tienda/caballero",
    "/novedades",
    "/calidad",
    "/nosotros",
    "/mayoreo",
    "/guia-de-tallas",
    "/preguntas-frecuentes",
    "/envios-y-devoluciones",
  ].map((ruta) => ({
    url: `${SITIO.url}${ruta}`,
    changeFrequency: "weekly" as const,
    priority: ruta === "" ? 1 : 0.7,
  }));

  const productos = PRODUCTOS.map((p) => ({
    url: `${SITIO.url}/producto/${p.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...estaticas, ...productos];
}
