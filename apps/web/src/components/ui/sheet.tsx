"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  side?: "left" | "right";
}

function Sheet({ open, onOpenChange, children, side = "right" }: SheetProps) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black/50" onClick={() => onOpenChange(false)} />
          <div
            className={cn(
              "fixed inset-y-0 z-50 w-3/4 max-w-sm bg-white p-6 shadow-xl transition-transform duration-300",
              side === "right" ? "right-0" : "left-0"
            )}
          >
            <button
              onClick={() => onOpenChange(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
}

function SheetHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-6 space-y-1", className)} {...props} />;
}

function SheetTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("text-lg font-semibold text-navy-800", className)} {...props} />;
}

export { Sheet, SheetHeader, SheetTitle };
