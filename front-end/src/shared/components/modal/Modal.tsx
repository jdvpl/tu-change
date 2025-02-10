
import { Dialog, DialogBackdrop } from '@headlessui/react'

interface ModalContainerProps {
  children: React.ReactNode
  open: boolean
  setOpen: (value: boolean) => void
}

export default function ModalContainer({children,setOpen,open}: ModalContainerProps) {

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 top-0 bg-gray-500/75 transition-opacity border-none"
      />
      <div className="fixed md:top-0 inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          {children}
        </div>
      </div>
    </Dialog>
  )
}
