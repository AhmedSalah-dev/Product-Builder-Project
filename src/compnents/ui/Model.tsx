import {  Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { ReactNode } from 'react';
// import { useState } from 'react'

interface IProps {
  isOpen: boolean;
  closeModel: () => void; 
  title?: string;
  description?: string
  children : ReactNode
}
const Model= ({isOpen,closeModel: close,title,children,description}:IProps) => {


  

  return (
    <>
     
      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close} __demoMode>
      <div className="fixed inset-0 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                  {title && (
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      {title}
                    </Dialog.Title>
                  )}
                  {description && <p className="text-sm text-gray-500 mt-3">{description}</p>}

                  <div className="mt-4">{children}</div>
                </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
export default Model
