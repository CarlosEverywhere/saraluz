import type { Metadata } from "next";
import Image from "next/image";
import { SITIO } from "@/lib/config";
import { linkContactoWhatsApp } from "@/lib/whatsapp";
import FormularioContacto from "@/components/nosotros/FormularioContacto";

export const metadata: Metadata = {
  title: "Nosotros",
  description: `${SITIO.nombreLegal}: ${SITIO.aniosExperiencia} años confeccionando ropa interior en México con equipos profesionales capacitados.`,
};

const HITOS = [
  ["El taller familiar", "Sara Luz nace como un taller de confección familiar, con unas cuantas máquinas y una idea fija: la prenda íntima se nota cuando está bien hecha."],
  ["Crecemos con el oficio", "El equipo crece con operadores que se forman dentro del taller. Nace la especialidad de la casa: básicos que aguantan años, no temporadas."],
  ["Nace Josh Men's", "Lanzamos la línea de caballero con identidad propia: boxers y briefs con soporte real y pretina que no afloja."],
  ["Hoy", `Somos un equipo de profesionales capacitados con ${SITIO.aniosExperiencia}+ años de experiencia acumulada, y por primera vez llevamos el taller directo a tu casa con esta tienda en línea.`],
];

const NUMEROS: [string, string][] = [
  [`${SITIO.aniosExperiencia}+`, "años de manufactura"],
  ["100%", "hecho en México"],
  ["2", "marcas propias registradas"],
  ["1×1", "control de calidad por pieza"],
];

export default function PaginaNosotros() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      <header className="max-w-2xl">
        <p className="text-marca font-semibold text-sm tracking-wide uppercase">Nuestra historia</p>
        <h1 className="mt-1 font-titulo text-4xl sm:text-5xl leading-tight">
          Un taller mexicano que se tomó en serio la ropa interior
        </h1>
        <p className="mt-4 text-lg text-tinta-suave leading-relaxed">
          {SITIO.nombreLegal} es una empresa 100% mexicana. Llevamos {SITIO.aniosExperiencia} años
          perfeccionando lo que casi nadie ve pero todos sienten: la prenda que usas debajo de todo.
        </p>
      </header>

      {/* Números */}
      <section aria-label="Sara Luz en números" className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {NUMEROS.map(([cifra, texto]) => (
          <div key={texto} className="rounded-tarjeta border border-borde bg-superficie p-6 text-center">
            <p className="font-titulo text-4xl text-marca">{cifra}</p>
            <p className="mt-1 text-sm text-tinta-suave">{texto}</p>
          </div>
        ))}
      </section>

      {/* Línea de tiempo */}
      <section className="mt-16 max-w-3xl" aria-labelledby="historia">
        <h2 id="historia" className="font-titulo text-3xl">
          El camino
        </h2>
        <ol className="mt-8 relative border-l-2 border-marca/30 space-y-10 pl-8">
          {HITOS.map(([titulo, texto]) => (
            <li key={titulo} className="relative">
              <span aria-hidden className="absolute -left-[41px] top-1 h-4 w-4 rounded-full bg-marca border-4 border-fondo" />
              <h3 className="font-titulo text-xl">{titulo}</h3>
              <p className="mt-1.5 text-tinta-suave leading-relaxed">{texto}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Las dos marcas */}
      <section className="mt-16 grid gap-6 md:grid-cols-2" aria-label="Nuestras marcas">
        <article className="rounded-tarjeta border border-borde bg-superficie p-8 text-center">
          <Image
            src="/marca/saraluz.png"
            alt="Confecciones Sara Luz"
            width={220}
            height={202}
            className="mx-auto h-28 w-auto"
          />
          <h2 className="mt-4 font-titulo text-2xl">Sara Luz</h2>
          <p className="mt-2 text-sm text-tinta-suave leading-relaxed">
            La línea femenina: pantaletas, bikinis y prendas sin costura donde la suavidad de la
            tela manda. La paloma del logo es nuestra promesa de ligereza.
          </p>
        </article>
        <article className="rounded-tarjeta bg-carbon text-white p-8 text-center">
          <Image
            src="/marca/joshmens.png"
            alt="Josh Men's — Bikers Cruz"
            width={220}
            height={180}
            className="mx-auto h-28 w-auto brightness-0 invert"
          />
          <h2 className="mt-4 font-titulo text-2xl">Josh Men's</h2>
          <p className="mt-2 text-sm text-white/75 leading-relaxed">
            La línea de caballero con carácter propio: boxers y briefs con soporte real, hechos
            para el ritmo de todos los días — del taller a la carretera.
          </p>
        </article>
      </section>

      {/* El equipo */}
      <section className="mt-16" aria-labelledby="equipo">
        <h2 id="equipo" className="font-titulo text-3xl">
          Manos que saben lo que hacen
        </h2>
        <p className="mt-3 text-tinta-suave max-w-2xl leading-relaxed">
          Nuestro equipo de confección se forma dentro del taller: años de capacitación en corte,
          costura plana, elásticos y control de calidad. Ese oficio no se improvisa, y es la razón
          de que una prenda nuestra se sienta distinta desde que la tomas.
        </p>
        <div className="mt-6 grid grid-cols-3 gap-3 max-w-3xl">
          {[
            ["Área de corte", "#e8d5bd"],
            ["Línea de costura", "#d9b49a"],
            ["Control de calidad", "#c69a7d"],
          ].map(([texto, tono]) => (
            <div
              key={texto}
              className="aspect-[4/3] rounded-tarjeta grid place-items-end p-3"
              style={{ backgroundColor: tono }}
            >
              <p className="text-[12px] font-medium bg-superficie/85 rounded-control px-2 py-1">
                {texto} · foto próximamente
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="mt-20 scroll-mt-24" aria-labelledby="contacto-titulo">
        <div className="grid gap-10 lg:grid-cols-2 rounded-tarjeta border border-borde bg-superficie p-8 sm:p-12">
          <div>
            <h2 id="contacto-titulo" className="font-titulo text-3xl">
              Hablemos
            </h2>
            <p className="mt-3 text-tinta-suave leading-relaxed">
              ¿Dudas de talla, pedidos, facturación o mayoreo? Escríbenos por donde te quede más
              cómodo — contestamos rápido y con gusto.
            </p>
            <ul className="mt-6 space-y-4 text-[15px]">
              <li>
                <p className="text-[13px] text-tinta-suave">WhatsApp (lo más rápido)</p>
                <a
                  href={linkContactoWhatsApp()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-exito underline"
                >
                  Enviar WhatsApp ahora
                </a>
              </li>
              <li>
                <p className="text-[13px] text-tinta-suave">Correo</p>
                <a href={`mailto:${SITIO.correo}`} className="font-semibold text-acento underline">
                  {SITIO.correo}
                </a>
              </li>
              <li>
                <p className="text-[13px] text-tinta-suave">Teléfono</p>
                <a href={`tel:+52${SITIO.telefono.replace(/\D/g, "")}`} className="font-semibold">
                  {SITIO.telefono}
                </a>
              </li>
              <li>
                <p className="text-[13px] text-tinta-suave">Taller</p>
                <p className="font-medium">{SITIO.direccion}</p>
              </li>
            </ul>
            <p className="mt-6 text-[13px] text-tinta-suave">
              Horario de atención: lunes a viernes de 9:00 a 18:00, sábado de 9:00 a 14:00 (centro
              de México).
            </p>
          </div>
          <FormularioContacto />
        </div>
      </section>
    </div>
  );
}
