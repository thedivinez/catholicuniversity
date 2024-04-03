import axios from 'axios';
import useFetch from 'use-http'
import AddTask from "./AddTask";
import EditTask from './EditTask';
import PDFExport from '../PDFExport';
import SHeader from './supervisor/SHeader';
import { useEffect, useState } from 'react';
import usePlatformState from "@/hooks/store";
import { FaChevronUp } from "react-icons/fa6";
import { Disclosure } from '@headlessui/react';
import SupervisorSideBar from './supervisor/SSideBar';

const Assessment = () => {
    const { get, loading, error } = useFetch()
    const user = usePlatformState((state) => state.user)
    const [selected, setSelected] = useState(user.regNumber!)
    const tasks = usePlatformState((state) => state.assessment)

    useEffect(() => {
        axios.get(`/api/assessment?uid=${selected}`).then((response) => {
            if (response.data != undefined) {
                usePlatformState.setState((state) => { state.assessment = response.data })
            }
        }).catch(console.log)
    }, [get, user.progress, selected])

    if (loading) return <div className='flex flex-col h-full'>Loading</div>
    if (error) return <div className='flex flex-col h-full'>Failed to load tasks</div>

    return (<div className={`flex w-full h-full ${user.userType == "supervisor" ? 'justify-between pl-80' : 'justify-center'}`}>
        <div className="flex flex-col 2xl:mt-20 w-3/4 2xl:w-2/3 space-y-6 h-full overflow-y-auto mt-5">
            {user.userType == "student" && tasks.isNotEmpty() && <PDFExport tasks={tasks} student={{
                id: selected,
                programme: user.programme,
                phone: user.phone, email: user.email,
                name: `${user.firstName} ${user.lastName}`,
            }} />}
            {selected != user.regNumber && <SHeader selected={selected} />}
            {(selected != user.regNumber!) && tasks.isEmpty() && <p className='text-slate-300 text-center'>
                {user.userType == "supervisor" ? "This student has not added any task yet" : "You have not added any task yet"}
            </p>}
            {(selected == user.regNumber! && user.userType == "supervisor") && <p className='text-slate-300 text-center'>
                No student selected. Plese use right panel to switch between students
            </p>}
            {tasks.map((task) => <Disclosure key={task.week}>
                {({ open }) => (
                    <div>
                        <Disclosure.Button className="flex w-full justify-between rounded-lg bg-slate-500/60 px-4 py-2 text-left text-sm font-medium text-yellow-500 hover:bg-slate-500/50 ">
                            <span>{task.week}</span>
                            <FaChevronUp className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-yellow-500`} />
                        </Disclosure.Button>
                        <Disclosure.Panel className="flex min-w-full text-sm mt-3.5 relative">
                            <EditTask task={task} selected={selected} />
                            <div className='flex flex-col space-y-2 border-x rounded-t border-slate-500/70 border-b rounded-bl pb-2 w-[10%]'>
                                <span className='bg-slate-500/60 text-center px-2 py-0.5 rounded-tl font-medium'>Date</span>
                                <span className='px-2 text-slate-300 text-center'>{task.date}</span>
                            </div>
                            <div className='w-[25%] flex flex-col space-y-2 border-r border-slate-500/70 border-b pb-2'>
                                <span className='bg-slate-500/60 text-center px-2 py-0.5 font-medium'>Task or Description of Work Done</span>
                                <p className='px-2 text-slate-300'>{task.task}</p>
                            </div>
                            <div className='flex flex-col space-y-2 border-r border-slate-500/70 border-b pb-2 w-[15%]'>
                                <span className='bg-slate-500/60 text-center px-2 py-0.5 font-medium'>Org Supervisor</span>
                                <span className='px-2 text-slate-300  text-center'>{task.supervisor}</span>
                            </div>
                            <div className='flex flex-col space-y-2 border-r border-slate-500/70 border-b pb-2 w-[25%]'>
                                <span className='bg-slate-500/60 text-center px-2 py-0.5 font-medium'>Student&apos;s Comments</span>
                                <span className='px-2 text-slate-300'>{task.comments}</span>
                            </div>
                            <div className='flex flex-col space-y-2 border-r border-slate-500/70 border-b pb-2 rounded-br rounded-tr font-medium w-[25%]'>
                                <span className='bg-slate-500/60 text-center px-2 rounded-tr py-0.5'>Supervisor Comments</span>
                                <span className='px-2 text-slate-300'>{task.supervisorComment}</span>
                            </div>
                        </Disclosure.Panel>
                    </div>
                )}
            </Disclosure>)}
            {user.userType != "supervisor" && <AddTask />}
        </div>
        {user.userType == "supervisor" && <SupervisorSideBar selected={selected} setSelected={setSelected} />}
    </div>
    )
}

export default Assessment