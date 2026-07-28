"use client";

import { useState } from "react";
import Image from "next/image";
import type { Producto } from "@/lib/productos";
import PlaceholderPrenda from "./PlaceholderPrenda";

const VISTAS = ["Frente", "Espalda", "Detalle de tela", "En contexto"];

export default function GaleriaProducto({ producto }: { producto: Producto }) {
  const [activa, setActiva] = useState(0);
  const fotos = producto.imagenes ?? [];

  return (
    <div>
      <div className="relative aspect-[4/5] rounded-tarjeta overflow-hidden border border-borde bg-superficie">
        {fotos[activa] ? (
          <Image
            src={fotos[activa]}
            alt={`${producto.nombre} — ${VISTAS[activa] ?? `vista ${activa + 1}`}`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            className="object-cover"
          />
        ) : (
          <PlaceholderPrenda producto={producto} variante={activa} className="absolute inset-0" />
        )}
      </div>
      <div className="mt-3 grid grid-cols-4 gap-3">
        {VISTAS.map((vista, i) => (
          <button
            key={vista}
            type="button"
            onClick={() => setActiva(i)}
            aria-label={`Ver ${vista}`}
            aria-current={activa === i}
            className={`relative aspect-square rounded-control overflow-hidden border transition-colors duration-150 ${
              activa === i ? "border-acento ring-1 ring-acento" : "border-borde hover:border-tinta-suave"
            }`}
          >
            {fotos[i] ? (
              <Image src={fotos[i]} alt="" fill sizes="10vw" className="object-cover" />
            ) : (
              <PlaceholderPrenda producto={producto} variante={i} className="absolute inset-0" />
            )}
          </button>
        ))}
      </div>
      {!fotos.length && (
        <p className="mt-2 text-[12px] text-tinta-suave">
          Fotografía profesional próximamente — los tonos mostrados son los colores reales de la tela.
        </p>
      )}
    </div>
  );
}
