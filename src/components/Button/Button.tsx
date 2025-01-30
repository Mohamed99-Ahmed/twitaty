import React, { ReactEventHandler, ReactNode } from 'react'

export default function Button({children,className,onClick}:{children:ReactNode,className?:string,onClick?:ReactEventHandler}) {
  return (
    <button onClick={onClick}  className={`bg-main text-white px-4 py-2 rounded-full   ${className}`}>{children}</button>
  )
}
