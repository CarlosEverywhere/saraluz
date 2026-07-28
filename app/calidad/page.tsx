import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SITIO } from "@/lib/config";

export const metadata: Metadata = {
  title: "Nuestra tela",
  description:
    "Por qué la tela de Sara Luz es de altísima calidad: algodón peinado, seamless de precisión y elásticos que aguantan +100 lavadas.",
};

const TELAS = [
  {
    nombre: "Licra algodón de origen nacional",
    donde: "La tela de la casa: pantaletas, bikinis, boxers y briefs",
    tono: "#f3d0dd",
    imagen: "/tela/macro-licra.jpg",
    puntos: [
      "Algodón cultivado y procesado en México, mezclado con la licra exacta para que estire contigo y siempre regrese a su forma.",
      "Respira: ideal para uso diario y pieles sensibles.",
      "Comprar tela nacional nos deja revisar cada lote de cerca — y apoyar la cadena textil mexicana.",
    ],
  },
  {
    nombre: "Tejido sin costura de precisión",
    donde: "Toda la línea sin costura",
    tono: "#bfe6e2",
    imagen: "/tela/macro-vino.jpg",
    puntos: [
      "La prenda se teje completa en máquina circular: una sola pieza, cero costuras.",
      "Bordes de corte láser que no se enrollan ni marcan.",
      "Zonas de soporte tejidas directamente en la tela, sin paneles pegados.",
    ],
  },
  {
    nombre: "Encaje elástico forrado",
    donde: "Pantaletas y bikinis con encaje",
    tono: "#ccd9f5",
    imagen: "/tela/macro-forro.jpg",
    puntos: [
      "Encaje que estira con el cuerpo, nunca rígido ni rasposo.",
      "Siempre forrado por dentro con licra algodón: bonito por fuera, cómodo por dentro.",
      "Cosido con puntada elástica para que no truene con el uso.",
    ],
  },
];

const PROCESO = [
  ["Selección de tela", "Elegimos y probamos cada lote de tela antes de cortarlo. Si no pasa la prueba de encogimiento y color, se regresa."],
  ["Corte de precisión", "Patrones perfeccionados durante años para que cada talla siente como hecha a la medida."],
  ["Confección experta", "Operadores con décadas de oficio cosen cada prenda con costuras planas y elásticos encapsulados."],
  ["Control pieza por pieza", "Cada prenda se revisa a mano antes de empacarse. La que no pasa, no sale."],
];

export default function PaginaCalidad() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      <header className="max-w-2xl">
        <p className="text-marca font-semibold text-sm tracking-wide uppercase">
          Nuestra obsesión
        </p>
        <h1 className="mt-1 font-titulo text-4xl sm:text-5xl leading-tight">
          Tela de altísima calidad, sin letras chiquitas
        </h1>
        <p className="mt-4 text-lg text-tinta-suave leading-relaxed">
          Cualquiera puede decir “calidad premium”. Nosotros preferimos explicarte exactamente qué
          tela usamos, por qué la elegimos y qué vas a notar tú. {SITIO.aniosExperiencia} años de
          manufactura nos enseñaron que la prenda íntima perfecta empieza en el tejido.
        </p>
      </header>

      {/* Telas */}
      <section className="mt-12 grid gap-6 lg:grid-cols-3" aria-label="Nuestras telas">
        {TELAS.map((tela) => (
          <article key={tela.nombre} className="rounded-tarjeta border border-borde overflow-hidden bg-superficie">
            <div className="relative h-44" style={{ backgroundColor: tela.tono }}>
              <Image
                src={tela.imagen}
                alt={`Macrofotografía real al microscopio: ${tela.nombre}`}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
              />
              <p className="absolute bottom-3 left-3 text-[11px] font-medium bg-superficie/90 rounded-full px-2.5 py-1 text-tinta">
                Foto real al microscopio
              </p>
            </div>
            <div className="p-6">
              <h2 className="font-titulo text-xl leading-snug">{tela.nombre}</h2>
              <p className="mt-1 text-[13px] text-marca font-medium">{tela.donde}</p>
              <ul className="mt-4 space-y-2.5">
                {tela.puntos.map((p) => (
                  <li key={p} className="flex gap-2 text-sm text-tinta-suave leading-relaxed">
                    <span aria-hidden className="text-exito font-bold shrink-0">✓</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>

      {/* Proceso */}
      <section className="mt-16" aria-labelledby="proceso">
        <h2 id="proceso" className="font-titulo text-3xl">
          Del hilo a tu cajón: nuestro proceso
        </h2>
        <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESO.map(([titulo, texto], i) => (
            <li key={titulo} className="relative rounded-tarjeta border border-borde bg-superficie p-6">
              <span aria-hidden className="font-titulo text-5xl text-marca/25 absolute top-4 right-5">
                {i + 1}
              </span>
              <h3 className="font-titulo text-lg pr-10">{titulo}</h3>
              <p className="mt-2 text-sm text-tinta-suave leading-relaxed">{texto}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* La promesa */}
      <section className="mt-16 rounded-tarjeta bg-carbon text-white p-8 sm:p-12 text-center">
        <h2 className="font-titulo text-3xl">La promesa de las 100 lavadas</h2>
        <p className="mt-3 text-white/80 max-w-xl mx-auto leading-relaxed">
          Si una prenda Sara Luz o Josh Men's se deforma, destiñe o pierde el elástico antes de
          100 lavadas con cuidado normal, te la cambiamos. Así de segura está nuestra tela.
        </p>
        <Link
          href="/tienda"
          className="mt-7 inline-block rounded-full bg-marca px-8 py-4 font-semibold hover:opacity-90 transition-opacity duration-150"
        >
          Probar la diferencia
        </Link>
      </section>
    </div>
  );
}
