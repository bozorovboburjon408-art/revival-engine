import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-md hover:shadow-lg hover:bg-primary/90 hover:-translate-y-0.5",
        destructive: "bg-destructive text-destructive-foreground shadow-md hover:shadow-lg hover:bg-destructive/90",
        outline: "border-2 border-border bg-background/50 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground hover:border-primary/30",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:shadow-md hover:bg-secondary/80",
        ghost: "hover:bg-accent/50 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "glow-button text-white font-bold shadow-lg hover:shadow-xl",
        glass: "bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 text-foreground hover:bg-white/20 dark:hover:bg-white/10 shadow-lg",
        gradient: "bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 animate-gradient",
        accent: "bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-12 rounded-xl px-8",
        xl: "h-14 rounded-2xl px-10 text-base",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
