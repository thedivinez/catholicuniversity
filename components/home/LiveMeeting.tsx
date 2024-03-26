import Image from "next/image";

const LiveMeeting = () => {
    return (
        <div className='flex w-full h-full items-center justify-center space-x-6'>
            <a href='https://meet.google.com' target='blank'>
                <Image width={80} height={80} src="/google-meet.svg" alt={""} />
            </a>
            <a href='https://zoom.us' target='blank'>
                <Image width={80} height={80} src="/zoom.svg" alt={""} />
            </a>
        </div>
    )
}

export default LiveMeeting