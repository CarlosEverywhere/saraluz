import Link from "next/link";
import Image from "next/image";
import { CATEGORIAS, destacados, nuevos, type Categoria } from "@/lib/productos";
import { SITIO } from "@/lib/config";
import ProductCard from "@/components/producto/ProductCard";
import Newsletter from "@/components/home/Newsletter";
import HeroFondo, { type EscenaFondo } from "@/components/home/HeroFondo";

const ESCENAS_HERO: EscenaFondo[] = [
  { src: "/campana/fondo/fondo-estudio.jpg", alt: "Verónica con conjunto de encaje rosa Sara Luz", etiqueta: "Colección Sara Luz" },
  { src: "/campana/fondo/fondo-cafeteria.jpg", alt: "Sofía en una cafetería", etiqueta: "Para tu día a día" },
  { src: "/campana/fondo/fondo-antro-v2.jpg", alt: "Amigas bailando en un centro nocturno", etiqueta: "Seguridad que se nota" },
  { src: "/campana/fondo/fondo-concierto.jpg", alt: "Entre la multitud de un concierto", etiqueta: "Libertad de movimiento" },
  { src: "/campana/fondo/fondo-lectura.jpg", alt: "Sofía leyendo en cama", etiqueta: "Comodidad real" },
  { src: "/campana/fondo/fondo-picnic.jpg", alt: "Verónica en un picnic", etiqueta: "Hecha para durar" },
  { src: "/campana/fondo/fondo-rooftop.jpg", alt: "Ximena en un rooftop de noche", etiqueta: "Tu mejor versión" },
  { src: "/campana/fondo/fondo-libreria.jpg", alt: "Modelo Sara Luz en una librería", etiqueta: "A tu ritmo" },
  { src: "/campana/fondo/fondo-atardecer.jpg", alt: "Modelo Sara Luz caminando al atardecer", etiqueta: "Siéntete libre" },
];

const VALORES: { valor: string; frase: string; imagen: string }[] = [
  { valor: "Seguridad", frase: "Para moverte sin pensar en lo que traes puesto", imagen: "/campana/valores2/seguridad-e.jpg" },
  { valor: "Comodidad", frase: "La que se siente desde la primera puesta", imagen: "/campana/valores2/comodidad-c.jpg" },
  { valor: "Frescura", frase: "Tela que respira contigo toda la noche", imagen: "/campana/valores2/frescura-c.jpg" },
  { valor: "Sensualidad", frase: "Ese secreto que solo tú conoces", imagen: "/campana/valores2/sensualidad.jpg" },
  { valor: "Calidad", frase: "Aguanta +100 lavadas sin deformarse", imagen: "/campana/valores2/calidad-f.jpg" },
];

const CATEGORIAS_RAPIDAS: Categoria[] = ["pantaletas", "bikinis", "sin-costura", "boxers", "briefs"];

const RESENAS = [
  {
    texto:
      "Llevo años comprando marcas caras y estas pantaletas les ganan en tela. Se sienten nuevas después de meses de lavadas.",
    autora: "Mariana G.",
    ciudad: "Guadalajara",
  },
  {
    texto:
      "Los boxers Josh Men's no se suben ni se tuercen. Compré un paquete para probar y regresé por tres más.",
    autora: "Ricardo T.",
    ciudad: "Monterrey",
  },
  {
    texto:
      "La línea sin costura es otra cosa: de verdad no se marca nada. Y saber que está hecho en México, mejor.",
    autora: "Fernanda L.",
    ciudad: "CDMX",
  },
];

export default function Inicio() {
  const novedades = nuevos().slice(0, 4);
  const masVendidos = destacados().slice(0, 4);

  return (
    <>
      {/* HERO a pantalla completa con escenas deslizándose */}
      <section className="relative h-[78vh] min-h-[560px] max-h-[860px] overflow-hidden">
        <HeroFondo escenas={ESCENAS_HERO} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 h-full flex items-center">
          <div className="max-w-xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-borde bg-superficie px-4 py-1.5 text-[13px] font-medium">
              Hecho en México · {SITIO.aniosExperiencia}+ años de oficio
            </p>
            <h1 className="mt-5 font-titulo text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
              Ropa interior mexicana{" "}
              <em className="text-marca font-titulo italic">hecha para durar</em>
            </h1>
            <p className="mt-5 text-lg text-tinta-suave max-w-lg leading-relaxed">
              Tela de altísima calidad, cortada y cosida por equipos profesionales que llevan
              décadas perfeccionando el oficio. Comodidad que se nota desde la primera puesta.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/tienda"
                className="rounded-full bg-acento px-8 py-4 text-white font-semibold hover:bg-acento-hover transition-colors duration-150"
              >
                Comprar ahora
              </Link>
              <Link
                href="/calidad"
                className="rounded-full border border-tinta px-8 py-4 font-semibold hover:bg-tinta hover:text-white transition-colors duration-150 bg-superficie/70"
              >
                Conoce nuestra tela
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SELLOS DE CONFIANZA */}
      <section aria-label="Por qué comprar con nosotros" className="border-y border-borde bg-superficie">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 grid sm:grid-cols-3 gap-6 text-center">
          {[
            ["Empresa 100% mexicana", "Diseñado y confeccionado en nuestro taller"],
            [`${SITIO.aniosExperiencia}+ años de manufactura`, "Equipos profesionales capacitados"],
            ["Tela de altísima calidad", "Aguanta +100 lavadas sin deformarse"],
          ].map(([titulo, sub]) => (
            <div key={titulo}>
              <p className="font-titulo text-lg">{titulo}</p>
              <p className="text-[13px] text-tinta-suave mt-0.5">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* LO QUE REPRESENTAMOS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14" aria-labelledby="valores">
        <h2 id="valores" className="font-titulo text-3xl">
          Lo que llevas puesto, se siente
        </h2>
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-5 gap-4">
          {VALORES.map(({ valor, frase, imagen }) => (
            <figure
              key={valor}
              className="relative aspect-[1/2] rounded-tarjeta overflow-hidden border border-borde"
            >
              <Image
                src={imagen}
                alt={`${valor}: ${frase}`}
                fill
                quality={90}
                sizes="(max-width: 1024px) 50vw, 20vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-carbon/60 via-transparent to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-4">
                <p className="font-titulo text-xl text-white drop-shadow">{valor}</p>
                <p className="mt-0.5 text-[12px] text-white/85 leading-snug hidden sm:block">
                  {frase}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="text-sm text-tinta-suave mr-1">Ir directo a:</span>
          {CATEGORIAS_RAPIDAS.map((cat) => (
            <Link
              key={cat}
              href={`/tienda/${CATEGORIAS[cat].departamento}?categoria=${cat}`}
              className="rounded-full border border-borde bg-superficie px-4 py-2 text-sm font-medium hover:border-tinta transition-colors duration-150"
            >
              {CATEGORIAS[cat].nombre}
            </Link>
          ))}
        </div>
      </section>

      {/* NOVEDADES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-6" aria-labelledby="novedades">
        <div className="flex items-end justify-between gap-4">
          <h2 id="novedades" className="font-titulo text-3xl">
            Novedades
          </h2>
          <Link href="/novedades" className="text-acento font-medium underline text-sm">
            Ver todas
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {novedades.map((p) => (
            <ProductCard key={p.slug} producto={p} />
          ))}
        </div>
      </section>

      {/* LA TELA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14" aria-labelledby="la-tela">
        <div className="grid lg:grid-cols-2 rounded-tarjeta overflow-hidden border border-borde">
          <div className="relative min-h-72">
            <Image
              src="/tela/macro-blanca-home.jpg"
              alt="Macrofotografía real al microscopio de la licra algodón Sara Luz"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <p className="absolute bottom-4 left-4 text-[12px] font-medium text-tinta bg-superficie/90 rounded-full px-3 py-1">
              Nuestra tela real, vista al microscopio
            </p>
          </div>
          <div className="bg-carbon text-white p-8 sm:p-12">
            <h2 id="la-tela" className="font-titulo text-3xl leading-tight">
              La tela es el 90% de una buena prenda íntima
            </h2>
            <ul className="mt-6 space-y-4 text-white/85">
              <li className="flex gap-3">
                <span aria-hidden className="font-titulo text-marca text-xl leading-none">01</span>
                Licra algodón de origen nacional: suave, transpirable y con la elasticidad justa,
                apoyando la cadena textil mexicana.
              </li>
              <li className="flex gap-3">
                <span aria-hidden className="font-titulo text-marca text-xl leading-none">02</span>
                Tejido seamless de precisión: prendas de una sola pieza, sin costuras que marquen
                o rocen.
              </li>
              <li className="flex gap-3">
                <span aria-hidden className="font-titulo text-marca text-xl leading-none">03</span>
                Elásticos encapsulados que sobreviven a +100 lavadas sin aflojarse ni enrollarse.
              </li>
            </ul>
            <Link
              href="/calidad"
              className="mt-8 inline-block rounded-full border border-white px-6 py-3 font-semibold text-sm hover:bg-white hover:text-carbon transition-colors duration-150"
            >
              Así hacemos nuestra tela
            </Link>
          </div>
        </div>
      </section>

      {/* SOMOS MEXICANOS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-6" aria-labelledby="somos">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 id="somos" className="font-titulo text-3xl leading-tight">
              {SITIO.aniosExperiencia} años cosiendo confianza en México
            </h2>
            <p className="mt-4 text-tinta-suave leading-relaxed max-w-lg">
              {SITIO.nombreLegal} nació como un taller familiar y hoy es un equipo de
              profesionales capacitados que dominan cada paso: del hilo a la prenda terminada.
              Cada pieza pasa por manos que conocen su oficio.
            </p>
            <Link href="/nosotros" className="mt-5 inline-block text-acento font-semibold underline">
              Conoce nuestra historia →
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              ["Taller propio", "#f3d0dd"],
              ["Control de calidad pieza por pieza", "#bfe6e2"],
              ["Equipo con décadas de oficio", "#ccd9f5"],
            ].map(([texto, tono]) => (
              <div
                key={texto}
                className="aspect-[3/4] rounded-tarjeta grid place-items-end p-3"
                style={{ backgroundColor: tono }}
              >
                <p className="text-[12px] font-medium bg-superficie/85 rounded-control px-2 py-1">
                  {texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MÁS VENDIDOS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14" aria-labelledby="vendidos">
        <h2 id="vendidos" className="font-titulo text-3xl">
          Los que nunca fallan
        </h2>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {masVendidos.map((p) => (
            <ProductCard key={p.slug} producto={p} />
          ))}
        </div>
      </section>

      {/* RESEÑAS */}
      <section className="bg-superficie border-y border-borde" aria-labelledby="resenas">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
          <h2 id="resenas" className="font-titulo text-3xl">
            Lo que dicen nuestros clientes
          </h2>
          <div className="mt-6 grid md:grid-cols-3 gap-5">
            {RESENAS.map((r) => (
              <figure key={r.autora} className="rounded-tarjeta border border-borde bg-fondo p-6">
                <p aria-hidden className="text-marca text-lg tracking-wider">
                  ★★★★★
                </p>
                <blockquote className="mt-3 text-[15px] leading-relaxed">
                  “{r.texto}”
                </blockquote>
                <figcaption className="mt-4 text-sm text-tinta-suave">
                  <strong className="text-tinta font-medium">{r.autora}</strong> · {r.ciudad}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER + CIERRE */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 py-16 text-center" aria-labelledby="cierre">
        <h2 id="cierre" className="font-titulo text-3xl">
          Estrena calidad mexicana
        </h2>
        <p className="mt-3 text-tinta-suave">
          Suscríbete y recibe 10% de descuento en tu primera compra, además de acceso anticipado
          a lanzamientos.
        </p>
        <Newsletter />
        <div className="mt-10">
          <Link
            href="/tienda"
            className="inline-block rounded-full bg-acento px-8 py-4 text-white font-semibold hover:bg-acento-hover transition-colors duration-150"
          >
            Comprar ahora
          </Link>
        </div>
      </section>
    </>
  );
}
