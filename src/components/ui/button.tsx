import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-lg text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
    {
        variants: {
            variant: {
                default:
                    "bg-teal-400 text-white font-bold hover:bg-teal-500 shadow-sm hover:shadow transition-all",
                destructive:
                    "bg-destructive text-destructive-foreground font-bold hover:bg-destructive/90 shadow-sm",
                outline:
                    "border-2 border-gray-200 bg-white text-gray-800 hover:bg-gray-50 hover:border-teal-300 hover:text-teal-600 font-medium",
                secondary:
                    "bg-teal-100 text-teal-800 font-medium hover:bg-teal-200 shadow-sm",
                ghost: "hover:bg-teal-50 hover:text-teal-700",
                link: "text-teal-600 underline-offset-4 hover:underline font-medium",
                gradient:
                    "bg-gradient-to-r from-teal-400 to-teal-600 text-white font-bold hover:opacity-90 shadow-sm hover:shadow-md hover:from-teal-500 hover:to-teal-700",
                glass: "bg-white/80 backdrop-blur-md hover:bg-white/90 text-gray-800 border border-gray-200 shadow-sm",
                icon: "bg-teal-50 text-teal-600 hover:bg-teal-100 hover:text-teal-700 p-0",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-12 rounded-md px-8 text-base",
                icon: "h-10 w-10 rounded-full",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
