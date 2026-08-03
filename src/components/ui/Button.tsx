import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', ...props }, ref) => {
    const baseClass = "font-sans-luxury text-xs font-semibold tracking-wider rounded-sm transition flex items-center justify-center gap-2 cursor-pointer uppercase shadow-sm"
    
    let variantClass = ""
    if (variant === 'primary') {
      variantClass = "bg-brand-burgundy text-brand-cream hover:bg-brand-burgundy-dark"
    } else if (variant === 'secondary') {
      variantClass = "bg-brand-cream-light text-brand-burgundy hover:bg-brand-cream border border-brand-cream shadow-lg hover:shadow-xl"
    } else if (variant === 'outline') {
      variantClass = "border border-brand-burgundy text-brand-burgundy hover:bg-brand-burgundy hover:text-brand-cream"
    }

    return (
      <button
        ref={ref}
        className={`${baseClass} ${variantClass} ${className}`}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
