import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { DEPARTAMENTOS, porDepartamento, type Departamento } from "@/lib/productos";
import Catalogo, { type FiltrosCatalogo } from "@/components/tienda/Catalogo";

const DESCRIPCIONES: Record<Departamento, string> = {
  mujer:
    "Pantaletas, bikinis y prendas sin costura Sara Luz: tela suave que no marca, cosida por manos expertas mexicanas.",
  caballero:
    "Josh Men's: boxers y briefs con soporte real, pretina firme y tela que aguanta. La línea de caballero de Sara Luz.",
};

export function generateStaticParams() {
  return (Object.keys(DEPARTAMENTOS) as Departamento[]).map((d) => ({ departamento: d }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ departamento: string }>;
}): Promise<Metadata> {
  const { departamento } = await params;
  if (!(departamento in DEPARTAMENTOS)) return {};
  const dep = departamento as Departamento;
  return {
    title: `${DEPARTAMENTOS[dep].nombre} — ${DEPARTAMENTOS[dep].marca}`,
    description: DESCRIPCIONES[dep],
  };
}

export default async function PaginaDepartamento({
  params,
  searchParams,
}: {
  params: Promise<{ departamento: string }>;
  searchParams: Promise<FiltrosCatalogo>;
}) {
  const { departamento } = await params;
  if (!(departamento in DEPARTAMENTOS)) notFound();
  const dep = departamento as Departamento;
  const filtros = await searchParams;
  const info = DEPARTAMENTOS[dep];

  const catalogo = (
    <Catalogo
      titulo={`${info.nombre} · ${info.marca}`}
      descripcion={DESCRIPCIONES[dep]}
      productos={porDepartamento(dep)}
      filtros={filtros}
      base={`/tienda/${dep}`}
      categorias={info.categorias}
      tallas={dep === "caballero" ? ["CH", "M", "G", "XG", "XXG"] : ["CH", "M", "G", "XG"]}
    />
  );

  if (dep !== "caballero") return catalogo;

  // Territorio Josh Men's: fondo azul clarito, acento azul rey (via data-tema)
  // y el logo como marca de agua.
  return (
    <div data-tema="caballero" className="relative overflow-hidden bg-[#e8f0fb]">
      <Image
        src="/marca/joshmens.png"
        alt=""
        aria-hidden
        width={800}
        height={652}
        className="pointer-events-none select-none absolute -right-20 top-16 w-[480px] max-w-[70vw] h-auto opacity-[0.05]"
      />
      <div className="relative">{catalogo}</div>
    </div>
  );
}
