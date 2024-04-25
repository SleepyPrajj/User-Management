"use client"

import { UserCarousal } from "@/components/carousal/user-carousal"
import { useSession } from "next-auth/react"

const UserPage = () => {
  // const { data: session } = useSession()
  return (
    <section>
      {<UserCarousal/>}
      
    </section>
  )
}

export default UserPage