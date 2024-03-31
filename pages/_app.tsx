import "@/lib/extensions"
import Head from "next/head"
import "@/styles/globals.css"
import dynamic from "next/dynamic"
import type { AppProps } from "next/app"
import { Toaster } from "react-hot-toast"
import { Roboto } from "next/font/google"
import { SessionProvider } from "next-auth/react"
import { Notifier, SuccessErrorDialog } from "@/components/notifier"

const poppins = Roboto({ subsets: ["latin"], weight: ["100", "300", "400", "700"] })

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider>
      <main className={poppins.className}>
        <Head>
          <title>Catholic University</title>
        </Head>
        <Notifier />
        <SuccessErrorDialog />
        <Toaster position="bottom-left" reverseOrder={false} />
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  )
}


export default dynamic(() => Promise.resolve(App), { ssr: false });