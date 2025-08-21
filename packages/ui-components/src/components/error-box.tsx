import * as React from "react"
import { AlertCircle, XCircle } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../lib/utils"

const errorBoxVariants = cva(
  "rounded-lg border p-4",
  {
    variants: {
      variant: {
        default: "border-destructive/50 text-destructive bg-destructive/10",
        outline: "border-destructive text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface ErrorBoxProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof errorBoxVariants> {
  message: string
  title?: string
  onDismiss?: () => void
}

const ErrorBox = React.forwardRef<HTMLDivElement, ErrorBoxProps>(
  ({ className, variant, message, title, onDismiss, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(errorBoxVariants({ variant, className }))}
        {...props}
      >
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            {title && (
              <h3 className="font-semibold mb-1">{title}</h3>
            )}
            <p className="text-sm">{message}</p>
          </div>
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="flex-shrink-0 p-1 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <XCircle className="h-4 w-4" />
              <span className="sr-only">Dismiss</span>
            </button>
          )}
        </div>
      </div>
    )
  }
)
ErrorBox.displayName = "ErrorBox"

export { ErrorBox }