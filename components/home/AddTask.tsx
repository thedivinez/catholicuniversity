import "@/lib/extensions"
import { useFetch } from "use-http";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import { Fragment, useState } from 'react'
import usePlatformState from "@/hooks/store";
import { useSession } from "next-auth/react";
import { LogBookTable } from "@/types/types";
import { IoAddCircle } from 'react-icons/io5'
import { IoMdCloseCircle } from 'react-icons/io'
import CustomToast from "../notifier/CustomToast";
import "react-datepicker/dist/react-datepicker.css";
import { Dialog, Transition } from '@headlessui/react'
import CustomOptionsDropdown from "../CustomOptionsDropdown";

export default function AddTask() {
    let [isOpen, setIsOpen] = useState(false)
    const { post, loading, error } = useFetch()
    const { data: session, update } = useSession()
    const user = usePlatformState((state) => state.user)
    const [startDate, setStartDate] = useState(new Date());
    const tasks = usePlatformState((state) => state.assessment)

    const weeks = (function () {
        let data: string[] = []
        const all = [...Array(8).keys()].map(i => `Week ${i + 1}`)
        all.forEach((label) => { if (!tasks.findLast((task) => task.week == label)) return data.push(label) })
        return data
    })()

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!loading) {
            const task = { ...e.target.toJson(), regNumber: user.regNumber } as LogBookTable
            const response = await post('/api/assessment', task)
            update({ ...session, user: { ...user, progress: user.progress + 1 } })
            toast.custom((t) => <CustomToast t={t} type="success" heading="Tasks" message={response.data.message} />)
        }
    }

    return (
        <>
            <IoAddCircle className="text-yellow-500 rounded-full ml-auto w-10 h-10 cursor-pointer hover:text-yellow-500/80" onClick={_ => setIsOpen(!isOpen)} />
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={_ => setIsOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/40" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-2/5 transform overflow-hidden rounded-lg bg-slate-800 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title as="h3" className="flex justify-between text-md font-semibold bg-yellow-500 text-slate-800 p-2 items-center" >
                                        <span>Add New Task</span>
                                        <IoMdCloseCircle className='h-6 w-6 cursor-pointer' onClick={_ => setIsOpen(false)} />
                                    </Dialog.Title>
                                    <form className="flex flex-col p-10 bg-indigo-900/70 space-y-5 text-sm" onSubmit={onSubmit}>
                                        <CustomOptionsDropdown name="week" className='text-white rounded-lg bg-transparent border border-slate-400/60 w-full font-medium cursor-pointer' options={weeks} />
                                        <div className='flex w-full justify-between space-x-10'>
                                            <div className='flex flex-col w-full space-y-1.5'>
                                                <label className='text-slate-300 text-sm font-medium'>Date</label>
                                                <DatePicker name="date" selected={startDate} onChange={(date) => setStartDate(date!)} className='px-2 p-1.5 text-white outline-none rounded-lg bg-transparent border border-slate-400/60 w-full' />
                                            </div>
                                            <div className='flex flex-col w-full space-y-1.5'>
                                                <label className='text-slate-300 font-medium'>Supervisor</label>
                                                <input name="supervisor" className='p-1.5 text-white outline-none rounded-lg bg-transparent border border-slate-400/60 w-full' />
                                            </div>
                                        </div>
                                        <div className='flex flex-col w-full space-y-1.5'>
                                            <label className='text-slate-300 font-medium'>Task Description</label>
                                            <textarea name="task" className='px-2 p-1.5 text-white outline-none rounded-lg bg-transparent border border-slate-400/60 w-full' />
                                        </div>
                                        <div className='flex flex-col w-full space-y-1.5'>
                                            <label className='text-slate-300 font-medium'>Comments</label>
                                            <textarea name="comments" className='px-2 p-1.5 text-white outline-none rounded-lg bg-transparent border border-slate-400/60 w-full' />
                                        </div>
                                        <div className={`flex flex-col w-full space-y-1.5 ${user.userType == "student" ? "text-slate-400" : "text-white"}`}>
                                            <label className='font-medium'>Supervisor Comments</label>
                                            <textarea name="supervisorComment" disabled={user.userType == "student"} className='px-2 p-1.5 outline-none rounded-lg bg-transparent border border-slate-400/60 w-full' />
                                        </div>
                                        <button type="submit" className='bg-yellow-500 py-2 rounded-md hover:bg-yellow-500/90 ml-auto px-10 text-slate-800 font-medium'>Submit</button>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
