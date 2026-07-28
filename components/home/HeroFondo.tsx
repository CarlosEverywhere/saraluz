"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

export interface EscenaFondo {
  src: string;
  alt: string;
  etiqueta: string;
}

/**
 * Fondo del hero a pantalla completa: las escenas se deslizan solas de
 * derecha a izquierda cada 5.5 s. Sin controles. Con prefers-reduced-motion
 * se queda fija la primera escena.
 *
 * Técnica del clon: se duplica la primera escena al final para que el
 * deslizamiento sea siempre hacia la izquierda; al llegar al clon se salta
 * sin transición al inicio real.
 */
export default function HeroFondo({ escenas }: { escenas: EscenaFondo[] }) {
  const [idx, setIdx] = useState(0);
  const [conTransicion, setConTransicion] = useState(true);
  const [movimientoOk, setMovimientoOk] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = escenas.length;
  const pista = [...escenas, escenas[0]]; // clon al final

  useEffect(() => {
    const ok = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setMovimientoOk(ok);
    if (!ok || total <= 1) return;
    timer.current = setInterval(() => setIdx((i) => i + 1), 5500);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [total]);

  const alTerminarTransicion = useCallback(() => {
    // Si llegamos al clon, saltar al inicio sin que se note
    setIdx((actual) => {
      if (actual >= total) {
        setConTransicion(false);
        requestAnimationFrame(() => requestAnimationFrame(() => setConTransicion(true)));
        return 0;
      }
      return actual;
    });
  }, [total]);

  const visible = idx % total;

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div
        className="flex h-full"
        style={{
          transform: `translateX(-${(movimientoOk ? idx : 0) * 100}%)`,
          transition: conTransicion ? "transform 900ms cubic-bezier(0.2, 0, 0, 1)" : "none",
        }}
        onTransitionEnd={alTerminarTransicion}
      >
        {pista.map((escena, i) => (
          <div key={`${escena.src}-${i}`} className="relative h-full w-full shrink-0">
            <Image
              src={escena.src}
              alt=""
              fill
              priority={i === 0}
              quality={90}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Velo para que el texto del hero siempre sea legible */}
      <div className="absolute inset-0 bg-gradient-to-r from-fondo via-fondo/75 to-fondo/15 lg:to-transparent" />

      {/* Etiqueta de la escena + indicadores */}
      <div className="absolute bottom-5 right-5 flex items-center gap-3">
        <p className="text-[12px] font-medium text-tinta bg-superficie/90 rounded-full px-3 py-1.5">
          {escenas[visible].etiqueta}
        </p>
        <div className="flex gap-1.5">
          {escenas.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === visible ? "w-5 bg-tinta" : "w-1.5 bg-tinta/30"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
