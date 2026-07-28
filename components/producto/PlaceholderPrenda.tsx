import Image from "next/image";
import type { Producto } from "@/lib/productos";
import { CATEGORIAS } from "@/lib/productos";

/**
 * Mientras no hay fotografía real, cada producto se muestra como un bloque de
 * tono de tela con la paloma de la marca como marca de agua. Cuando se suban
 * fotos (producto.imagenes), este componente deja de usarse solo.
 */
export default function PlaceholderPrenda({
  producto,
  variante = 0,
  className = "",
}: {
  producto: Producto;
  variante?: number;
  className?: string;
}) {
  const color = producto.colores[variante % producto.colores.length] ?? producto.colores[0];
  const esOscuro = esColorOscuro(color.hex);
  const esCaballero = producto.departamento === "caballero";
  // Solo aporta su propio contexto de posicionamiento si el caller no lo define
  const posicion = className.includes("absolute") ? "" : "relative";

  return (
    <div
      className={`${posicion} overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(150deg, ${color.hex} 0%, ${sombrear(color.hex, -14)} 100%)`,
      }}
      role="img"
      aria-label={`${producto.nombre} — foto próximamente`}
    >
      <Image
        src={esCaballero ? "/marca/joshmens.png" : "/marca/saraluz.png"}
        alt=""
        aria-hidden
        width={200}
        height={185}
        className={`absolute right-[-8%] bottom-[-6%] w-3/5 h-auto opacity-[0.14] ${
          esOscuro ? "brightness-0 invert" : "brightness-0"
        }`}
      />
      <div className="absolute inset-0 flex flex-col justify-end p-4">
        <p
          className={`font-titulo italic text-sm ${esOscuro ? "text-white/85" : "text-tinta/70"}`}
        >
          {CATEGORIAS[producto.categoria].nombre} · {color.nombre}
        </p>
      </div>
    </div>
  );
}

function esColorOscuro(hex: string): boolean {
  const n = hex.replace("#", "");
  const r = parseInt(n.slice(0, 2), 16);
  const g = parseInt(n.slice(2, 4), 16);
  const b = parseInt(n.slice(4, 6), 16);
  return r * 0.299 + g * 0.587 + b * 0.114 < 140;
}

function sombrear(hex: string, pct: number): string {
  const n = hex.replace("#", "");
  const canal = (i: number) => {
    const v = parseInt(n.slice(i, i + 2), 16);
    return Math.min(255, Math.max(0, Math.round(v * (1 + pct / 100))));
  };
  return `rgb(${canal(0)}, ${canal(2)}, ${canal(4)})`;
}
