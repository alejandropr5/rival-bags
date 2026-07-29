import * as React from "react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full px-3 py-2 bg-[#FAF6EE] border border-[#E0D5C1] rounded-md focus:outline-none focus:ring-1 focus:ring-[#3B141E] font-sans-luxury text-xs text-[#2A181C] placeholder-[#8C7A6B] transition-all ${className}`}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"
