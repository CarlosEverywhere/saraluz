import type { Metadata } from "next";
import { SITIO } from "@/lib/config";

export const metadata: Metadata = {
  title: "Aviso de privacidad",
  robots: { index: false },
};

export default function PaginaPrivacidad() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 text-[15px] leading-relaxed">
      <h1 className="font-titulo text-4xl">Aviso de privacidad</h1>
      <p className="mt-2 text-sm text-tinta-suave">Última actualización: julio de 2026</p>

      <div className="mt-8 space-y-6 text-tinta-suave">
        <section>
          <h2 className="font-titulo text-xl text-tinta">Responsable</h2>
          <p className="mt-2">
            {SITIO.nombreLegal}, con domicilio en {SITIO.direccion}, es responsable del tratamiento
            de tus datos personales conforme a la Ley Federal de Protección de Datos Personales en
            Posesión de los Particulares (LFPDPPP). Contacto: {SITIO.correo}.
          </p>
        </section>
        <section>
          <h2 className="font-titulo text-xl text-tinta">Datos que recabamos</h2>
          <p className="mt-2">
            Nombre, correo electrónico, teléfono y dirección de entrega, proporcionados por ti al
            comprar o contactarnos. Los datos de tu tarjeta los procesa directamente Mercado Pago;
            nosotros nunca los vemos ni los almacenamos.
          </p>
        </section>
        <section>
          <h2 className="font-titulo text-xl text-tinta">Finalidades</h2>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>Procesar, enviar y dar seguimiento a tus pedidos.</li>
            <li>Atender dudas, cambios y aclaraciones.</li>
            <li>Con tu consentimiento, enviarte novedades y promociones (puedes darte de baja cuando quieras).</li>
          </ul>
        </section>
        <section>
          <h2 className="font-titulo text-xl text-tinta">Transferencias</h2>
          <p className="mt-2">
            Solo compartimos los datos indispensables con la pasarela de pago (Mercado Pago) y la
            paquetería que entrega tu pedido. No vendemos ni rentamos tus datos a terceros.
          </p>
        </section>
        <section>
          <h2 className="font-titulo text-xl text-tinta">Derechos ARCO</h2>
          <p className="mt-2">
            Puedes ejercer tus derechos de Acceso, Rectificación, Cancelación y Oposición
            escribiendo a {SITIO.correo}. Respondemos en un máximo de 20 días hábiles.
          </p>
        </section>
        <section>
          <h2 className="font-titulo text-xl text-tinta">Cambios a este aviso</h2>
          <p className="mt-2">
            Cualquier modificación se publicará en esta misma página con su fecha de actualización.
          </p>
        </section>
      </div>
    </div>
  );
}
