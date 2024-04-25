import ResetPassword from '@/components/form/reset-password'
import { ResetPasswordProps } from '@/app/types'
import React from 'react'

const page = ({ params }: ResetPasswordProps) => {
  return (
    <ResetPassword
      params={params}
    />
  )
}

export default page