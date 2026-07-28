import { SITIO } from "@/lib/config";
import { mxn } from "@/lib/formato";

export default function BannerPromesa() {
  return (
    <p className="bg-carbon text-white text-center text-[13px] tracking-wide py-2 px-4">
      Envío gratis desde {mxn(SITIO.envioGratisDesdeCentavos)} · Hecho en México con{" "}
      {SITIO.aniosExperiencia}+ años de experiencia
    </p>
  );
}
