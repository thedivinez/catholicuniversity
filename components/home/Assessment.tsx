import useFetch from 'use-http'
import AddTask from "./AddTask";
import SHeader from './supervisor/SHeader';
import { useEffect, useState } from 'react';
import usePlatformState from "@/hooks/store";
import { useSession } from 'next-auth/react';
import { FaChevronUp } from "react-icons/fa6";
import { Disclosure } from '@headlessui/react';
import SupervisorSideBar from './supervisor/SSideBar';
import PDFExport from '../PDFExport';

const Assessment = () => {
    const { data } = useSession()
    const { get, loading, error } = useFetch()
    const tasks = usePlatformState((state) => state.assessment)
    const [selected, setSelected] = useState(data?.user.regNumber!)

    useEffect(() => {
        get(`/api/assessment?uid=${selected}`).then((response) => {
            if (response.data != undefined) {
                usePlatformState.setState((state) => { state.assessment = response.data })
            }
        }).catch(console.log)
    }, [data, get, selected])

    if (loading) return <div className='flex flex-col h-full'>Loading</div>
    if (error) return <div className='flex flex-col h-full'>Failed to load tasks</div>

    return (<div className={`flex w-full h-full ${data?.user.userType == "supervisor" ? 'justify-between pl-80' : 'justify-center'}`}>
        <div className="flex flex-col 2xl:mt-20 w-3/4 2xl:w-2/3 space-y-6 h-full overflow-y-auto">
            <PDFExport />
            {selected != data?.user.regNumber! && <SHeader selected={selected} />}
            {tasks.map((week) => <Disclosure key={week.week}>
                {({ open }) => (
                    <div>
                        <Disclosure.Button className="flex w-full justify-between rounded-lg bg-slate-500/60 px-4 py-2 text-left text-sm font-medium text-yellow-500 hover:bg-slate-500/50 ">
                            <span>{week.week}</span>
                            <FaChevronUp className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-yellow-500`} />
                        </Disclosure.Button>
                        <Disclosure.Panel className="flex min-w-full text-sm mt-3.5">
                            <div className='flex flex-col space-y-2 border-x rounded-t border-slate-500/70 border-b rounded-bl pb-2'>
                                <span className='bg-slate-500/60 text-center px-2 py-0.5 rounded-tl font-medium'>Date</span>
                                <span className='px-2 text-slate-300 w-28 text-center'>{week.date}</span>
                            </div>
                            <div className='flex flex-col space-y-2 border-r border-slate-500/70 border-b pb-2 w-full'>
                                <span className='bg-slate-500/60 text-center px-2 py-0.5 font-medium'>Task or Description of Work Done</span>
                                <p className='px-2 text-slate-300'>{week.task}</p>
                            </div>
                            <div className='flex flex-col space-y-2 border-r border-slate-500/70 border-b pb-2'>
                                <span className='bg-slate-500/60 text-center px-2 py-0.5 font-medium'>Supervisor</span>
                                <span className='px-2 text-slate-300 w-32 text-center'>{week.supervisor}</span>
                            </div>
                            <div className='flex flex-col space-y-2 border-r border-slate-500/70 border-b pb-2'>
                                <span className='bg-slate-500/60 text-center px-2 py-0.5 font-medium w-full'>Comments</span>
                                <span className='px-2 text-slate-300'>{week.comments}</span>
                            </div>
                            <div className='flex flex-col space-y-2 border-r border-slate-500/70 border-b pb-2 rounded-br rounded-tr font-medium'>
                                <span className='bg-slate-500/60 text-center px-2 rounded-tr py-0.5'>Signature</span>
                                <span className='px-2 text-slate-300 w-28'></span>
                            </div>
                        </Disclosure.Panel>
                    </div>
                )}
            </Disclosure>)}
            {data?.user.userType != "supervisor" && <AddTask />}
        </div>
        {data?.user.userType == "supervisor" && <SupervisorSideBar selected={selected} setSelected={setSelected} />}
    </div>
    )
}

export default Assessment