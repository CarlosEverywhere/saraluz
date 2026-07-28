/**
 * Configuración del negocio — el único archivo que hay que tocar
 * para cambiar datos de contacto, umbrales de envío o textos base.
 */
export const SITIO = {
  nombre: "Sara Luz",
  nombreLegal: "Confecciones Sara Luz M.R.",
  lineaCaballero: "Josh Men's",
  descripcion:
    "Ropa interior mexicana con tela de altísima calidad. Pantaletas, bikinis, prendas sin costura y boxers hechos por manos expertas.",
  url: process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000",

  // ⚠️ CAMBIAR: número de WhatsApp con código de país, solo dígitos (52 + 10 dígitos)
  whatsapp: "5215500000000",
  correo: "contacto@saraluz.mx",
  telefono: "(55) 0000 0000",
  direccion: "Ciudad de México, México",

  envioGratisDesdeCentavos: 99_900, // $999
  costoEnvioCentavos: 14_900, // $149
  diasEntrega: "2 a 5 días hábiles",
  aniosExperiencia: 25, // confirmado por el dueño (jul 2026)
} as const;
