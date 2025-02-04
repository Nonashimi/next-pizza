"use client"

import React, { FC } from 'react'
import {SessionProvider} from "next-auth/react";
import { Toaster } from 'react-hot-toast';
import NextTopLoader from "nextjs-toploader";
export const  Providers:FC<React.PropsWithChildren> = ({children}) => {
    return (
        <>
          <SessionProvider>
                {children}
          </SessionProvider>
          <Toaster/>
          <NextTopLoader/>
        </>
      )
}

