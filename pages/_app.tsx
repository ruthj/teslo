import { SessionProvider } from "next-auth/react"
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material';
import { SWRConfig } from 'swr';
import { AuthProvider, CartProvider, UiProvider } from '../context';
import '../styles/globals.css';

import { lightTheme } from '../themes';

function MyApp({ Component, pageProps }: AppProps) {
  return (

    <SessionProvider>
      <SWRConfig 
        value={{
        
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        }}
      >
        <AuthProvider>
          <CartProvider>
            <UiProvider>
              <ThemeProvider theme={ lightTheme }>
                  <Component {...pageProps} />

                </ThemeProvider>
            </UiProvider>
            </CartProvider>
          </AuthProvider>
      </SWRConfig>
    </SessionProvider>

    
  )
}

export default MyApp
