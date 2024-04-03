import "@/lib/extensions"
import useFetch from "use-http";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import { Fragment, useState } from 'react'
import usePlatformState from "@/hooks/store";
import { LogBookTable } from "@/types/types";
import { MdOutlineEdit } from "react-icons/md";
import { IoMdCloseCircle } from 'react-icons/io'
import CustomToast from "../notifier/CustomToast";
import "react-datepicker/dist/react-datepicker.css";
import { Dialog, Transition } from '@headlessui/react'

interface Props {
    selected: string
    task: LogBookTable
}

const EditTask: React.FC<Props> = (props) => {
    let [isOpen, setIsOpen] = useState(false)
    const { patch, loading, error } = useFetch()
    const user = usePlatformState((state) => state.user)
    const [startDate, setStartDate] = useState(new Date(props.task.date));

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!loading) {
            const task = { ...e.target.toJson(), week: props.task.week, id: props.task.id } as LogBookTable
            const response = await patch('/api/assessment', task)
            usePlatformState.setState((state) => {
                const index = state.assessment.findLastIndex((ass) => ass.id == response.data.task.id)
                state.assessment[index] = response.data.task
            })
            toast.custom((t) => <CustomToast t={t} type="success" heading="Tasks" message={response.data.message} />)
        }
    }

    return (
        <>
            <MdOutlineEdit className='absolute right-0 bg-yellow-500 rounded-full h-6 w-6 p-0.5 text-slate-900 cursor-pointer' onClick={_ => setIsOpen(!isOpen)} />
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
                                        <span>Update Task</span>
                                        <IoMdCloseCircle className='h-6 w-6 cursor-pointer' onClick={_ => setIsOpen(false)} />
                                    </Dialog.Title>
                                    <form className="flex flex-col p-10 bg-indigo-900/70 space-y-5 text-sm" onSubmit={onSubmit}>
                                        <div className='flex w-full justify-between space-x-10'>
                                            <div className={`flex flex-col w-full space-y-1.5 ${user.userType == "supervisor" ? "text-slate-400" : "text-white"}`}>
                                                <label className='text-sm font-medium'>Date</label>
                                                <DatePicker name="date" disabled={user.userType == "supervisor"} selected={startDate} onChange={(date) => setStartDate(date!)} className='px-2 p-1.5 outline-none rounded-lg bg-transparent border border-slate-400/60 w-full' />
                                            </div>
                                            <div className={`flex flex-col w-full space-y-1.5 ${user.userType == "supervisor" ? "text-slate-400" : "text-white"}`}>
                                                <label className='font-medium'>Supervisor</label>
                                                <input name="supervisor" disabled={user.userType == "supervisor"} className='p-1.5 outline-none rounded-lg bg-transparent border border-slate-400/60 w-full' defaultValue={props.task.supervisor} />
                                            </div>
                                        </div>
                                        <div className={`flex flex-col w-full space-y-1.5 ${user.userType == "supervisor" ? "text-slate-400" : "text-white"}`}>
                                            <label className='font-medium'>Task Description</label>
                                            <textarea name="task" disabled={user.userType == "supervisor"} className='px-2 p-1.5 outline-none rounded-lg bg-transparent border border-slate-400/60 w-full' defaultValue={props.task.task} />
                                        </div>
                                        <div className={`flex flex-col w-full space-y-1.5 ${user.userType == "supervisor" ? "text-slate-400" : "text-white"}`}>
                                            <label className='font-medium'>Student Comments</label>
                                            <textarea name="comments" disabled={user.userType == "supervisor"} className='px-2 p-1.5outline-none rounded-lg bg-transparent border border-slate-400/60 w-full' defaultValue={props.task.comments} />
                                        </div>
                                        <div className={`flex flex-col w-full space-y-1.5 ${user.userType == "student" ? "text-slate-400" : "text-white"}`}>
                                            <label className='font-medium'>Supervisor Comments</label>
                                            <textarea name="supervisorComment" disabled={user.userType == "student"} className='px-2 p-1.5 outline-none rounded-lg bg-transparent border border-slate-400/60 w-full' defaultValue={props.task.supervisorComment} />
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

export default EditTask