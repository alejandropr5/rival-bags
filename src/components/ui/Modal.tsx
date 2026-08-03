import * as React from "react"
import { X } from "lucide-react"

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
}

export function Modal({ isOpen, onClose, children, className = '' }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className={`bg-white rounded-2xl shadow-2xl border border-brand-border-light overflow-hidden relative animate-scale-up ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-brand-cream text-brand-burgundy hover:bg-brand-burgundy hover:text-white transition-colors shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>
        {children}
      </div>
    </div>
  )
}
