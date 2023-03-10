import { ChakraProvider } from '@chakra-ui/react'
import { defaultTheme } from '@cosmos-kit/react'
import WalletProvider from 'client/react/wallet/WalletProvider'
import { MetaTags } from 'components'
import { TxProvider } from 'contexts/tx'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'

import 'styles/globals.css'
import 'styles/fonts.css'
import 'styles/borders.scss'

export default function WagerApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster position="top-right" />
      <WalletProvider>
        <TxProvider>
          <MetaTags
            title="Token Dueling"
            description="🪄 Duel your Pixel Wizard against other wizards. Prepare your knowledge, place your bet and show who is truely the wisest!"
            image="https://pixelwizards.art/wp-content/uploads/2023/03/tokendueling-min.jpg"
            ogImage="https://pixelwizards.art/wp-content/uploads/2023/03/tokendueling-min.jpg"
            url="https://duel.pixelwizards.art"
          />
          <main className="w-screen min-h-screen overflow-x-hidden text-white bg-bg">
            <Component {...pageProps} />
          </main>
        </TxProvider>
      </WalletProvider>
    </>
  )
}
