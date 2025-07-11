import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "./utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium transition-premium focus-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-premium-sm hover:bg-blue-700 hover:shadow-premium-md hover:-translate-y-0.5 active:translate-y-0",
        destructive:
          "bg-destructive text-destructive-foreground shadow-premium-sm hover:bg-rose-600 hover:shadow-premium-md hover:-translate-y-0.5 active:translate-y-0",
        outline:
          "border border-border bg-background shadow-premium-xs hover:bg-accent hover:text-accent-foreground hover:border-slate-300 hover:shadow-premium-sm hover:-translate-y-0.5 active:translate-y-0",
        secondary:
          "bg-secondary text-secondary-foreground shadow-premium-xs hover:bg-slate-200 hover:shadow-premium-sm hover:-translate-y-0.5 active:translate-y-0",
        ghost: 
          "hover:bg-accent hover:text-accent-foreground hover:shadow-premium-xs hover:-translate-y-0.5 active:translate-y-0",
        link: 
          "text-primary underline-offset-4 hover:underline hover:text-blue-700",
        premium:
          "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-premium-md hover:from-blue-700 hover:to-violet-700 hover:shadow-premium-lg hover:-translate-y-1 active:translate-y-0",
      },
      size: {
        default: "h-10 px-4 py-2 text-sm rounded-premium-lg",
        sm: "h-8 rounded-premium-md px-3 text-xs",
        lg: "h-11 rounded-premium-xl px-8 text-sm",
        xl: "h-12 rounded-premium-2xl px-6 text-base",
        icon: "h-10 w-10 rounded-premium-lg",
        "icon-sm": "h-8 w-8 rounded-premium-md",
        "icon-lg": "h-11 w-11 rounded-premium-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }