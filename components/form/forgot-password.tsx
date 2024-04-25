"use client"
import React, { useState } from 'react'
import Button from '../common/Button'
import Input from '../common/Input'
import styles from './Auth.module.scss'
import InfoText from './InfoText'
import { InputError } from '@/app/types'
import axios, { AxiosError } from 'axios'
import SuccessText from '../common/SuccessText'
import ErrorText from '../common/ErrorText'
import { FORGOT_PASSWORD_API_URL } from '@/constants'
// import connectDB from '@/lib/mongodb'
const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("")
  const [validationError, setValidationError] = useState<InputError>({})
  const [submitError, setSubmitError] = useState<string>("")
  const [apiSuccessMsg, setApiSuccessMsg] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //validate the input
    if (email.trim() === "") {
      setValidationError({ email: "Email is required" })
    }
    else {
      setValidationError({ email: "" })
      setApiSuccessMsg("")
      try {
        setLoading(true)
        // await connectDB()
        const apiRes = await axios.post(FORGOT_PASSWORD_API_URL, { email })
        console.log(apiRes)
        if (apiRes?.data?.success) {
          setApiSuccessMsg(apiRes?.data.message)
          setSubmitError("")
        }
      } catch (error:any) {
        setApiSuccessMsg("")
        console.log(error)
        if (error instanceof AxiosError) {
          const errorMsg = error.response?.data?.error
          setSubmitError(errorMsg)
        }
      }

      setLoading(false)
    }
  }
  return (
    <div className={styles.mainContainer}>
      <form
        className={`${styles.form} ${styles.forgotPasswordForm}`}
        onSubmit={handleForgotPassword}
      >
        <h2 className="font-serif"> Forgot Password </h2>
        <Input
          label={"Email"}
          name={"email"}
          onChange={handleInputChange}
          error={validationError.email}
        />
        <Button
          type={"submit"}
          loading={loading}
        >
                    Submit
        </Button>
        {
          apiSuccessMsg &&
                    <SuccessText text={apiSuccessMsg} />
        }
        <InfoText
          text={"Go back to"}
          linkTitle={"Login"}
          linkHref={"/signin"}
        />
        {
          submitError &&
                    <ErrorText text={submitError} />
        }
      </form>
    </div>
  )
}

export default ForgotPassword