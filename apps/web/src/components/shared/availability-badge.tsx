import { Badge } from "@/components/ui/badge";

interface AvailabilityBadgeProps {
  available: boolean;
}

export function AvailabilityBadge({ available }: AvailabilityBadgeProps) {
  return (
    <Badge variant={available ? "success" : "danger"}>
      {available ? "Tersedia" : "Tidak Tersedia"}
    </Badge>
  );
}
