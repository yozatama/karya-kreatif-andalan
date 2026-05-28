"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Car, Zap, Users, Fuel } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PriceTag } from "./price-tag";
import { AvailabilityBadge } from "./availability-badge";
import type { Vehicle } from "@/lib/mock-data";

interface VehicleCardProps {
  vehicle: Vehicle;
  index?: number;
}

export function VehicleCard({ vehicle, index = 0 }: VehicleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <Card className="overflow-hidden h-full flex flex-col">
        <div className={`${vehicle.color} h-40 flex items-center justify-center`}>
          {vehicle.category === "mobil" ? (
            <Car className="h-16 w-16 text-white/80" />
          ) : (
            <Zap className="h-16 w-16 text-white/80" />
          )}
        </div>
        <CardContent className="flex flex-1 flex-col gap-3 p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-navy-800">{vehicle.name}</h3>
              <p className="text-xs text-navy-500">{vehicle.brand}</p>
            </div>
            <AvailabilityBadge available={vehicle.available} />
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="info">{vehicle.transmission === "automatic" ? "Matic" : "Manual"}</Badge>
            <div className="flex items-center gap-1 text-xs text-navy-500">
              <Users className="h-3 w-3" />
              <span>{vehicle.seats}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-navy-500">
              <Fuel className="h-3 w-3" />
              <span>{vehicle.fuel === "listrik" ? "Listrik" : "Bensin"}</span>
            </div>
          </div>

          <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
            <PriceTag amount={vehicle.dailyRate} />
            <Link href={`/fleet/${vehicle.id}`}>
              <Button size="sm" disabled={!vehicle.available}>
                Booking
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
