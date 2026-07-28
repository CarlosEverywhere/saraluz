import type { Metadata } from "next";
import { SITIO } from "@/lib/config";
import { mxn } from "@/lib/formato";
import { linkContactoWhatsApp } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Envíos y devoluciones",
  description: "Tiempos de entrega, costos de envío y política de cambios de Sara Luz.",
};

export default function PaginaEnvios() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
      <h1 className="font-titulo text-4xl">Envíos y devoluciones</h1>

      <section className="mt-8" aria-labelledby="envios">
        <h2 id="envios" className="font-titulo text-2xl">
          Envíos
        </h2>
        <ul className="mt-4 space-y-3 text-[15px] leading-relaxed">
          <li className="rounded-tarjeta border border-borde bg-superficie p-5">
            <strong>Costo:</strong> {mxn(SITIO.costoEnvioCentavos)} a todo México.{" "}
            <strong className="text-exito">
              Gratis en compras desde {mxn(SITIO.envioGratisDesdeCentavos)}.
            </strong>
          </li>
          <li className="rounded-tarjeta border border-borde bg-superficie p-5">
            <strong>Tiempo:</strong> preparamos tu pedido en 1 día hábil y la paquetería entrega en{" "}
            {SITIO.diasEntrega}, según tu código postal.
          </li>
          <li className="rounded-tarjeta border border-borde bg-superficie p-5">
            <strong>Rastreo:</strong> te compartimos el número de guía por correo y WhatsApp en
            cuanto tu paquete sale del taller.
          </li>
        </ul>
      </section>

      <section className="mt-10" aria-labelledby="cambios">
        <h2 id="cambios" className="font-titulo text-2xl">
          Cambios y devoluciones
        </h2>
        <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-tinta-suave">
          <p>
            Por tratarse de prendas íntimas, por higiene solo aceptamos cambios de prendas{" "}
            <strong className="text-tinta">sin uso, con etiquetas y en su empaque original</strong>,
            dentro de los <strong className="text-tinta">30 días naturales</strong> siguientes a la
            entrega.
          </p>
          <p>
            <strong className="text-tinta">Cambio por talla:</strong> lo gestionamos por WhatsApp;
            tú cubres el envío de regreso y nosotros el reenvío de la talla nueva.
          </p>
          <p>
            <strong className="text-tinta">Defecto de fábrica:</strong> si una prenda sale con
            defecto, el cambio corre 100% por nuestra cuenta, envíos incluidos. Nuestra promesa de
            las 100 lavadas también aplica: si la prenda se deforma o pierde el elástico antes de
            100 lavadas con cuidado normal, te la cambiamos.
          </p>
          <p>
            <strong className="text-tinta">Reembolsos:</strong> si tu pedido no puede surtirse, te
            devolvemos el 100% por el mismo medio de pago en un máximo de 7 días hábiles.
          </p>
        </div>
        <a
          href={linkContactoWhatsApp("quiero hacer un cambio de mi pedido.")}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-full bg-exito px-6 py-3 text-white font-semibold text-sm hover:opacity-90 transition-opacity duration-150"
        >
          Iniciar un cambio por WhatsApp
        </a>
      </section>
    </div>
  );
}
