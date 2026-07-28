/**
 * Catálogo de productos — fase 1: datos locales tipados.
 * Fase 2: esta misma forma se migra a Postgres/Prisma sin tocar las pantallas.
 * Dinero SIEMPRE en centavos (entero).
 */

export type Departamento = "mujer" | "caballero";
export type Categoria = "pantaletas" | "bikinis" | "sin-costura" | "boxers" | "briefs";

export interface ColorProducto {
  nombre: string;
  hex: string;
}

export interface Producto {
  slug: string;
  nombre: string;
  departamento: Departamento;
  categoria: Categoria;
  descripcion: string;
  tela: string;
  composicion: string;
  beneficios: string[];
  precioCentavos: number;
  precioAntesCentavos?: number;
  tallas: string[];
  tallasAgotadas?: string[];
  colores: ColorProducto[];
  nuevo?: boolean;
  destacado?: boolean;
  /** Rutas en /public. Vacío = usa placeholder elegante hasta que suban fotos. */
  imagenes?: string[];
}

export const CATEGORIAS: Record<
  Categoria,
  { nombre: string; departamento: Departamento; descripcion: string }
> = {
  pantaletas: {
    nombre: "Pantaletas",
    departamento: "mujer",
    descripcion: "Comodidad diaria con tela suave que no marca ni se enrolla.",
  },
  bikinis: {
    nombre: "Bikinis",
    departamento: "mujer",
    descripcion: "Corte clásico favorecedor, para todos los días.",
  },
  "sin-costura": {
    nombre: "Prendas sin costura",
    departamento: "mujer",
    descripcion: "Tecnología seamless: invisibles bajo la ropa, cero marcas.",
  },
  boxers: {
    nombre: "Boxers",
    departamento: "caballero",
    descripcion: "Línea Josh Men's: soporte, frescura y tela que aguanta.",
  },
  briefs: {
    nombre: "Briefs",
    departamento: "caballero",
    descripcion: "Corte clásico Josh Men's con elástico firme que no afloja.",
  },
};

export const DEPARTAMENTOS: Record<
  Departamento,
  { nombre: string; marca: string; categorias: Categoria[] }
> = {
  mujer: {
    nombre: "Mujer",
    marca: "Sara Luz",
    categorias: ["pantaletas", "bikinis", "sin-costura"],
  },
  caballero: {
    nombre: "Caballero",
    marca: "Josh Men's",
    categorias: ["boxers", "briefs"],
  },
};

// Colores de prenda alineados a la paleta de la marca:
// rosa claro, azul marino, azul rey y turquesa + básicos de cajón.
const NUDE = { nombre: "Nude", hex: "#d9b49a" };
const ARENA = { nombre: "Arena", hex: "#e8d5bd" };
const NEGRO = { nombre: "Negro", hex: "#1f1b18" };
const BLANCO = { nombre: "Blanco", hex: "#f7f3ee" };
const ROSA = { nombre: "Rosa claro", hex: "#f3bfd2" };
const MARINO = { nombre: "Azul marino", hex: "#1b2a4a" };
const REY = { nombre: "Azul rey", hex: "#2848c8" };
const TURQUESA = { nombre: "Turquesa", hex: "#2fb7ae" };
const GRIS = { nombre: "Gris jaspe", hex: "#9b968f" };

const T_MUJER = ["CH", "M", "G", "XG"];
const T_CABALLERO = ["CH", "M", "G", "XG", "XXG"];

export const PRODUCTOS: Producto[] = [
  // ——— Pantaletas ———
  {
    slug: "pantaleta-clasica-algodon",
    nombre: "Pantaleta clásica de algodón",
    departamento: "mujer",
    categoria: "pantaletas",
    descripcion:
      "La pantaleta de todos los días, cortada y cosida por manos expertas. Licra algodón de origen nacional que se siente suave desde la primera puesta y no pierde forma con las lavadas.",
    tela: "Licra algodón nacional",
    composicion: "95% algodón de origen nacional, 5% elastano (licra)",
    beneficios: ["No se enrolla ni se baja", "Transpirable todo el día", "Aguanta +100 lavadas sin deformarse"],
    precioCentavos: 12900,
    tallas: T_MUJER,
    colores: [NUDE, NEGRO, BLANCO, ROSA],
    destacado: true,
    imagenes: ["/productos/pantaleta-clasica-modelo.jpg"],
  },
  {
    slug: "pantaleta-alta-control",
    nombre: "Pantaleta de tiro alto",
    departamento: "mujer",
    categoria: "pantaletas",
    descripcion:
      "Tiro alto que abraza sin apretar. Panel frontal de doble tela para un soporte suave y elástico encapsulado que nunca se clava.",
    tela: "Licra algodón con soporte",
    composicion: "93% algodón de origen nacional, 7% elastano (licra)",
    beneficios: ["Soporte suave en abdomen", "Elástico que no se clava", "Costuras planas"],
    precioCentavos: 15900,
    tallas: T_MUJER,
    tallasAgotadas: ["XG"],
    colores: [NEGRO, NUDE, REY],
    imagenes: ["/productos/pantaleta-tiro-alto-modelo.jpg"],
  },
  {
    slug: "pantaleta-encaje-algodon",
    nombre: "Pantaleta con encaje",
    departamento: "mujer",
    categoria: "pantaletas",
    descripcion:
      "Licra algodón por dentro, encaje por fuera. El detalle de encaje elástico en cintura eleva la prenda sin sacrificar un gramo de comodidad.",
    tela: "Licra algodón + encaje elástico",
    composicion: "90% algodón de origen nacional, 10% elastano (licra) · encaje de nylon",
    beneficios: ["Encaje suave que no pica", "Forro 100% algodón", "Lavable en máquina"],
    precioCentavos: 16900,
    tallas: T_MUJER,
    colores: [MARINO, NEGRO, ROSA],
    nuevo: true,
    imagenes: ["/productos/pantaleta-encaje-modelo.jpg"],
  },
  {
    slug: "paquete-3-pantaletas",
    nombre: "Paquete de 3 pantaletas clásicas",
    departamento: "mujer",
    categoria: "pantaletas",
    descripcion:
      "Tres básicas del mismo corte que más se vende, en colores combinables. El ahorro inteligente para renovar el cajón.",
    tela: "Licra algodón nacional",
    composicion: "95% algodón de origen nacional, 5% elastano (licra)",
    beneficios: ["Ahorra vs. compra individual", "Colores combinables", "El corte más vendido"],
    precioCentavos: 32900,
    precioAntesCentavos: 38700,
    tallas: T_MUJER,
    colores: [{ nombre: "Mix neutros", hex: "#d9b49a" }, { nombre: "Mix marinos", hex: "#1b2a4a" }],
    destacado: true,
  },

  // ——— Bikinis ———
  {
    slug: "bikini-clasico",
    nombre: "Bikini clásico",
    departamento: "mujer",
    categoria: "bikinis",
    descripcion:
      "El corte que favorece a todos los cuerpos: cadera media, pierna alta y tela con caída que no marca líneas bajo el pantalón.",
    tela: "Licra algodón suave",
    composicion: "90% algodón de origen nacional, 10% elastano (licra)",
    beneficios: ["Suavidad de algodón nacional", "Tacto segunda piel", "No marca bajo la ropa"],
    precioCentavos: 13900,
    tallas: T_MUJER,
    colores: [NUDE, NEGRO, ROSA, TURQUESA],
    destacado: true,
  },
  {
    slug: "bikini-encaje",
    nombre: "Bikini de encaje completo",
    departamento: "mujer",
    categoria: "bikinis",
    descripcion:
      "Encaje elástico de flor mexicana en toda la prenda, con forro interior de algodón. Bonito por fuera, cómodo por dentro.",
    tela: "Encaje elástico",
    composicion: "85% nylon, 15% elastano · forro de algodón",
    beneficios: ["Encaje que estira contigo", "Forro de algodón", "No pica ni raspa"],
    precioCentavos: 17900,
    tallas: T_MUJER,
    tallasAgotadas: ["CH"],
    colores: [NEGRO, REY, BLANCO],
    nuevo: true,
    imagenes: ["/productos/bikini-encaje-modelo.jpg"],
  },
  {
    slug: "bikini-deportivo",
    nombre: "Bikini deportivo",
    departamento: "mujer",
    categoria: "bikinis",
    descripcion:
      "Pensado para moverse: tela técnica que absorbe la humedad, costuras planas y elástico ancho que se queda en su lugar aunque entrenes.",
    tela: "Licra algodón deportiva",
    composicion: "90% algodón de origen nacional, 10% elastano (licra)",
    beneficios: ["Absorbe humedad", "Se queda en su lugar", "Tela de origen nacional"],
    precioCentavos: 15900,
    tallas: T_MUJER,
    colores: [NEGRO, GRIS, TURQUESA],
  },

  // ——— Sin costura ———
  {
    slug: "seamless-invisible",
    nombre: "Pantaleta invisible sin costura",
    departamento: "mujer",
    categoria: "sin-costura",
    descripcion:
      "Tejida en máquina circular de precisión: una sola pieza, cero costuras, bordes de corte láser. Desaparece bajo cualquier prenda, hasta la más entallada.",
    tela: "Tejido sin costura de precisión",
    composicion: "92% poliamida, 8% elastano",
    beneficios: ["Cero costuras, cero marcas", "Borde corte láser", "Invisible bajo ropa entallada"],
    precioCentavos: 14900,
    tallas: T_MUJER,
    colores: [NUDE, NEGRO, ARENA, BLANCO],
    destacado: true,
    nuevo: true,
  },
  {
    slug: "seamless-tiro-alto",
    nombre: "Sin costura de tiro alto",
    departamento: "mujer",
    categoria: "sin-costura",
    descripcion:
      "La comodidad seamless con cobertura completa. Zonas de compresión suave tejidas directamente en la prenda, sin paneles pegados.",
    tela: "Seamless con zonas de soporte",
    composicion: "90% poliamida, 10% elastano",
    beneficios: ["Compresión suave tejida", "Sin etiquetas, sin costuras", "Cintura que no se enrolla"],
    precioCentavos: 17900,
    tallas: T_MUJER,
    colores: [NEGRO, NUDE, MARINO],
  },
  {
    slug: "top-seamless",
    nombre: "Top sin costura",
    departamento: "mujer",
    categoria: "sin-costura",
    descripcion:
      "El compañero de la línea seamless: top de soporte ligero, tirante ancho y tejido que respira. Perfecto para diario o para dormir.",
    tela: "Tejido sin costura de precisión",
    composicion: "92% poliamida, 8% elastano",
    beneficios: ["Soporte ligero sin varilla", "Tirante ancho cómodo", "Respirable"],
    precioCentavos: 19900,
    tallas: T_MUJER,
    tallasAgotadas: ["XG"],
    colores: [NUDE, NEGRO, ROSA],
    nuevo: true,
  },
  {
    slug: "paquete-5-seamless",
    nombre: "Semana seamless — paquete de 5",
    departamento: "mujer",
    categoria: "sin-costura",
    descripcion:
      "Cinco pantaletas invisibles en tonos neutros, una para cada día hábil. El paquete favorito de quien ya probó la línea sin costura.",
    tela: "Tejido sin costura de precisión",
    composicion: "92% poliamida, 8% elastano",
    beneficios: ["5 tonos neutros combinables", "Precio de paquete", "El best seller de la línea"],
    precioCentavos: 59900,
    precioAntesCentavos: 74500,
    tallas: T_MUJER,
    colores: [{ nombre: "Neutros", hex: "#d9b49a" }],
    destacado: true,
  },

  // ——— Josh Men's: Boxers ———
  {
    slug: "boxer-clasico-josh",
    nombre: "Boxer clásico Josh Men's",
    departamento: "caballero",
    categoria: "boxers",
    descripcion:
      "El boxer que no se sube ni se tuerce. Licra algodón de origen nacional, pretina firme con el sello Josh Men's y costuras planas donde importa.",
    tela: "Licra algodón nacional",
    composicion: "95% algodón de origen nacional, 5% elastano (licra)",
    beneficios: ["No se sube al caminar", "Pretina que no afloja", "Costuras planas anti-rozadura"],
    precioCentavos: 14900,
    tallas: T_CABALLERO,
    colores: [NEGRO, GRIS, MARINO],
    destacado: true,
  },
  {
    slug: "boxer-microfibra-josh",
    nombre: "Boxer fresco ligero",
    departamento: "caballero",
    categoria: "boxers",
    descripcion:
      "Para clima caliente o jornada larga: licra algodón ligera que respira y se siente fresca todo el día. El favorito de quien trabaja de pie.",
    tela: "Licra algodón fresca",
    composicion: "92% algodón de origen nacional, 8% elastano (licra)",
    beneficios: ["Fresco en clima caliente", "Secado rápido", "Ligero, casi no se siente"],
    precioCentavos: 16900,
    tallas: T_CABALLERO,
    tallasAgotadas: ["XXG"],
    colores: [NEGRO, MARINO, TURQUESA, GRIS],
    nuevo: true,
  },
  {
    slug: "boxer-deportivo-josh",
    nombre: "Boxer deportivo largo",
    departamento: "caballero",
    categoria: "boxers",
    descripcion:
      "Pierna larga anti-rozadura para entrenar o rodar. Tela técnica con paneles de ventilación tejidos y pretina ancha estilo Bikers Cruz.",
    tela: "Licra algodón deportiva",
    composicion: "90% algodón de origen nacional, 10% elastano (licra)",
    beneficios: ["Pierna larga anti-rozadura", "Ventilación tejida", "Pretina ancha deportiva"],
    precioCentavos: 18900,
    tallas: T_CABALLERO,
    colores: [NEGRO, GRIS, REY],
  },
  {
    slug: "paquete-3-boxers-josh",
    nombre: "Paquete de 3 boxers clásicos",
    departamento: "caballero",
    categoria: "boxers",
    descripcion:
      "Tres boxers clásicos Josh Men's en colores básicos. La compra práctica: mejor precio y el cajón resuelto.",
    tela: "Licra algodón nacional",
    composicion: "95% algodón de origen nacional, 5% elastano (licra)",
    beneficios: ["Ahorro vs. individual", "Colores básicos combinables", "El corte más vendido"],
    precioCentavos: 37900,
    precioAntesCentavos: 44700,
    tallas: T_CABALLERO,
    colores: [{ nombre: "Mix marinos", hex: "#1b2a4a" }],
    destacado: true,
  },

  // ——— Josh Men's: Briefs ———
  {
    slug: "brief-clasico-josh",
    nombre: "Brief clásico Josh Men's",
    departamento: "caballero",
    categoria: "briefs",
    descripcion:
      "El corte de siempre, bien hecho: licra algodón de origen nacional, elástico forrado que no muerde y refuerzo frontal anatómico.",
    tela: "Licra algodón nacional",
    composicion: "95% algodón de origen nacional, 5% elastano (licra) · elástico forrado",
    beneficios: ["Algodón nacional transpirable", "Elástico forrado", "Refuerzo anatómico"],
    precioCentavos: 9900,
    tallas: T_CABALLERO,
    colores: [BLANCO, NEGRO, GRIS],
  },
  {
    slug: "paquete-5-briefs-josh",
    nombre: "Paquete de 5 briefs",
    departamento: "caballero",
    categoria: "briefs",
    descripcion:
      "Cinco briefs clásicos al mejor precio por prenda. Básicos que aguantan lavadas y más lavadas sin perder el elástico.",
    tela: "Licra algodón nacional",
    composicion: "95% algodón de origen nacional, 5% elastano (licra) · elástico forrado",
    beneficios: ["El mejor precio por prenda", "Elástico de larga vida", "Básicos de cajón"],
    precioCentavos: 39900,
    precioAntesCentavos: 49500,
    tallas: T_CABALLERO,
    tallasAgotadas: ["CH"],
    colores: [{ nombre: "Mix básicos", hex: "#9b968f" }],
    nuevo: true,
  },
];

// ——— Consultas ———

export function porSlug(slug: string): Producto | undefined {
  return PRODUCTOS.find((p) => p.slug === slug);
}

export function porDepartamento(dep: Departamento): Producto[] {
  return PRODUCTOS.filter((p) => p.departamento === dep);
}

export function porCategoria(cat: Categoria): Producto[] {
  return PRODUCTOS.filter((p) => p.categoria === cat);
}

export function nuevos(): Producto[] {
  return PRODUCTOS.filter((p) => p.nuevo);
}

export function destacados(): Producto[] {
  return PRODUCTOS.filter((p) => p.destacado);
}

export function buscar(consulta: string): Producto[] {
  const q = consulta.trim().toLowerCase();
  if (!q) return PRODUCTOS;
  return PRODUCTOS.filter((p) =>
    [p.nombre, p.descripcion, p.tela, CATEGORIAS[p.categoria].nombre]
      .join(" ")
      .toLowerCase()
      .includes(q),
  );
}
