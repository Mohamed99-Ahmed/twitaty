"use client"
import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/Store/Store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// Create a client
const queryClient = new QueryClient();
export default function ReduxProvider({children}:{children:ReactNode}) {
  // redus provider for all website
  return (
    <>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
           {children}
        </QueryClientProvider>
    </Provider>
    </>
  )
}
