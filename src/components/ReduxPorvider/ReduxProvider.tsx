"use client"
import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/Store/Store';

export default function ReduxProvider({children}:{children:ReactNode}) {
  
  return (
    <>
    <Provider store={store}>
        {children}
    </Provider>
    </>
  )
}
