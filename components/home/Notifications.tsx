import useFetch from 'use-http'
import React, { useEffect } from 'react'
import usePlatformState from '@/hooks/store'
import { useSession } from 'next-auth/react'

const Notifications = () => {
    const { data } = useSession()
    const { get, loading, error } = useFetch()
    const notifications = usePlatformState((state) => state.notifications)

    useEffect(() => {
        get(`/api/assessment?uid=${data?.user.regNumber}`).then((response) => {
            if (response.data != undefined) {
                usePlatformState.setState((state) => { state.assessment = response.data })
            }
        }).catch((error) => console.log(error))
    }, [data, get])

    if (loading) return <div>Loading</div>
    if (error) return <div>Failed to load notification</div>

    return (
        <div className='flex flex-col w-3/4 2xl:w-2/3 mt-16 space-y-5'>
            {
                data?.user.userType == "student" ? notifications.map((notification) => <div key={notification.id} className='bg-slate-500 rounded-lg p-2'>
                    <p className='text-sm'>
                        {notification.message}
                    </p>
                </div>) :
                    <>csd</>
            }

        </div>
    )
}

export default Notifications