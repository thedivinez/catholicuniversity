import Image from "next/image"
import { NextPage } from 'next'
import Router from "next/router"
import Footer from '@/components/Footer'
import usePlatformState from '@/hooks/store'
import { useSession } from 'next-auth/react'
import Header from '@/components/home/Header'
import SideBar from '@/components/home/SideBar'

const Home: NextPage = () => {
    const { status, data: session } = useSession()
    const sideBarItem = usePlatformState((state) => state.sideBarItem)

    if (status === "unauthenticated") Router.replace("/signin")

    if (status === "authenticated") {
        usePlatformState.setState((state) => { state.user = session.user! })
        return (
            <main className="flex max-h-screen h-screen w-screen flex-col items-center justify-between overflow-hidden">
                <Header />
                <div className="flex w-full h-full">
                    <SideBar />
                    <div className="w-full flex justify-center">
                        <sideBarItem.content />
                    </div>
                </div>
                <Footer />
            </main>
        )
    }

    return (
        <div className="max-w-screen flex h-screen max-h-screen select-none flex-col items-center justify-center text-xs">
            <div className="relative h-20 w-20">
                <Image alt="" src="/loading.gif" unoptimized width={100} height={100} />
            </div>
            <span className="text-white">Loading...</span>
        </div>
    )

}

export default Home