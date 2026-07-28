"use client";

/**
 * Carrito del lado del cliente: guarda QUÉ quiere el cliente (slug, talla,
 * color, cantidad) y persiste en localStorage. Los importes que muestra son
 * informativos; el total real SIEMPRE se recalcula en el servidor
 * (lib/precios.ts) al crear el pago.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { porSlug } from "@/lib/productos";
import { SITIO } from "@/lib/config";

export interface ItemCarrito {
  slug: string;
  talla: string;
  color: string;
  cantidad: number;
}

interface EstadoCarrito {
  items: ItemCarrito[];
  abierto: boolean;
  eliminado: ItemCarrito | null; // para el "deshacer" de 5 s
  subtotalCentavos: number;
  totalPiezas: number;
  faltaParaEnvioGratis: number;
  abrir: () => void;
  cerrar: () => void;
  agregar: (item: Omit<ItemCarrito, "cantidad">, cantidad?: number) => void;
  cambiarCantidad: (indice: number, cantidad: number) => void;
  eliminar: (indice: number) => void;
  deshacerEliminar: () => void;
  vaciar: () => void;
}

const CarritoContext = createContext<EstadoCarrito | null>(null);

const CLAVE = "carrito-saraluz-v1";

export function CarritoProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ItemCarrito[]>([]);
  const [abierto, setAbierto] = useState(false);
  const [eliminado, setEliminado] = useState<ItemCarrito | null>(null);
  const [hidratado, setHidratado] = useState(false);
  const timerDeshacer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const guardado = localStorage.getItem(CLAVE);
      if (guardado) setItems(JSON.parse(guardado));
    } catch {
      // localStorage corrupto o bloqueado: se arranca con carrito vacío
    }
    setHidratado(true);
  }, []);

  useEffect(() => {
    if (!hidratado) return;
    try {
      localStorage.setItem(CLAVE, JSON.stringify(items));
    } catch {
      // sin persistencia disponible; el carrito sigue funcionando en memoria
    }
  }, [items, hidratado]);

  const agregar = useCallback(
    (item: Omit<ItemCarrito, "cantidad">, cantidad = 1) => {
      setItems((prev) => {
        const i = prev.findIndex(
          (x) => x.slug === item.slug && x.talla === item.talla && x.color === item.color,
        );
        if (i >= 0) {
          const copia = [...prev];
          copia[i] = { ...copia[i], cantidad: copia[i].cantidad + cantidad };
          return copia;
        }
        return [...prev, { ...item, cantidad }];
      });
      setAbierto(true);
    },
    [],
  );

  const cambiarCantidad = useCallback((indice: number, cantidad: number) => {
    setItems((prev) =>
      cantidad <= 0
        ? prev.filter((_, i) => i !== indice)
        : prev.map((x, i) => (i === indice ? { ...x, cantidad } : x)),
    );
  }, []);

  const eliminar = useCallback((indice: number) => {
    setItems((prev) => {
      const objetivo = prev[indice];
      if (objetivo) {
        setEliminado(objetivo);
        if (timerDeshacer.current) clearTimeout(timerDeshacer.current);
        timerDeshacer.current = setTimeout(() => setEliminado(null), 5000);
      }
      return prev.filter((_, i) => i !== indice);
    });
  }, []);

  const deshacerEliminar = useCallback(() => {
    setEliminado((elim) => {
      if (elim) setItems((prev) => [...prev, elim]);
      return null;
    });
    if (timerDeshacer.current) clearTimeout(timerDeshacer.current);
  }, []);

  const vaciar = useCallback(() => setItems([]), []);

  const { subtotalCentavos, totalPiezas } = useMemo(() => {
    let subtotal = 0;
    let piezas = 0;
    for (const item of items) {
      const producto = porSlug(item.slug);
      if (!producto) continue;
      subtotal += producto.precioCentavos * item.cantidad;
      piezas += item.cantidad;
    }
    return { subtotalCentavos: subtotal, totalPiezas: piezas };
  }, [items]);

  const valor: EstadoCarrito = {
    items,
    abierto,
    eliminado,
    subtotalCentavos,
    totalPiezas,
    faltaParaEnvioGratis: Math.max(0, SITIO.envioGratisDesdeCentavos - subtotalCentavos),
    abrir: () => setAbierto(true),
    cerrar: () => setAbierto(false),
    agregar,
    cambiarCantidad,
    eliminar,
    deshacerEliminar,
    vaciar,
  };

  return <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>;
}

export function useCarrito(): EstadoCarrito {
  const ctx = useContext(CarritoContext);
  if (!ctx) throw new Error("useCarrito debe usarse dentro de <CarritoProvider>");
  return ctx;
}
