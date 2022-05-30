import { useNavigate } from '@remix-run/react'
import { Portal } from './portal'

interface props {
  children: React.ReactNode
  isOpen: boolean
  ariaLabel?: string
  className?: string
}

export const Modal: React.FC<props> = ({
  children,
  isOpen,
  ariaLabel,
  className,
}) => {
  const navigate = useNavigate()
  if (!isOpen) return null
  return (
    <Portal wrapperId="modal">
      <div
        className="fixed inset-0 overflow-y-auto bg-black bg-opacity-80"
        aria-label={ariaLabel ?? 'modal-title'}
        role="dialog"
        aria-modal="true"
        onClick={() => navigate('/home')}
      ></div>
      <div className="fixed inset-0 pointer-events-none flex justify-center items-center max-h-screen overflow-scroll">
        <div
          className={`${className} p-4 bg-white pointer-events-auto max-h-screen md:rounded-xl w-80`}
        >
          {children}
        </div>
      </div>
    </Portal>
  )
}
