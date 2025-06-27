import * as React from "react";
import { Slot } from "@radix-ui/react-slot@1.1.2";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-premium-md border px-2.5 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive transition-premium overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow-premium-xs [a&]:hover:bg-blue-700",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground shadow-premium-xs [a&]:hover:bg-slate-200",
        destructive:
          "border-transparent bg-destructive text-white shadow-premium-xs [a&]:hover:bg-rose-600 focus-visible:ring-destructive/20",
        outline:
          "text-foreground border-border [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        success:
          "border-transparent bg-emerald-500 text-white shadow-premium-xs [a&]:hover:bg-emerald-600",
        warning:
          "border-transparent bg-amber-500 text-white shadow-premium-xs [a&]:hover:bg-amber-600",
        premium:
          "border-transparent bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-premium-sm [a&]:hover:from-blue-600 [a&]:hover:to-violet-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
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