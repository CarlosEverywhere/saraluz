"use client";

import { useState } from "react";
import { linkWhatsApp } from "@/lib/whatsapp";
import { SITIO } from "@/lib/config";

/**
 * Fase 1: el formulario arma el mensaje y lo abre en WhatsApp (respuesta en
 * horas, no días). Fase 2: guardar también en BD + correo transaccional.
 */
export default function FormularioContacto() {
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviado, setEnviado] = useState(false);

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    const texto = `Hola ${SITIO.nombre}, soy ${nombre}.\n\n${mensaje}`;
    window.open(linkWhatsApp(texto), "_blank", "noopener,noreferrer");
    setEnviado(true);
  }

  if (enviado) {
    return (
      <div role="status" className="rounded-tarjeta bg-exito/10 border border-exito/30 p-6">
        <p className="font-semibold text-exito">Tu mensaje se abrió en WhatsApp</p>
        <p className="mt-1 text-sm text-tinta-suave">
          Solo dale enviar ahí y te respondemos en menos de 24 horas hábiles. Si prefieres,
          escríbenos a{" "}
          <a href={`mailto:${SITIO.correo}`} className="text-acento underline">
            {SITIO.correo}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setEnviado(false)}
          className="mt-3 text-sm text-acento underline"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={enviar} className="space-y-4">
      <div>
        <label htmlFor="c-nombre" className="block text-sm font-medium">
          Tu nombre
        </label>
        <input
          id="c-nombre"
          required
          minLength={2}
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="mt-1.5 w-full rounded-control border border-borde bg-superficie px-4 py-3 text-sm"
          placeholder="¿Cómo te llamas?"
        />
      </div>
      <div>
        <label htmlFor="c-mensaje" className="block text-sm font-medium">
          ¿En qué te ayudamos?
        </label>
        <textarea
          id="c-mensaje"
          required
          minLength={10}
          rows={4}
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          className="mt-1.5 w-full rounded-control border border-borde bg-superficie px-4 py-3 text-sm resize-y"
          placeholder="Cuéntanos tu duda: tallas, pedidos, facturación, mayoreo…"
        />
      </div>
      <button
        type="submit"
        className="w-full sm:w-auto rounded-full bg-acento px-8 py-3.5 text-white font-semibold text-sm hover:bg-acento-hover transition-colors duration-150"
      >
        Enviar por WhatsApp
      </button>
      <p className="text-[12px] text-tinta-suave">
        Respondemos en menos de 24 horas hábiles. Tus datos solo se usan para contestarte —{" "}
        <a href="/aviso-de-privacidad" className="underline">
          aviso de privacidad
        </a>
        .
      </p>
    </form>
  );
}
