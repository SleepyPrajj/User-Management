"use client"
import { useSession } from "next-auth/react"

import { UserCircle2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const UserAvatar = () => {
  const { data: session } = useSession()

  return (
    <div className="flex justify-center h-16 w-16 gap-4 items-center">
      {session?.user?.image ? (
        <Avatar className="mx-auto w-8 h-8">
          <AvatarImage src={session.user.image} alt="user avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ) : (
        <UserCircle2 className="mx-auto w-8 h-8"/>
      )}
      <div className="flex-col"><p className="w-full text-center text-l">{session?.user?.name}</p></div>
    </div>
  )
}

export default UserAvatar