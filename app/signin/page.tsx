import Image from "next/image";
import TextInputField from "@/components/TextInputField";

export default function Home() {
    return (
        <main className="flex h-screen w-screen flex-col items-center justify-center">
            <div className="flex flex-col items-center w-1/5">
                <Image
                    priority
                    width={108}
                    height={18}
                    src="/logo.png"
                    alt="Catholic University Logo"
                />
                <div className="flex flex-col w-full mt-8 space-y-3">
                    <TextInputField labelText="Email / Reg Number" placeholder="" className="bg-transparent border border-slate-400 outline-none text-white w-full" />
                    <TextInputField labelText="Password" className="bg-transparent border border-slate-400 outline-none text-white w-full" type="password" placeholder={""} />
                </div>
                <a href="/" className="bg-yellow-500 mt-5 w-full py-2 rounded-md font-medium hover:bg-yellow-500/90 text-slate-900">Sign In</a>
                <div className="flex text-sm justify-between w-full mt-4 text-slate-300">
                    <span>Don&apos;t Have An Account?</span>
                    <a href="/signup" className="text-yellow-500 cursor-pointer underline underline-offset-2">Sign Up</a>
                </div>
            </div>
        </main>
    );
}
