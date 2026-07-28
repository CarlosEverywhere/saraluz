import Link from "next/link";
import type { Producto } from "@/lib/productos";
import { CATEGORIAS, type Categoria, type Departamento } from "@/lib/productos";
import ProductCard from "@/components/producto/ProductCard";

export interface FiltrosCatalogo {
  categoria?: string;
  talla?: string;
  orden?: string;
  q?: string;
}

const ORDENES = [
  { clave: "nuevo", texto: "Lo más nuevo" },
  { clave: "precio-asc", texto: "Precio: menor a mayor" },
  { clave: "precio-desc", texto: "Precio: mayor a menor" },
];

export function aplicarFiltros(productos: Producto[], f: FiltrosCatalogo): Producto[] {
  let lista = [...productos];
  if (f.categoria) lista = lista.filter((p) => p.categoria === f.categoria);
  if (f.talla) {
    lista = lista.filter(
      (p) => p.tallas.includes(f.talla!) && !p.tallasAgotadas?.includes(f.talla!),
    );
  }
  switch (f.orden) {
    case "precio-asc":
      lista.sort((a, b) => a.precioCentavos - b.precioCentavos);
      break;
    case "precio-desc":
      lista.sort((a, b) => b.precioCentavos - a.precioCentavos);
      break;
    default:
      lista.sort((a, b) => Number(b.nuevo ?? false) - Number(a.nuevo ?? false));
  }
  return lista;
}

function url(base: string, f: FiltrosCatalogo, cambios: Partial<FiltrosCatalogo>): string {
  const merged = { ...f, ...cambios };
  const sp = new URLSearchParams();
  if (merged.categoria) sp.set("categoria", merged.categoria);
  if (merged.talla) sp.set("talla", merged.talla);
  if (merged.orden) sp.set("orden", merged.orden);
  if (merged.q) sp.set("q", merged.q);
  const qs = sp.toString();
  return qs ? `${base}?${qs}` : base;
}

export default function Catalogo({
  titulo,
  descripcion,
  productos,
  filtros,
  base,
  categorias,
  tallas,
}: {
  titulo: string;
  descripcion?: string;
  productos: Producto[];
  filtros: FiltrosCatalogo;
  base: string;
  categorias?: Categoria[];
  tallas?: string[];
}) {
  const lista = aplicarFiltros(productos, filtros);
  const hayFiltros = !!(filtros.categoria || filtros.talla || filtros.q);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      <header className="max-w-2xl">
        <h1 className="font-titulo text-4xl">{titulo}</h1>
        {descripcion && <p className="mt-2 text-tinta-suave">{descripcion}</p>}
        {filtros.q && (
          <p className="mt-2 text-sm text-tinta-suave">
            Resultados para: <strong className="text-tinta">“{filtros.q}”</strong>
          </p>
        )}
      </header>

      {/* Filtros */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        {categorias && categorias.length > 1 && (
          <>
            <Link
              href={url(base, filtros, { categoria: undefined })}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-150 ${
                !filtros.categoria
                  ? "bg-tinta text-white border-tinta"
                  : "border-borde bg-superficie hover:border-tinta"
              }`}
            >
              Todo
            </Link>
            {categorias.map((cat) => (
              <Link
                key={cat}
                href={url(base, filtros, { categoria: cat })}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-150 ${
                  filtros.categoria === cat
                    ? "bg-tinta text-white border-tinta"
                    : "border-borde bg-superficie hover:border-tinta"
                }`}
              >
                {CATEGORIAS[cat].nombre}
              </Link>
            ))}
            <span aria-hidden className="mx-2 h-5 w-px bg-borde" />
          </>
        )}

        {tallas?.map((t) => (
          <Link
            key={t}
            href={url(base, filtros, { talla: filtros.talla === t ? undefined : t })}
            aria-label={`Filtrar por talla ${t}`}
            className={`rounded-full border px-3.5 py-2 text-sm font-medium transition-colors duration-150 ${
              filtros.talla === t
                ? "bg-acento text-white border-acento"
                : "border-borde bg-superficie hover:border-tinta"
            }`}
          >
            {t}
          </Link>
        ))}

        <div className="ml-auto flex flex-wrap gap-2">
          {ORDENES.map((o) => (
            <Link
              key={o.clave}
              href={url(base, filtros, { orden: o.clave })}
              className={`rounded-full px-3.5 py-2 text-[13px] transition-colors duration-150 ${
                (filtros.orden ?? "nuevo") === o.clave
                  ? "bg-borde/60 font-semibold"
                  : "text-tinta-suave hover:text-tinta"
              }`}
            >
              {o.texto}
            </Link>
          ))}
        </div>
      </div>

      {/* Resultados */}
      {lista.length === 0 ? (
        <div className="mt-16 text-center max-w-md mx-auto">
          <p className="font-titulo text-2xl">No encontramos prendas con esos filtros</p>
          <p className="mt-2 text-tinta-suave text-sm">
            Prueba con otra talla o categoría, o revisa todo el catálogo.
          </p>
          <Link
            href={base}
            className="mt-5 inline-block rounded-full bg-acento px-6 py-3 text-white font-semibold text-sm hover:bg-acento-hover transition-colors duration-150"
          >
            Limpiar filtros
          </Link>
        </div>
      ) : (
        <>
          <p className="mt-6 text-sm text-tinta-suave" aria-live="polite">
            {lista.length} {lista.length === 1 ? "prenda" : "prendas"}
            {hayFiltros && (
              <>
                {" · "}
                <Link href={base} className="underline hover:text-acento">
                  limpiar filtros
                </Link>
              </>
            )}
          </p>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {lista.map((p) => (
              <ProductCard key={p.slug} producto={p} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
