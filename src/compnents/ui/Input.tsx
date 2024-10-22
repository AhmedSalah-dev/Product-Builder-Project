import {InputHTMLAttributes} from 'react'
interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    
}

const input = ({...rest}:IProps) => {
  return (

   <input   
   className="border-[1px] border-gray-400 rounded-md px-3 shadow-md
   focus:border-indigo-500 focus:outline-none focus:ring-4
   focus:ring-indigo-500 py-3 text-md" 
   {...rest}/>
  )
}

export default input