"use client"
import { IconType } from "react-icons"
import { ChangeEventHandler, ReactNode, useState } from "react"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"

interface Props {
  id?: string
  name?: string
  type?: string
  value?: string
  Icon?: ReactNode
  multiLine?: boolean
  labelText?: string
  className?: string
  isRequired?: boolean
  placeholder: string
  onIconClick?: Function
  handleChange?: ChangeEventHandler<HTMLInputElement>
}

const TextInputField: React.FC<Props> = (props) => {
  const [showPassword, setShowPassword] = useState(true)
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={props.id ?? props.name} className="text-xs font-normal text-slate-300">
        {props.labelText}
      </label>
      <div className="relative w-full flex">
        {props.multiLine ?? false ? (
          <textarea
            id={props.id}
            name={props.name}
            value={props.value}
            required={props.isRequired}
            placeholder={props.placeholder}
            className={`mt-2 w-full rounded-lg bg-slate-200 p-3 pr-8 text-slate-900 shadow-sm ${props.className ?? ""}`}
          />
        ) : (
          <input
            id={props.id}
            className={`mt-2 w-full rounded-lg bg-slate-200 p-2.5 pr-8 text-xs text-slate-900 shadow-sm ${props.className ?? ""}`}
            name={props.name}
            required={props.isRequired}
            onChange={props.handleChange}
            placeholder={props.placeholder}
            type={showPassword ? props.type : "text"}
          />
        )}
        {props.type === "password" && (
          <span
            className="absolute inset-y-0 right-2 inline-flex cursor-pointer items-center"
            onClick={() => (props.type === "password" ? setShowPassword(!showPassword) : props.onIconClick?.())}
          >
            {showPassword ? (
              <AiFillEye className="mt-2 h-5 w-5 text-slate-300" />
            ) : (
              <AiFillEyeInvisible className="mt-2 h-5 w-5 text-slate-300" />
            )}
          </span>
        )}
        {props.Icon != null && (
          <span className="absolute inset-y-4 right-2 inline-flex cursor-pointer items-center h-5 w-5 text-slate-400" onClick={() => props.onIconClick?.()}>
            {props.Icon}
          </span>
        )}
      </div>
    </div>
  )
}

export default TextInputField
