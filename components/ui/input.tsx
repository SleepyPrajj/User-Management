import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className=" px-4 block bg-transparent border-2 border-[#3e3e3e] rounded-lg text-white py-3 text-base hover:border-[#fff] cursor-pointer transition"

        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
