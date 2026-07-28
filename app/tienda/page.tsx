import type { Metadata } from "next";
import { buscar, PRODUCTOS } from "@/lib/productos";
import Catalogo, { type FiltrosCatalogo } from "@/components/tienda/Catalogo";

export const metadata: Metadata = {
  title: "Tienda",
  description:
    "Todo el catálogo Sara Luz y Josh Men's: pantaletas, bikinis, prendas sin costura, boxers y briefs hechos en México.",
};

export default async function PaginaTienda({
  searchParams,
}: {
  searchParams: Promise<FiltrosCatalogo>;
}) {
  const filtros = await searchParams;
  const productos = filtros.q ? buscar(filtros.q) : PRODUCTOS;

  return (
    <Catalogo
      titulo={filtros.q ? "Búsqueda" : "Todo el catálogo"}
      descripcion={
        filtros.q
          ? undefined
          : "Mujer y caballero: prendas hechas en México con tela de altísima calidad."
      }
      productos={productos}
      filtros={filtros}
      base="/tienda"
      categorias={["pantaletas", "bikinis", "sin-costura", "boxers", "briefs"]}
      tallas={["CH", "M", "G", "XG", "XXG"]}
    />
  );
}
