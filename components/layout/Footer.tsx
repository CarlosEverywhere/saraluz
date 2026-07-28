import Link from "next/link";
import { SITIO } from "@/lib/config";
import { linkContactoWhatsApp } from "@/lib/whatsapp";

const COLUMNAS = [
  {
    titulo: "Tienda",
    enlaces: [
      { href: "/tienda/mujer", texto: "Mujer — Sara Luz" },
      { href: "/tienda/caballero", texto: "Caballero — Josh Men's" },
      { href: "/novedades", texto: "Novedades" },
      { href: "/tienda", texto: "Todo el catálogo" },
    ],
  },
  {
    titulo: "Ayuda",
    enlaces: [
      { href: "/guia-de-tallas", texto: "Guía de tallas" },
      { href: "/envios-y-devoluciones", texto: "Envíos y devoluciones" },
      { href: "/preguntas-frecuentes", texto: "Preguntas frecuentes" },
      { href: "/nosotros#contacto", texto: "Contacto" },
    ],
  },
  {
    titulo: "Nosotros",
    enlaces: [
      { href: "/nosotros", texto: "Nuestra historia" },
      { href: "/calidad", texto: "Nuestra tela" },
      { href: "/mayoreo", texto: "Ventas de mayoreo" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-20 bg-carbon text-white/90">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-titulo text-2xl">
            Confecciones Sara Luz
            <span className="ml-2 align-super text-[11px] font-cuerpo text-white/60">M.R.</span>
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/70 max-w-xs">
            Ropa interior hecha en México por manos expertas, con tela de
            altísima calidad y {SITIO.aniosExperiencia}+ años de oficio.
          </p>
          <a
            href={linkContactoWhatsApp()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-exito px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity duration-150"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.5 14.1c-.2.7-1.3 1.3-1.9 1.3-.5.1-1.1.1-1.8-.1a15 15 0 0 1-1.6-.6c-2.9-1.2-4.8-4.1-4.9-4.3-.1-.2-1.2-1.6-1.2-3s.8-2.1 1-2.4c.3-.3.6-.4.8-.4h.6c.2 0 .4-.1.7.5.2.6.8 2 .9 2.1.1.2.1.3 0 .5l-.4.6-.5.5c-.2.2-.3.3-.1.6.2.3.8 1.4 1.8 2.2 1.2 1.1 2.3 1.4 2.6 1.6.3.1.5.1.7-.1l1-1.2c.2-.3.4-.2.7-.1l2 1c.3.2.5.2.6.4 0 .1 0 .7-.2 1.4Z" />
            </svg>
            WhatsApp
          </a>
        </div>

        {COLUMNAS.map((col) => (
          <nav key={col.titulo} aria-label={col.titulo}>
            <h2 className="font-titulo text-lg mb-4">{col.titulo}</h2>
            <ul className="space-y-2.5">
              {col.enlaces.map((e) => (
                <li key={e.href}>
                  <Link
                    href={e.href}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-150"
                  >
                    {e.texto}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center gap-4 justify-between text-[13px] text-white/60">
          <p>
            © {new Date().getFullYear()} {SITIO.nombreLegal} · Hecho en México 🇲🇽
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <li>
              <Link href="/aviso-de-privacidad" className="hover:text-white transition-colors duration-150">
                Aviso de privacidad
              </Link>
            </li>
            <li>
              <Link href="/terminos" className="hover:text-white transition-colors duration-150">
                Términos y condiciones
              </Link>
            </li>
            <li aria-label="Formas de pago" className="flex items-center gap-2">
              <span className="rounded border border-white/25 px-1.5 py-0.5">VISA</span>
              <span className="rounded border border-white/25 px-1.5 py-0.5">MC</span>
              <span className="rounded border border-white/25 px-1.5 py-0.5">OXXO</span>
              <span className="rounded border border-white/25 px-1.5 py-0.5">SPEI</span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
