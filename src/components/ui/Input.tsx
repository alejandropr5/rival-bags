import * as React from "react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full px-3 py-2 bg-brand-cream border border-brand-border-input rounded-md focus:outline-none focus:ring-1 focus:ring-brand-burgundy font-sans-luxury text-xs text-brand-ink placeholder-brand-text-light transition-all ${className}`}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"
