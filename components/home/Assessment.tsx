import AddTask from "./AddTask";
import usePlatformState from "@/hooks/store";
import { FaChevronUp } from "react-icons/fa6";
import { Disclosure } from '@headlessui/react';

const Assessment = () => {
    const tasks = usePlatformState((state) => state.assessment)
    return (
        <div className="flex flex-col mt-10 2xl:mt-20 w-3/4 2xl:w-2/3 space-y-6 h-full overflow-y-auto">
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
            <AddTask />
        </div>
    )
}

export default Assessment