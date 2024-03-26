"use client"
import usePlatformState from '@/hooks/store'
import sideBarItems from '@/lib/sidebaritems'
import { IoPowerSharp } from 'react-icons/io5'

const SideBar = () => {
    const sideBarItem = usePlatformState((state) => state.sideBarItem)
    const updateDashboadItem = usePlatformState((state) => state.updateDashboadItem)
    return (
        <aside className='w-44 h-full py-4 flex flex-col justify-between bg-indigo-700/30 text-slate-300 pl-2'>
            <div className='flex flex-col space-y-4 mt-5'>
                {sideBarItems.map((item) => (
                    <div key={item.id} className={`flex items-center space-x-2 p-2 px-3 cursor-pointer hover:bg-slate-800/70 hover:text-yellow-500 rounded-l-3xl ${sideBarItem.id == item.id && "bg-slate-800/70 text-yellow-500"}`} onClick={_ => updateDashboadItem(item)}>
                        <item.icon className='h-6 w-6' />
                        <span className='font-medium text-sm'>{item.title}</span>
                    </div>
                ))}
            </div>
            <a href='/signin' className='flex items-center space-x-3 mb-2 cursor-pointer w-full text-yellow-500/90 hover:text-yellow-500 justify-center text-sm font-medium'>
                <IoPowerSharp className='h-5 w-5' />
                <span>Sign Out</span>
            </a>
        </aside>
    )
}

export default SideBar