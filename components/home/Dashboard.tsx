import { useSession } from 'next-auth/react';
import { GoOrganization } from 'react-icons/go';
import { FaUser, FaUserGraduate, FaUserTie } from 'react-icons/fa'
import { MdLocalPhone, MdOutlineAlternateEmail } from 'react-icons/md'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';

const Profile = () => {
    const { data } = useSession()
    return (
        <div className="flex flex-col w-4/5 mt-10 pb-5 2xl:w-3/4">
            <div className='flex rounded-t-2xl mt-5 h-40 bg-yellow-500 relative justify-end items-start p-3'>
                <FaUser className="rounded-full  text-slate-400 pt-1.5 h-20 w-20 absolute -bottom-10 bg-white left-16" />
                <span className='text-blue-900  font-semibold'>Reg: {data?.user.regNumber}</span>
            </div>
            <div className='flex justify-between h-96 bg-indigo-700/30 rounded-b-2xl py-14 px-10 text-sm'>
                <div className='flex flex-col'>
                    <div className='flex'>
                        <div className='flex flex-col w-96'>
                            <div className='flex space-x-2 items-center'>
                                <span className='text-xl font-bold text-yellow-500'>{data?.user.firstName} {data?.user.lastName}</span>
                                <span className='text-slate-300'>({data?.user.userType})</span>
                            </div>
                            <div className='flex flex-col mt-6'>
                                <span className='text-slate-300 font-medium'>Phone</span>
                                <div className='flex mt-2 items-center text-slate-300 space-x-2'>
                                    <MdLocalPhone className='h-8 w-8 bg-yellow-500 rounded-full text-blue-900 p-1' />
                                    <span>{data?.user.phone}</span>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col mt-14'>
                            <span className='text-slate-300 font-medium'>Email</span>
                            <div className='flex mt-2 items-center text-slate-300 space-x-2'>
                                <MdOutlineAlternateEmail className='h-8 w-8 bg-yellow-500 rounded-full text-blue-900 p-1' />
                                <span>{data?.user.email}</span>
                            </div>
                        </div>
                    </div>
                    <div className='flex mt-5 '>
                        {data?.user.userType == "student" && <div className='flex flex-col mt-6 w-96'>
                            <span className='text-slate-300 font-medium'>Supervisor</span>
                            <div className='flex mt-2 items-center text-slate-300 space-x-2'>
                                <FaUserTie className='h-8 w-8 bg-yellow-500 rounded-full text-blue-900 p-1' />
                                <span>{data?.user.supervisor}</span>
                            </div>
                        </div>}
                        <div className='flex flex-col mt-6'>
                            <span className='text-slate-300 font-medium'>{data?.user.userType == "student" ? "Degree" : "Faculty"}</span>
                            <div className='flex mt-2 items-center text-slate-300 space-x-2'>
                                <FaUserGraduate className='h-8 w-8 bg-yellow-500 rounded-full text-blue-900 p-1' />
                                <span>{data?.user.degree}</span>
                            </div>
                        </div>
                    </div>
                </div>
                {data?.user.userType == "student" &&
                    <div className='flex flex-col items-center space-y-6'>
                        <span className='bg-yellow-500 px-2 rounded-full text-blue-900 font-semibold uppercase text-sm'>Attachment Progress</span>
                        <div className='flex mt-2 items-center text-slate-300 space-x-2 font-medium'>
                            <GoOrganization className='h-5 w-5' />
                            <span>{data?.user.organization}</span>
                        </div>
                        <div className='h-24 w-24 2xl:h-28 2xl:w-28'>
                            <CircularProgressbarWithChildren
                                value={(data?.user.progress! / 8) * 100}
                                styles={{
                                    trail: { stroke: '#ffffff' },
                                    path: { stroke: `#d9ab07`, strokeLinecap: 'round' },
                                }}
                            >
                                <div className='text-center flex flex-col'>
                                    <span className='text-slate-300 font-medium'>Week</span>
                                    <span className='font-bold'>{data?.user.progress!} of 8</span>
                                </div>
                            </CircularProgressbarWithChildren>
                        </div>
                    </div>}
            </div>
        </div>
    )
}

export default Profile