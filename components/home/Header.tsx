import Image from "next/image";
import { FaUser } from "react-icons/fa";

const Header = () => {
    return (
        <nav className="flex w-full h-14 border-b border-slate-500/30 items-center p-2 justify-between">
            <div className="flex items-center space-x-1 font-medium">
                <Image
                    priority
                    width={45}
                    height={9}
                    src="/logo.png"
                    className="p-1"
                    alt="Catholic University Logo"
                />
                <div className="flex flex-col -space-y-2">
                    <span className="uppercase text-yellow-500 font-semibold">Catholic</span>
                    <div className="flex items-center">
                        <hr className="w-3 mr-0.5 border border-slate-400" />
                        <span className="font-medium text-sm text-slate-400 justify-self-end">university</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center space-x-3">
                <div className="flex flex-col items-end -space-y-2 font-medium">
                    <span className="text-yellow-500 font-semibold">John Claison</span>
                    <span className="text-slate-300">student</span>
                </div>
                <FaUser className="rounded-full overflow-hidden text-slate-500/90 pt-1.5 h-10 w-10 bg-white" />
            </div>
        </nav>
    )
}

export default Header