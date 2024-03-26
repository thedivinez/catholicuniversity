"use client"
import Clock from 'react-live-clock';
import { GoDotFill } from 'react-icons/go'

const Footer = () => {
    return (
        <footer className="flex w-full h-10 border-t border-slate-500/30 items-center px-3 justify-between">
            <div className='flex items-center'>
                <GoDotFill className='text-green-400 h-5 w-5' />
                <span className='text-xs text-slate-300'>Server Status</span>
            </div>
            <span></span>
            <Clock format={'dddd, MMMM DD, YYYY, h:mm:ss A'} ticking={true} className='text-sm space-x-1 text-slate-300' />
        </footer>
    )
}

export default Footer