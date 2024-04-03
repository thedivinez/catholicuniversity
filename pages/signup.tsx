import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import TextInputField from '@/components/TextInputField'
import CustomToast from "@/components/notifier/CustomToast";

const SignUp = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!loading) {
            try {
                setLoading(true)
                await axios.post('/api/signup', e.target.toJson())
                const response = await signIn("credentials", { ...e.target.toJson(), redirect: false })
                if (response?.ok) {
                    router.replace("/", undefined, { shallow: true })
                } else {
                    toast.custom((t) => <CustomToast t={t} type="error" heading="Authentication" message={response?.error!} />)
                }
            } catch (error: any) {
                toast.custom((t) => <CustomToast t={t} type="error" heading="Authentication" message={error.response.data} />)
            } finally {
                setLoading(false)
            }
        }
    }

    return (
        <main className="flex h-screen w-screen flex-col items-center justify-center">
            <form className="flex flex-col items-center w-1/4" onSubmit={onSubmit}>
                <Image
                    priority
                    width={108}
                    height={18}
                    src="/logo.png"
                    alt="Catholic University Logo"
                />
                <div className="flex flex-col w-full mt-8 space-y-3">
                    <div className="flex justify-between space-x-5">
                        <TextInputField labelText="Reg Number" name="regNumber" placeholder="" className="bg-transparent border border-slate-400 outline-none text-white w-full" />
                        <TextInputField labelText="Supervisor" name="supervisor" placeholder="" className="bg-transparent border border-slate-400 outline-none text-white w-full" />
                    </div>
                    <TextInputField labelText="Company" name="organization" placeholder="" className="bg-transparent border border-slate-400 outline-none text-white w-full" />
                    <TextInputField labelText="Starting Date" name="startingDate" type="date" placeholder="" className="bg-transparent border border-slate-400 outline-none text-white w-full py-2 text-sm" />
                    <TextInputField labelText="Password" name="password" className="bg-transparent border border-slate-400 outline-none text-white w-full" type="password" placeholder="" />
                </div>
                <button className="bg-yellow-500 mt-5 w-full py-2 rounded-md font-medium hover:bg-yellow-500/90 text-slate-900 text-center">Sign Up</button>
                <div className="flex text-sm justify-between w-full mt-4 text-slate-300">
                    <span>Already have an account?</span>
                    <Link href="/signin" className="text-yellow-500 cursor-pointer underline underline-offset-2">Sign In</Link>
                </div>
            </form>
        </main>
    )
}

export default SignUp