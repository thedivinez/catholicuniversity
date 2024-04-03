import axios from 'axios';
import useFetch from 'use-http'
import toast from 'react-hot-toast';
import { VscSend } from "react-icons/vsc";
import { IoMdClose } from "react-icons/io";
import usePlatformState from '@/hooks/store'
import { Notification } from '@/types/types';
import TextInputField from '../TextInputField'
import CustomToast from '../notifier/CustomToast';
import React, { useEffect, useState } from 'react'

const Notifications = () => {
    const { get, post, loading, error } = useFetch()
    const user = usePlatformState((state) => state.user)
    const notifications = usePlatformState((state) => state.notifications)
    const [submiting, setSubmiting] = useState(false)

    useEffect(() => {
        get(`/api/notifications?uid=${user.regNumber}`).then((response) => {
            if (response.data != undefined) {
                usePlatformState.setState((state) => { state.notifications = response.data })
            }
        }).catch((error) => console.log(error))
    }, [get, user.regNumber])

    if (loading) return <div>Loading</div>
    if (error) return <div>Failed to load notification</div>

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!submiting) {
            setSubmiting(true)
            const notification = { ...e.target.toJson(), supervisor: user.regNumber } as Notification
            const response = await post('/api/notifications', notification)
            toast.custom((t) => <CustomToast t={t} type="success" heading="Notifications" message="Notification has been sent" />)
            usePlatformState.setState((state) => { state.notifications.push(response.data) })
            setSubmiting(false)
        }
    }

    const onDelete = async (notificationId: string) => {
        if (!submiting) {
            setSubmiting(true)
            await axios.delete(`/api/notifications?uid=${notificationId}`)
            toast.custom((t) => <CustomToast t={t} type="success" heading="Notifications" message="Notification has been deleted" />)
            usePlatformState.setState((state) => { state.notifications = state.notifications.filter((notification) => notification.id != notificationId) })
            setSubmiting(false)
        }
    }

    return (
        <div className='flex flex-col w-3/4 2xl:w-2/3 my-16 space-y-5 justify-between'>
            <div className='flex flex-col space-y-5'>
                {notifications.isEmpty() && <p className='text-slate-300 text-center'> There are not any notifications available </p>}
                {notifications.map((notification) => <div key={notification.id} className='bg-slate-600/70 rounded-lg p-2 relative cursor-pointer'>
                    <p className='text-sm'>{notification.message}</p>
                    {user.userType == "supervisor" && <IoMdClose className='absolute right-1 top-1 text-red-500' onClick={_ => onDelete(notification.id)} />}
                </div>)}
            </div>
            {user.userType == "supervisor" &&
                <form className='flex justify-self-end items-end space-x-3' onSubmit={onSubmit}>
                    <TextInputField name='message' placeholder='Enter your message here' multiLine className='outline-none py-1 bg-transparent border-b rounded-none text-white' />
                    <button type='submit'>
                        <VscSend className='h-7 w-7' />
                    </button>
                </form>
            }

        </div>
    )
}

export default Notifications