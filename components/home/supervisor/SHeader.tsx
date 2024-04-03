import React from 'react'
import { FaUserTie } from 'react-icons/fa'
import usePlatformState from '@/hooks/store'
import PDFExport from '@/components/PDFExport';
import { MdLocalPhone, MdOutlineAlternateEmail } from 'react-icons/md'

interface Props {
  selected: string;
}
const SHeader: React.FC<Props> = (props) => {
  const tasks = usePlatformState((state) => state.assessment)
  const students = usePlatformState((state) => state.students)
  const selected = students.findLast((student) => student.id == props.selected)
  return (
    <div className='flex h-28 bg-indigo-700/30 rounded-lg p-4 justify-evenly items-center'>
      <div className='flex mt-2 items-center text-slate-300 space-x-2'>
        <FaUserTie className='h-8 w-8 bg-yellow-500 rounded-full text-blue-900 p-1' />
        <span>{selected?.name}</span>
      </div>
      <div className='flex mt-2 items-center text-slate-300 space-x-2'>
        <MdLocalPhone className='h-8 w-8 bg-yellow-500 rounded-full text-blue-900 p-1' />
        <span>{selected?.phone}</span>
      </div>
      <div className='flex mt-2 items-center text-slate-300 space-x-2'>
        <MdOutlineAlternateEmail className='h-8 w-8 bg-yellow-500 rounded-full text-blue-900 p-1' />
        <span>{selected?.email}</span>
      </div>
      <PDFExport tasks={tasks} student={selected!} />
    </div>
  )
}

export default SHeader