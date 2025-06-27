import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "./utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium transition-grok focus-grok disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-grok-sm hover:bg-primary/90 hover:shadow-grok active:scale-[0.98]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-grok-sm hover:bg-destructive/90 hover:shadow-grok active:scale-[0.98]",
        outline:
          "border border-border bg-background shadow-grok-xs hover:bg-accent hover:text-accent-foreground hover:border-gray-6 hover:shadow-grok-sm active:scale-[0.98]",
        secondary:
          "bg-secondary text-secondary-foreground shadow-grok-xs hover:bg-secondary/80 hover:shadow-grok-sm active:scale-[0.98]",
        ghost: 
          "hover:bg-accent hover:text-accent-foreground hover:shadow-grok-xs active:scale-[0.98]",
        link: 
          "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 text-sm rounded-grok-md",
        sm: "h-8 rounded-grok px-3 text-xs",
        lg: "h-10 rounded-grok-lg px-8 text-sm",
        xl: "h-12 rounded-grok-xl px-6 text-base",
        icon: "h-9 w-9 rounded-grok-md",
        "icon-sm": "h-8 w-8 rounded-grok",
        "icon-lg": "h-10 w-10 rounded-grok-lg",
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