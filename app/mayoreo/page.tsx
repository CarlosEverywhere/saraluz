import type { Metadata } from "next";
import { SITIO } from "@/lib/config";
import { linkWhatsApp } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Mayoreo",
  description:
    "Distribuye Sara Luz y Josh Men's en tu boutique o tienda: fábrica mexicana con capacidad de producción, precios de mayoreo y surtido constante.",
};

const VENTAJAS: [string, string][] = [
  [
    "Directo de fábrica",
    "Sin intermediarios: precio real de taller y margen sano para tu negocio.",
  ],
  [
    "Producción constante",
    `${SITIO.aniosExperiencia}+ años fabricando: básicos siempre disponibles para resurtir, no colecciones que desaparecen.`,
  ],
  [
    "Dos marcas registradas",
    "Sara Luz para dama y Josh Men's para caballero: cubres todo el mostrador con un solo proveedor.",
  ],
  [
    "Calidad que fideliza",
    "La tela hace que tus clientes regresen a tu tienda a buscar la misma marca.",
  ],
];

export default function PaginaMayoreo() {
  const mensaje = `Hola ${SITIO.nombre}, tengo un negocio y me interesa el mayoreo. ¿Me comparten lista de precios y mínimos de compra?`;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10">
      <header className="max-w-2xl">
        <p className="text-marca font-semibold text-sm tracking-wide uppercase">Para tu negocio</p>
        <h1 className="mt-1 font-titulo text-4xl sm:text-5xl leading-tight">
          Surte tu tienda directo del taller
        </h1>
        <p className="mt-4 text-lg text-tinta-suave leading-relaxed">
          Boutiques, tiendas de ropa y distribuidores de todo México trabajan con nosotros por una
          razón simple: fabricamos nosotros mismos, así que el precio, el surtido y la calidad
          dependen de nadie más.
        </p>
      </header>

      <section className="mt-10 grid sm:grid-cols-2 gap-4" aria-label="Ventajas del mayoreo">
        {VENTAJAS.map(([titulo, texto]) => (
          <div key={titulo} className="rounded-tarjeta border border-borde bg-superficie p-6">
            <h2 className="font-titulo text-xl">{titulo}</h2>
            <p className="mt-2 text-sm text-tinta-suave leading-relaxed">{texto}</p>
          </div>
        ))}
      </section>

      <section className="mt-10 rounded-tarjeta bg-carbon text-white p-8 sm:p-12" aria-labelledby="como-empezar">
        <h2 id="como-empezar" className="font-titulo text-3xl">
          Cómo empezar
        </h2>
        <ol className="mt-6 grid gap-6 sm:grid-cols-3">
          {[
            ["Escríbenos", "Cuéntanos qué tipo de negocio tienes y en qué ciudad estás."],
            ["Recibe el catálogo", "Te mandamos lista de precios de mayoreo, mínimos y tiempos de resurtido."],
            ["Haz tu primer pedido", "Lo preparamos en el taller y te lo enviamos a cualquier parte del país."],
          ].map(([titulo, texto], i) => (
            <li key={titulo}>
              <p aria-hidden className="font-titulo text-marca text-3xl">{i + 1}</p>
              <h3 className="mt-1 font-semibold">{titulo}</h3>
              <p className="mt-1 text-sm text-white/75 leading-relaxed">{texto}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={linkWhatsApp(mensaje)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-marca px-7 py-3.5 font-semibold text-sm hover:opacity-90 transition-opacity duration-150"
          >
            Solicitar precios de mayoreo
          </a>
          <a
            href={`mailto:${SITIO.correo}?subject=Solicitud de mayoreo`}
            className="rounded-full border border-white/40 px-7 py-3.5 font-semibold text-sm hover:bg-white hover:text-carbon transition-colors duration-150"
          >
            Prefiero correo
          </a>
        </div>
      </section>
    </div>
  );
}
