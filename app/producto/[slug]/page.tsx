import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CATEGORIAS, DEPARTAMENTOS, porCategoria, porSlug, PRODUCTOS } from "@/lib/productos";
import { mxn } from "@/lib/formato";
import { SITIO } from "@/lib/config";
import GaleriaProducto from "@/components/producto/GaleriaProducto";
import SelectorCompra from "@/components/producto/SelectorCompra";
import ProductCard from "@/components/producto/ProductCard";

export function generateStaticParams() {
  return PRODUCTOS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const producto = porSlug(slug);
  if (!producto) return {};
  return {
    title: producto.nombre,
    description: producto.descripcion,
  };
}

export default async function PaginaProducto({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const producto = porSlug(slug);
  if (!producto) notFound();

  const categoria = CATEGORIAS[producto.categoria];
  const departamento = DEPARTAMENTOS[producto.departamento];
  const relacionados = porCategoria(producto.categoria)
    .filter((p) => p.slug !== producto.slug)
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: producto.nombre,
    description: producto.descripcion,
    brand: { "@type": "Brand", name: departamento.marca },
    material: producto.composicion,
    offers: {
      "@type": "Offer",
      priceCurrency: "MXN",
      price: (producto.precioCentavos / 100).toFixed(2),
      availability: "https://schema.org/InStock",
    },
  };

  const esCaballero = producto.departamento === "caballero";

  return (
    <div
      data-tema={esCaballero ? "caballero" : undefined}
      className={esCaballero ? "relative overflow-hidden bg-[#e8f0fb]" : undefined}
    >
      {esCaballero && (
        <Image
          src="/marca/joshmens.png"
          alt=""
          aria-hidden
          width={800}
          height={652}
          className="pointer-events-none select-none absolute -right-20 top-16 w-[440px] max-w-[70vw] h-auto opacity-[0.05]"
        />
      )}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label="Migas de pan" className="text-[13px] text-tinta-suave">
        <ol className="flex flex-wrap gap-1.5">
          <li>
            <Link href="/" className="hover:text-acento">Inicio</Link> /
          </li>
          <li>
            <Link href={`/tienda/${producto.departamento}`} className="hover:text-acento">
              {departamento.nombre}
            </Link>{" "}
            /
          </li>
          <li>
            <Link
              href={`/tienda/${producto.departamento}?categoria=${producto.categoria}`}
              className="hover:text-acento"
            >
              {categoria.nombre}
            </Link>
          </li>
        </ol>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <GaleriaProducto producto={producto} />

        <div>
          <p className="font-titulo italic text-tinta-suave">{departamento.marca}</p>
          <h1 className="mt-1 font-titulo text-3xl sm:text-4xl leading-tight">
            {producto.nombre}
          </h1>

          <p className="mt-3 text-2xl">
            <span className="font-semibold">{mxn(producto.precioCentavos)}</span>
            {producto.precioAntesCentavos && (
              <>
                <span className="ml-3 text-lg text-tinta-suave line-through">
                  {mxn(producto.precioAntesCentavos)}
                </span>
                <span className="ml-3 align-middle rounded-full bg-marca text-white text-xs font-semibold px-2.5 py-1">
                  Ahorra {mxn(producto.precioAntesCentavos - producto.precioCentavos)}
                </span>
              </>
            )}
          </p>
          <p className="text-[13px] text-tinta-suave mt-1">Impuestos incluidos</p>

          <ul className="mt-5 space-y-1.5">
            {producto.beneficios.map((b) => (
              <li key={b} className="flex gap-2 text-[15px]">
                <span aria-hidden className="text-exito font-bold">✓</span> {b}
              </li>
            ))}
          </ul>

          <SelectorCompra producto={producto} />

          <div className="mt-4 rounded-control bg-superficie border border-borde px-4 py-3 text-sm text-tinta-suave">
            Envío gratis desde {mxn(SITIO.envioGratisDesdeCentavos)} · Llega en {SITIO.diasEntrega} ·
            Cambios sin costo dentro de 30 días (prenda sin uso, por higiene)
          </div>

          <div className="mt-6 divide-y divide-borde border-y border-borde">
            <details open className="group py-3">
              <summary className="flex cursor-pointer items-center justify-between font-medium list-none">
                La tela {`(${producto.tela})`}
                <span aria-hidden className="text-tinta-suave group-open:rotate-45 transition-transform duration-150 text-xl leading-none">+</span>
              </summary>
              <div className="pt-2 text-[15px] text-tinta-suave leading-relaxed">
                <p>{producto.descripcion}</p>
                <p className="mt-2">
                  <strong className="text-tinta">Composición:</strong> {producto.composicion}
                </p>
                <Link href="/calidad" className="mt-1 inline-block text-acento underline">
                  Conoce cómo hacemos nuestra tela →
                </Link>
              </div>
            </details>
            <details className="group py-3">
              <summary className="flex cursor-pointer items-center justify-between font-medium list-none">
                Guía de tallas
                <span aria-hidden className="text-tinta-suave group-open:rotate-45 transition-transform duration-150 text-xl leading-none">+</span>
              </summary>
              <p className="pt-2 text-[15px] text-tinta-suave">
                Consulta medidas en centímetros y cómo medirte en la{" "}
                <Link href="/guia-de-tallas" className="text-acento underline">
                  guía de tallas
                </Link>
                . Si estás entre dos tallas, te recomendamos la más grande.
              </p>
            </details>
            <details className="group py-3">
              <summary className="flex cursor-pointer items-center justify-between font-medium list-none">
                Cuidado de la prenda
                <span aria-hidden className="text-tinta-suave group-open:rotate-45 transition-transform duration-150 text-xl leading-none">+</span>
              </summary>
              <p className="pt-2 text-[15px] text-tinta-suave">
                Lavar a máquina con agua fría y ciclo suave. No usar cloro ni secadora: la tela te
                durará muchos más lavados. Planchado no necesario.
              </p>
            </details>
          </div>
        </div>
      </div>

      {relacionados.length > 0 && (
        <section className="mt-16" aria-labelledby="relacionados">
          <h2 id="relacionados" className="font-titulo text-2xl mb-5">
            También te puede gustar
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relacionados.map((p) => (
              <ProductCard key={p.slug} producto={p} />
            ))}
          </div>
        </section>
      )}
      </div>
    </div>
  );
}
