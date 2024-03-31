import { create } from "zustand"
import { motion } from "framer-motion"
import { immer } from "zustand/middleware/immer"
import { RiCloseCircleFill } from "react-icons/ri"
import React, { Fragment, useEffect } from "react"
import { Dialog, Transition } from "@headlessui/react"

interface NotificationState {
  shown: boolean
  title: string
  message: string
  dialogType: string
  content: JSX.Element | undefined
  generateDialog: (title: string, type: string, message: string) => void
  setContent: (content: JSX.Element | undefined) => void
}

const useNotificationState = create<NotificationState>()(
  immer((set, _get) => ({
    title: "",
    message: "",
    shown: false,
    dialogType: "",
    content: undefined,
    generateDialog: (dialogType, title, message) => {
      set((state) => {
        state.shown = true
        state.title = title
        state.message = message
        state.dialogType = dialogType
      })
    },
    setContent: (content) => {
      set((state) => {
        state.content = content
      })
    },
  })),
)

const Notifier: React.FC = () => {
  const content = useNotificationState((state) => state.content)
  const setContent = useNotificationState((state) => state.setContent)
  useEffect(() => {
    if (content != null) {
      setTimeout(() => setContent(undefined), 4000)
    }
  }, [content, setContent])
  return content != null ? (
    <motion.div
      animate={{ x: 50 }}
      transition={{ type: "spring", stiffness: 50 }}
      className={"absolute bottom-36 left-20 z-50 flex w-max rounded-lg bg-platform-btn text-xs shadow-lg ease-in"}
    >
      {content}
    </motion.div>
  ) : (
    <></>
  )
}

const SuccessErrorDialog: React.FC = () => {
  const { title, shown, message, dialogType } = useNotificationState()
  return (
    <Transition appear show={shown} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeDialog}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
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
              <Dialog.Panel className="h-96 w-1/3 transform rounded-md bg-platform-primary align-middle shadow-xl transition-all border border-platform-border/40">
                <Dialog.Title as="div" className="flex justify-between rounded-t-lg bg-platform-accent p-3 text-lg font-medium leading-6">
                  <span className="text-sm font-medium text-white">{title}</span>
                  <RiCloseCircleFill
                    onClick={closeDialog}
                    className="h-6 w-6 cursor-pointer text-white hover:text-white/90"
                  />
                </Dialog.Title>
                <div className="flex h-full flex-col items-center text-gray-200">
                  <div className="mt-20 flex flex-col">
                    <span className={`${dialogType === "success" ? "text-platform-green-light" : "text-platform-red-light"} text-2xl font-bold uppercase`}  >
                      {dialogType}
                    </span>
                  </div>
                  <span className="mt-10 text-xs text-gray-300">{message}.</span>
                  <button onClick={closeDialog} className="mt-10 w-24 rounded-md bg-platform-accent py-2">
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

const createDialog = (type: string, title: string, message: string) => useNotificationState.getState().generateDialog(type, title, message)

const closeDialog = () =>
  useNotificationState.setState((state) => {
    state.shown = false
  })

export { Notifier, SuccessErrorDialog, createDialog, closeDialog }
