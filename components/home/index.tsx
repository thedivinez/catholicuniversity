"use client"

import usePlatformState from "@/hooks/store"

const Home = () => {
    const sideBarItem = usePlatformState((state) => state.sideBarItem)
    return <div className="w-full flex justify-center">
        <sideBarItem.content />
    </div>
}

export default Home