import type { Metadata } from "next";
import Link from "next/link";
import { linkContactoWhatsApp } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Guía de tallas",
  description:
    "Encuentra tu talla exacta de pantaletas, bikinis, prendas sin costura, boxers y briefs Sara Luz y Josh Men's. Medidas en centímetros.",
};

const TALLAS_MUJER = [
  ["CH", "86–92", "58–64"],
  ["M", "92–98", "64–70"],
  ["G", "98–106", "70–78"],
  ["XG", "106–114", "78–88"],
];

const TALLAS_CABALLERO = [
  ["CH", "71–76", "84–90"],
  ["M", "76–84", "90–96"],
  ["G", "84–92", "96–104"],
  ["XG", "92–100", "104–112"],
  ["XXG", "100–110", "112–122"],
];

function Tabla({
  encabezados,
  filas,
  titulo,
}: {
  encabezados: string[];
  filas: string[][];
  titulo: string;
}) {
  return (
    <div className="overflow-x-auto rounded-tarjeta border border-borde bg-superficie">
      <table className="w-full text-left text-sm">
        <caption className="sr-only">{titulo}</caption>
        <thead>
          <tr className="border-b border-borde bg-fondo">
            {encabezados.map((h) => (
              <th key={h} scope="col" className="px-5 py-3.5 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-borde">
          {filas.map((fila) => (
            <tr key={fila[0]}>
              {fila.map((celda, i) =>
                i === 0 ? (
                  <th key={i} scope="row" className="px-5 py-3.5 font-semibold">
                    {celda}
                  </th>
                ) : (
                  <td key={i} className="px-5 py-3.5 text-tinta-suave">
                    {celda} cm
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PaginaTallas() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">
      <header>
        <h1 className="font-titulo text-4xl">Guía de tallas</h1>
        <p className="mt-2 text-tinta-suave max-w-2xl">
          Medidas del cuerpo en centímetros, no de la prenda. Si estás entre dos tallas, elige la
          más grande: en ropa interior, la comodidad siempre gana.
        </p>
      </header>

      <section className="mt-10" aria-labelledby="como-medirte">
        <h2 id="como-medirte" className="font-titulo text-2xl">
          Cómo medirte (2 minutos)
        </h2>
        <ol className="mt-4 grid sm:grid-cols-2 gap-4">
          <li className="rounded-tarjeta border border-borde bg-superficie p-5">
            <p className="font-semibold">1 · Cadera</p>
            <p className="mt-1 text-sm text-tinta-suave leading-relaxed">
              De pie, con los pies juntos, rodea con la cinta la parte más ancha de la cadera y
              glúteos. La cinta va horizontal, pegada pero sin apretar.
            </p>
          </li>
          <li className="rounded-tarjeta border border-borde bg-superficie p-5">
            <p className="font-semibold">2 · Cintura</p>
            <p className="mt-1 text-sm text-tinta-suave leading-relaxed">
              Rodea la cintura natural (la parte más angosta del torso, arriba del ombligo).
              Respira normal: no metas la panza.
            </p>
          </li>
        </ol>
      </section>

      <section className="mt-10" aria-labelledby="tallas-mujer">
        <h2 id="tallas-mujer" className="font-titulo text-2xl mb-4">
          Mujer · Sara Luz
        </h2>
        <Tabla
          titulo="Tallas de mujer"
          encabezados={["Talla", "Cadera", "Cintura"]}
          filas={TALLAS_MUJER}
        />
      </section>

      <section className="mt-10" aria-labelledby="tallas-caballero">
        <h2 id="tallas-caballero" className="font-titulo text-2xl mb-4">
          Caballero · Josh Men's
        </h2>
        <Tabla
          titulo="Tallas de caballero"
          encabezados={["Talla", "Cintura", "Cadera"]}
          filas={TALLAS_CABALLERO}
        />
      </section>

      <section className="mt-12 rounded-tarjeta bg-superficie border border-borde p-6 sm:p-8">
        <h2 className="font-titulo text-xl">¿Sigues con duda?</h2>
        <p className="mt-2 text-sm text-tinta-suave">
          Mándanos tus medidas por WhatsApp y te decimos la talla exacta — es literal a lo que nos
          dedicamos desde hace décadas.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={linkContactoWhatsApp("¿me ayudan a elegir mi talla? Mis medidas son:")}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-exito px-6 py-3 text-white font-semibold text-sm hover:opacity-90 transition-opacity duration-150"
          >
            Preguntar por WhatsApp
          </a>
          <Link
            href="/envios-y-devoluciones"
            className="rounded-full border border-borde px-6 py-3 font-semibold text-sm hover:border-tinta transition-colors duration-150"
          >
            Política de cambios
          </Link>
        </div>
      </section>
    </div>
  );
}
