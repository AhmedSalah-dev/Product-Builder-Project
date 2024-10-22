import {  Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { ReactNode } from 'react';
// import { useState } from 'react'

interface IProps {
  openModel: boolean;
  close: () => void; 
  title?: string;
  children : ReactNode
}
const Model= ({openModel,close,title,children}:IProps) => {


  

  return (
    <>
     
      <Dialog open={openModel} as="div" className="relative z-10 focus:outline-none" onClose={close} __demoMode>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              {title && 
              <DialogTitle as="h3" className="text-base/7 font-medium text-black"> 
               {title}
              </DialogTitle>}
            
              <div className="mt-4">
               {children}
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
export default Model
