import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import TextInputField from "@/components/TextInputField";
import CustomToast from "@/components/notifier/CustomToast";

interface Credentials {
    password: string
    regNumber: string
}

export default function SignIn() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!loading) {
            setLoading(true)
            const credentials = e.target.toJson() as Credentials
            const response = await signIn("credentials", { ...credentials, redirect: false })
            if (response?.ok) {
                router.replace("/", undefined, { shallow: true })
            } else {
                toast.custom((t) => <CustomToast t={t} type="error" heading="Authentication" message={response?.error!} />)
            }
            setLoading(false)
        }
    }

    return (
        <main className="flex h-screen w-screen flex-col items-center justify-center">
            <form onSubmit={onSubmit} className="flex flex-col items-center w-1/5">
                <Image
                    priority
                    width={108}
                    height={18}
                    src="/logo.png"
                    alt="Catholic University Logo"
                />
                <div className="flex flex-col w-full mt-8 space-y-3">
                    <TextInputField name="regNumber" labelText="Reg / EC Number" placeholder="" className="bg-transparent border border-slate-400 outline-none text-white w-full" />
                    <TextInputField name="password" labelText="Password" className="bg-transparent border border-slate-400 outline-none text-white w-full" type="password" placeholder={""} />
                </div>
                <button type="submit" className="bg-yellow-500 mt-5 w-full py-2 rounded-md font-medium hover:bg-yellow-500/90 text-slate-900 text-center">Sign In</button>
                <div className="flex text-sm justify-between w-full mt-4 text-slate-300">
                    <span>Don&apos;t Have An Account?</span>
                    <Link href="/signup" className="text-yellow-500 cursor-pointer underline underline-offset-2">Sign Up</Link>
                </div>
            </form>
        </main>
    );
}
