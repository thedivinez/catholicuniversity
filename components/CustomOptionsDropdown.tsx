import { Fragment, useEffect, useState } from "react"
import { Listbox, Transition } from "@headlessui/react"
import { MdCheck, MdArrowDropDown } from "react-icons/md"

interface Props {
  name?: string
  className?: string
  labelText?: string
  options: string[]
  onChange?: (arg: string) => void
}
const CustomOptionsDropdown: React.FC<Props> = (props) => {
  const [selected, setSelected] = useState(props.options[0])
  useEffect(() => props.onChange?.(selected), [props, props.onChange, selected])
  return (
    <div className="flex w-full flex-col space-y-2 text-xxs cursor-pointer">
      <label className="font-bold">{props.labelText}</label>
      <Listbox value={selected} onChange={setSelected}>
        <div className={`relative mt-1 ${props.className ?? ""}`}>
          <Listbox.Button className="relative w-full cursor-default rounded-md bg-platform-btn py-2 pl-3 pr-10 text-left text-xs">
            <div className="flex justify-items-center space-x-1">
              <input hidden name={props.name} value={selected} onChange={() => { }} />
              <span className="block truncate text-slate-100">{selected}</span>
            </div>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <MdArrowDropDown className="h-5 w-5 text-slate-200" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-b-md bg-slate-300">
              {props.options.map((option) => (
                <Listbox.Option
                  key={option}
                  value={option}
                  className={({ active, selected }) => `cursor-pointer py-2 pl-5 ${active || selected ? "bg-slate-500 text-white" : "text-gray-900"}`}
                >
                  {({ selected }) => (
                    <div className="flex items-center space-x-2">
                      {selected && <MdCheck className="h-5 w-5 text-platform-secondary" aria-hidden="true" />}
                      <span className={`block truncate text-xs font-medium`}>{option}</span>
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default CustomOptionsDropdown
