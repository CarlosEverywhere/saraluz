import Link from "next/link";
import { destacados } from "@/lib/productos";
import ProductCard from "@/components/producto/ProductCard";

export default function NoEncontrada() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 text-center">
      <p className="font-titulo text-7xl text-marca">404</p>
      <h1 className="mt-3 font-titulo text-3xl">Esta página se nos despuntó</h1>
      <p className="mt-3 text-tinta-suave">
        El enlace no existe o cambió de lugar. Mejor te enseñamos lo bueno:
      </p>
      <Link
        href="/tienda"
        className="mt-6 inline-block rounded-full bg-acento px-8 py-4 text-white font-semibold hover:bg-acento-hover transition-colors duration-150"
      >
        Ir a la tienda
      </Link>
      <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
        {destacados().slice(0, 4).map((p) => (
          <ProductCard key={p.slug} producto={p} />
        ))}
      </div>
    </div>
  );
}
