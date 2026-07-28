import type { Metadata } from "next";
import Image from "next/image";
import { nuevos } from "@/lib/productos";
import ProductCard from "@/components/producto/ProductCard";
import Newsletter from "@/components/home/Newsletter";

export const metadata: Metadata = {
  title: "Novedades",
  description:
    "Los lanzamientos más recientes de Sara Luz y Josh Men's: nuevas telas, nuevos cortes, la misma calidad mexicana.",
};

export default function PaginaNovedades() {
  const lista = nuevos();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      <header className="grid gap-8 lg:grid-cols-2 items-center rounded-tarjeta overflow-hidden border border-borde bg-superficie">
        <div className="p-8 sm:p-12">
          <p className="text-marca font-semibold text-sm tracking-wide uppercase">
            Recién salidas del taller
          </p>
          <h1 className="mt-1 font-titulo text-4xl">Novedades</h1>
          <p className="mt-3 text-tinta-suave leading-relaxed">
            Cada temporada estrenamos cortes y telas nuevas — siempre probadas primero por
            nuestro propio equipo antes de llegar a tu cajón. La seguridad de estrenar algo que
            sabes que te va a quedar.
          </p>
        </div>
        <div className="relative min-h-80 lg:min-h-96">
          <Image
            src="/campana/novedades-ximena.jpg"
            alt="Ximena, modelo Sara Luz, con conjunto de encaje y bata de seda"
            fill
            priority
            quality={90}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-top"
          />
        </div>
      </header>

      {lista.length === 0 ? (
        <div className="mt-16 text-center max-w-md mx-auto">
          <p className="font-titulo text-2xl">Estamos cosiendo la próxima colección</p>
          <p className="mt-2 text-tinta-suave text-sm">
            Suscríbete abajo y sé la primera persona en enterarse del lanzamiento.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {lista.map((p) => (
            <ProductCard key={p.slug} producto={p} />
          ))}
        </div>
      )}

      <section
        className="mt-20 grid gap-8 lg:grid-cols-2 items-center rounded-tarjeta overflow-hidden border border-borde bg-superficie"
        aria-labelledby="proximamente"
      >
        <div className="relative min-h-80 order-last lg:order-first">
          <Image
            src="/campana/comodidad-sofia.jpg"
            alt="Sofía, modelo Sara Luz, en un domingo cómodo con suéter y café"
            fill
            quality={90}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-top"
          />
        </div>
        <div className="p-8 sm:p-12 text-center lg:text-left">
          <h2 id="proximamente" className="font-titulo text-2xl">
            Próximamente
          </h2>
          <p className="mt-2 text-tinta-suave text-sm leading-relaxed">
            Bralettes sin costura y la nueva línea deportiva Josh Men's están en producción.
            Déjanos tu correo y te avisamos en cuanto salgan (con descuento de estreno). Mientras,
            la comodidad de siempre te espera en la tienda.
          </p>
          <Newsletter />
        </div>
      </section>
    </div>
  );
}
