import React from 'react'

interface SuccessTextProps {
    text: string;
}

const SuccessText = ({ text }: SuccessTextProps) => {
  return (
    <div className="flex bg-green-100 border w-128 border-teal-400 text-green-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">{text}</strong>      
    </div>
  )
}

export default SuccessText