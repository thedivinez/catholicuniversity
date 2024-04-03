import useFetch from 'use-http';
import React, { useEffect } from 'react'
import usePlatformState from '@/hooks/store';
import { useSession } from 'next-auth/react';
import { FaArrowRight } from "react-icons/fa";

interface Props {
    selected: string;
    setSelected: (value: string) => void
}

const SupervisorSideBar: React.FC<Props> = (props) => {
    const { data } = useSession()
    const { get, loading, error } = useFetch()
    const students = usePlatformState((state) => state.students)

    useEffect(() => {
        get(`/api/students?uid=${data?.user.regNumber}`).then((response) => {
            if (response.data != undefined) {
                usePlatformState.setState((state) => { state.students = response.data })
            }
        }).catch(console.log)
    }, [data, get, props.selected])

    return (
        <aside className='w-44 h-full pb-4 flex flex-col bg-indigo-700/30 text-slate-300 items-center'>
            <span className='bg-slate-800/70 w-full p-2 text-center font-medium mb-5 text-white'>Students</span>
            {loading ? <div className='flex flex-col h-full justify-center'>Loading...</div> : error ? <div className='flex flex-col h-full justify-center'>Failed to load...</div> : students.map((student) => (
                <div key={student.id} className={`flex space-x-5 font-bold justify-center border border-yellow-500/20 text-center cursor-pointer hover:bg-slate-800/70 hover:text-yellow-500 w-full py-2 ${props.selected == student.id ? "bg-slate-800/70 text-yellow-500" : "bg-slate-800/30"}`}>
                    {props.selected == student.id && <FaArrowRight className='h-5 w-5' />}
                    <span onClick={_ => props.setSelected(student.id)}>
                        {student.name}
                    </span>
                </div>
            ))}
        </aside>
    )
}

export default SupervisorSideBar