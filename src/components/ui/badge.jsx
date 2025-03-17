import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center font-semibold rounded px-2 py-0.5 text-sm w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-green-400 text-white px-3 py-1",
        destructive: "bg-red-400 text-white px-3 py-1",
        secondary: "bg-blue-400 text-white px-3 py-1",
        outline: "border border-yellow-400 text-yellow-600 px-3 py-1",
        processing: "bg-orange-500 text-white px-3 py-1",
        shipped: "bg-purple-400 text-white  px-3 py-1",
        success: "bg-green-600 text-white px-3 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({ className, variant, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
