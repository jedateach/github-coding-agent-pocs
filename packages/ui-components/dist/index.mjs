// src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/components/card.tsx
import * as React from "react";
import { cva } from "class-variance-authority";
import { jsx } from "react/jsx-runtime";
var cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      variant: {
        default: "",
        outlined: "border-2"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
var Card = React.forwardRef(
  ({ className, variant, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn(cardVariants({ variant, className })),
      ...props
    }
  )
);
Card.displayName = "Card";
var CardHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1.5 p-6", className),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
var CardTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "h3",
  {
    ref,
    className: cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
CardTitle.displayName = "CardTitle";
var CardDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "p",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
var CardContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props }));
CardContent.displayName = "CardContent";
var CardFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex items-center p-6 pt-0", className),
    ...props
  }
));
CardFooter.displayName = "CardFooter";

// src/components/button.tsx
import * as React2 from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva as cva2 } from "class-variance-authority";
import { jsx as jsx2 } from "react/jsx-runtime";
var buttonVariants = cva2(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var Button = React2.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx2(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";

// src/components/spinner.tsx
import * as React3 from "react";
import { Loader2 } from "lucide-react";
import { jsx as jsx3, jsxs } from "react/jsx-runtime";
var Spinner = React3.forwardRef(
  ({ className, size = "default", text, ...props }, ref) => {
    const sizeClasses = {
      sm: "h-4 w-4",
      default: "h-6 w-6",
      lg: "h-8 w-8"
    };
    return /* @__PURE__ */ jsx3(
      "div",
      {
        ref,
        className: cn("flex items-center justify-center", className),
        ...props,
        children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2", children: [
          /* @__PURE__ */ jsx3(
            Loader2,
            {
              className: cn("animate-spin text-muted-foreground", sizeClasses[size])
            }
          ),
          text && /* @__PURE__ */ jsx3("p", { className: "text-sm text-muted-foreground", children: text })
        ] })
      }
    );
  }
);
Spinner.displayName = "Spinner";

// src/components/error-box.tsx
import * as React4 from "react";
import { AlertCircle, XCircle } from "lucide-react";
import { cva as cva3 } from "class-variance-authority";
import { jsx as jsx4, jsxs as jsxs2 } from "react/jsx-runtime";
var errorBoxVariants = cva3(
  "rounded-lg border p-4",
  {
    variants: {
      variant: {
        default: "border-destructive/50 text-destructive bg-destructive/10",
        outline: "border-destructive text-destructive"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
var ErrorBox = React4.forwardRef(
  ({ className, variant, message, title, onDismiss, ...props }, ref) => {
    return /* @__PURE__ */ jsx4(
      "div",
      {
        ref,
        className: cn(errorBoxVariants({ variant, className })),
        ...props,
        children: /* @__PURE__ */ jsxs2("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsx4(AlertCircle, { className: "h-5 w-5 flex-shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxs2("div", { className: "flex-1 min-w-0", children: [
            title && /* @__PURE__ */ jsx4("h3", { className: "font-semibold mb-1", children: title }),
            /* @__PURE__ */ jsx4("p", { className: "text-sm", children: message })
          ] }),
          onDismiss && /* @__PURE__ */ jsxs2(
            "button",
            {
              onClick: onDismiss,
              className: "flex-shrink-0 p-1 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              children: [
                /* @__PURE__ */ jsx4(XCircle, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsx4("span", { className: "sr-only", children: "Dismiss" })
              ]
            }
          )
        ] })
      }
    );
  }
);
ErrorBox.displayName = "ErrorBox";
export {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  ErrorBox,
  Spinner,
  buttonVariants,
  cn
};
