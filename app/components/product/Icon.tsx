import {
  Nfc,
  Smartphone,
  Zap,
  Star,
  Truck,
  ShieldCheck,
  QrCode,
  Check,
  type LucideIcon,
} from "lucide-react";

/** Mapowanie kluczy z danych produktu (app/data/products.ts) na ikony lucide. */
const ICONS: Record<string, LucideIcon> = {
  nfc: Nfc,
  smartphone: Smartphone,
  zap: Zap,
  star: Star,
  truck: Truck,
  shield: ShieldCheck,
  qr: QrCode,
  check: Check,
};

type Props = {
  name: string;
  className?: string;
  strokeWidth?: number;
};

export default function Icon({ name, className, strokeWidth = 2 }: Props) {
  const Cmp = ICONS[name] ?? Star;
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden />;
}
