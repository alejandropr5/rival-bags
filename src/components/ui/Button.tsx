import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', ...props }, ref) => {
    const baseClass = "font-sans-luxury text-xs font-semibold tracking-wider rounded-sm transition flex items-center justify-center gap-2 cursor-pointer uppercase shadow-sm"
    
    let variantClass = ""
    if (variant === 'primary') {
      variantClass = "bg-[#3B141E] text-[#FAF6EE] hover:bg-[#2B0C15]"
    } else if (variant === 'secondary') {
      variantClass = "bg-[#F5EFE6] text-[#3B141E] hover:bg-[#FAF6EE] border border-[#FAF6EE] shadow-lg hover:shadow-xl"
    } else if (variant === 'outline') {
      variantClass = "border border-[#3B141E] text-[#3B141E] hover:bg-[#3B141E] hover:text-[#FAF6EE]"
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
