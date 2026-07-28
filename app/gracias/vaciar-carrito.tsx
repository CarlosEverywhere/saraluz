"use client";

import { useEffect } from "react";
import { useCarrito } from "@/lib/carrito";

/** Al volver del pago, la bolsa local ya cumplió su función. */
export default function VaciarCarrito() {
  const { vaciar } = useCarrito();
  useEffect(() => {
    vaciar();
  }, [vaciar]);
  return null;
}
