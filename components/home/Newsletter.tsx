"use client";

import { useState } from "react";

/**
 * Fase 1: guarda la intención localmente y confirma. Fase 2: conectar a un
 * proveedor de correo (Resend/Brevo) vía route handler.
 */
export default function Newsletter() {
  const [correo, setCorreo] = useState("");
  const [estado, setEstado] = useState<"inicial" | "listo">("inicial");

  function suscribir(e: React.FormEvent) {
    e.preventDefault();
    try {
      const lista: string[] = JSON.parse(localStorage.getItem("newsletter-saraluz") ?? "[]");
      if (!lista.includes(correo)) lista.push(correo);
      localStorage.setItem("newsletter-saraluz", JSON.stringify(lista));
    } catch {
      // sin almacenamiento disponible; igual confirmamos la intención
    }
    setEstado("listo");
  }

  if (estado === "listo") {
    return (
      <p
        role="status"
        className="mt-6 rounded-tarjeta bg-exito/10 text-exito font-medium px-6 py-4 max-w-md mx-auto"
      >
        ¡Listo! Usa el código <strong>BIENVENIDA10</strong> en tu primera compra.
      </p>
    );
  }

  return (
    <form onSubmit={suscribir} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <label htmlFor="correo-nl" className="sr-only">
        Tu correo electrónico
      </label>
      <input
        id="correo-nl"
        type="email"
        required
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        placeholder="tu@correo.com"
        className="flex-1 rounded-full border border-borde bg-superficie px-5 py-3.5 text-sm"
      />
      <button
        type="submit"
        className="rounded-full bg-acento px-7 py-3.5 text-white font-semibold text-sm hover:bg-acento-hover transition-colors duration-150"
      >
        Quiero mi 10%
      </button>
    </form>
  );
}
