import Image from "next/image"
import toast, { Toast } from "react-hot-toast"

function CustomToast({ t, heading, message, type }: { t: Toast; heading: string; message: string | undefined; type: "success" | "error" }) {
  return (
    <div
      className={`${t.visible ? "animate-enter" : "animate-leave"
        } pointer-events-auto flex w-full max-w-md rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
    >
      <div className="w-0 flex-1 p-4">
        <div className="flex items-start">
          <div className="relative h-10 w-10 flex-shrink-0 rounded-full pt-0.5">
            <Image fill src={type === "success" ? "/img/success.svg" : "/img/error.svg"} alt="" />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">{heading}</p>
            <p className="mt-1 text-xs text-gray-500">{message}</p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button onClick={() => toast.dismiss(t.id)} className="flex w-full items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" >
          Close
        </button>
      </div>
    </div>
  )
}

export default CustomToast
