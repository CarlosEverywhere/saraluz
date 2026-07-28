import Link from "next/link";
import Image from "next/image";
import type { Producto } from "@/lib/productos";
import { mxn } from "@/lib/formato";
import PlaceholderPrenda from "./PlaceholderPrenda";

export default function ProductCard({ producto }: { producto: Producto }) {
  const enOferta = !!producto.precioAntesCentavos;

  return (
    <Link
      href={`/producto/${producto.slug}`}
      className="group block rounded-tarjeta bg-superficie border border-borde overflow-hidden transition-shadow duration-250 hover:shadow-tarjeta"
    >
      <div className="relative aspect-[4/5]">
        {producto.imagenes?.[0] ? (
          <Image
            src={producto.imagenes[0]}
            alt={producto.nombre}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover"
          />
        ) : (
          <PlaceholderPrenda producto={producto} className="absolute inset-0" />
        )}

        <div className="absolute top-3 left-3 flex gap-2">
          {producto.nuevo && (
            <span className="rounded-full bg-marca text-white text-xs font-semibold px-2.5 py-1">
              Nuevo
            </span>
          )}
          {enOferta && (
            <span className="rounded-full bg-carbon text-white text-xs font-semibold px-2.5 py-1">
              Oferta
            </span>
          )}
        </div>

        {/* Tallas al hover — lo que Ilusión no tiene */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 group-focus-visible:translate-y-0 transition-transform duration-250 bg-superficie/95 backdrop-blur px-3 py-2 hidden sm:flex items-center gap-2 text-xs">
          <span className="text-tinta-suave">Tallas:</span>
          {producto.tallas.map((t) => {
            const agotada = producto.tallasAgotadas?.includes(t);
            return (
              <span
                key={t}
                className={agotada ? "line-through text-tinta-suave/60" : "font-medium"}
              >
                {t}
              </span>
            );
          })}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-[15px] font-medium leading-snug">{producto.nombre}</h3>
        <p className="mt-0.5 text-[13px] text-tinta-suave">{producto.tela}</p>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-[15px]">
            <span className="font-semibold">{mxn(producto.precioCentavos)}</span>
            {enOferta && (
              <span className="ml-2 text-[13px] text-tinta-suave line-through">
                {mxn(producto.precioAntesCentavos!)}
              </span>
            )}
          </p>
          <div className="flex gap-1" aria-label={`${producto.colores.length} colores`}>
            {producto.colores.slice(0, 4).map((c) => (
              <span
                key={c.nombre}
                title={c.nombre}
                className="h-3.5 w-3.5 rounded-full border border-borde"
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
