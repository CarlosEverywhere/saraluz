import type { Metadata } from "next";
import { SITIO } from "@/lib/config";
import { mxn } from "@/lib/formato";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  robots: { index: false },
};

export default function PaginaTerminos() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 text-[15px] leading-relaxed">
      <h1 className="font-titulo text-4xl">Términos y condiciones</h1>
      <p className="mt-2 text-sm text-tinta-suave">Última actualización: julio de 2026</p>

      <div className="mt-8 space-y-6 text-tinta-suave">
        <section>
          <h2 className="font-titulo text-xl text-tinta">1. Quiénes somos</h2>
          <p className="mt-2">
            Este sitio es operado por {SITIO.nombreLegal} (&quot;Sara Luz&quot;), empresa mexicana
            dedicada a la confección y venta de ropa interior bajo las marcas registradas Sara Luz
            y Josh Men&apos;s.
          </p>
        </section>
        <section>
          <h2 className="font-titulo text-xl text-tinta">2. Precios y pagos</h2>
          <p className="mt-2">
            Todos los precios están en pesos mexicanos (MXN) e incluyen IVA. Los pagos se procesan
            a través de Mercado Pago (tarjeta, OXXO y SPEI). Un pedido se considera confirmado
            únicamente cuando la pasarela acredita el pago.
          </p>
        </section>
        <section>
          <h2 className="font-titulo text-xl text-tinta">3. Envíos</h2>
          <p className="mt-2">
            Enviamos a todo México. Costo de {mxn(SITIO.costoEnvioCentavos)}, gratuito en compras
            desde {mxn(SITIO.envioGratisDesdeCentavos)}. Tiempo estimado de entrega:{" "}
            {SITIO.diasEntrega} a partir de la acreditación del pago. Los tiempos de la paquetería
            pueden variar por causas ajenas a nosotros.
          </p>
        </section>
        <section>
          <h2 className="font-titulo text-xl text-tinta">4. Cambios y devoluciones</h2>
          <p className="mt-2">
            Por higiene, solo se aceptan cambios de prendas sin uso, con etiquetas y empaque
            original, dentro de 30 días naturales. Los defectos de fábrica se cambian sin costo
            alguno para el cliente. Consulta la política completa en la página de Envíos y
            devoluciones.
          </p>
        </section>
        <section>
          <h2 className="font-titulo text-xl text-tinta">5. Disponibilidad</h2>
          <p className="mt-2">
            El catálogo y las existencias pueden cambiar sin previo aviso. Si un artículo pagado no
            puede surtirse, reembolsamos el 100% del importe por el mismo medio de pago.
          </p>
        </section>
        <section>
          <h2 className="font-titulo text-xl text-tinta">6. Propiedad intelectual</h2>
          <p className="mt-2">
            Los logotipos, marcas (Sara Luz M.R. y Josh Men&apos;s M.R.), fotografías y contenidos
            de este sitio son propiedad de {SITIO.nombreLegal} y no pueden reproducirse sin
            autorización por escrito.
          </p>
        </section>
        <section>
          <h2 className="font-titulo text-xl text-tinta">7. Contacto</h2>
          <p className="mt-2">
            Para cualquier aclaración: {SITIO.correo} o WhatsApp desde cualquier página del sitio.
          </p>
        </section>
      </div>
    </div>
  );
}
