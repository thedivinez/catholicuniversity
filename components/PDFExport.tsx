import { v4 as uuid } from "uuid"
import { LuPrinter } from "react-icons/lu";
import { useSession } from "next-auth/react";
import { LogBookTable, Student } from "@/types/types";
import { createTw } from "react-pdf-tailwind";
import { IoMdCloseCircle } from "react-icons/io";
import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from "@headlessui/react";
import { PDFViewer, Document, Page, Text, View, Image } from "@react-pdf/renderer";

const tw = createTw({
    theme: {
        extend: {
            colors: {
                pdfbg: "#22358E"
            }
        }
    }
});

interface Props {
    student: Student
    tasks: LogBookTable[]
}

const PDFExport: React.FC<Props> = (props) => {
    const { data: session } = useSession()
    let [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div className="flex bg-yellow-500 rounded-full cursor-pointer hover:bg-yellow-500/80 space-x-3 p-2 text-blue-900 font-bold w-40 h-10" onClick={_ => setIsOpen(!isOpen)}>
                <LuPrinter className="w-6 h-6" />
                <span>Print log book</span>
            </div>
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
                                <Dialog.Panel className="w-1/2 transform overflow-hidden rounded-lg bg-slate-800 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title as="h3" className="flex justify-between text-md font-semibold bg-yellow-500 text-slate-800 p-2 items-center" >
                                        <span>Add New Task</span>
                                        <IoMdCloseCircle className='h-6 w-6 cursor-pointer' onClick={_ => setIsOpen(false)} />
                                    </Dialog.Title>
                                    <PDFViewer width="100%" height="700px">
                                        <Document>
                                            <Page size="A4" style={tw("flex flex-col")}>
                                                <View style={tw("flex flex-row items-center justify-between w-full p-3 bg-pdfbg")}  >
                                                    <Image src="/logo.png" style={tw("h-24 w-24")} />
                                                    <Text style={tw("font-bold text-yellow-500")}>
                                                        Catholic University In Zimbabwe
                                                    </Text>
                                                </View>
                                                <View style={tw("flex w-full h-full p-4 flex-col bg-blue-100 justify-end")} wrap={false} >
                                                    <View style={tw("flex flex-col flex-col justify-center items-center text-3xl font-bold mt-20")} wrap={false} >
                                                        <Text style={tw("font-bold uppercase")}>
                                                            Catholic University In Zimbabwe
                                                        </Text>
                                                        <Text style={tw("text-3xl font-bold mt-2")}>
                                                            ATTACHMENT LOG BOOK
                                                        </Text>
                                                    </View>
                                                    <View style={tw("flex w-full h-full p-4 flex-col justify-end mb-14")} wrap={false} >
                                                        <Text style={tw("text-xl")}>
                                                            Name : {props.student.name}
                                                        </Text>
                                                        <Text style={tw("text-xl")}>
                                                            Phone : {props.student.phone}
                                                        </Text>
                                                        <Text style={tw("text-xl")}>
                                                            Email : {props.student.email}
                                                        </Text>
                                                        <Text style={tw("text-xl")}>
                                                            Supervisor : {session?.user.userType == "student" ? session?.user.supervisor : `${session?.user.firstName} ${session?.user.lastName}`}
                                                        </Text>
                                                        <Text style={tw("text-xl")}>
                                                            Programme : {props.student.programme}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </Page>
                                            <Page size="A4" style={tw("flex flex-col bg-blue-100")}>
                                                <View style={tw("flex flex-row items-center justify-between w-full p-3 bg-pdfbg")}  >
                                                    <Image src={"/logo.png"} style={tw("h-14 w-14")} />
                                                    <Text style={tw("font-bold text-yellow-500")}>
                                                        Catholic University In Zimbabwe
                                                    </Text>
                                                </View>
                                                <View style={tw("flex w-full p-4 flex-col")} wrap={false} >
                                                    <View style={tw('flex flex-row text-sm')}>
                                                        <Text style={tw('text-center py-0.5 font-medium border-r border border-slate-500 w-[15%]')}>Date</Text>
                                                        <Text style={tw('text-center py-0.5 font-medium border-y border-r border-slate-500 w-[25%]')}>Description of Work Done</Text>
                                                        <Text style={tw('text-center py-0.5 px-2 font-medium border-y border-r border-slate-500 w-[15%]')}>Org Supervisor</Text>
                                                        <Text style={tw('text-center py-0.5 font-medium border-y border-r border-slate-500 w-[25%]')}>Comments</Text>
                                                        <Text style={tw('text-center py-0.5 border-y border-r border-slate-500 w-[20%]')}>Supervisor Comment</Text>
                                                    </View>
                                                    {props.tasks.map((task) => <View key={uuid()} style={tw("flex flex-row w-full text-sm text-slate-600")}>
                                                        <Text style={tw('w-[15%] text-center border-l border-b border-slate-500')}>{task.date}</Text>
                                                        <Text style={tw('w-[25%] text-center border-l border-b border-slate-500')}>{task.task}</Text>
                                                        <Text style={tw('w-[15%] text-center border-l border-b border-slate-500')}>{task.supervisor}</Text>
                                                        <Text style={tw('w-[25%] text-center border-l border-b border-slate-500')}>{task.comments}</Text>
                                                        <Text style={tw('w-[20%] text-center border-x border-b border-slate-500')}>{task.supervisorComment}</Text>
                                                    </View>)}
                                                </View>
                                            </Page>
                                        </Document>
                                    </PDFViewer>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default PDFExport

