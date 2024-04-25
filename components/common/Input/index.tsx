import React from 'react'
// import styles from "./Input.module.scss"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

const Input = ({ label, error, type, name, onChange }: InputProps) => {

  return (
    <div >
      <div >
        <input
          type={type}
          className="bg-transparent border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
          name={name}
          placeholder={label}
          onChange={onChange}
        />
      </div>

      {
        error &&
                <p >
                  {error}
                </p>
      }
    </div>
  )
}

export default Input