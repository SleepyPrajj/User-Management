import Link from "next/link"
import { getUserSession } from "@/lib/actions/auth.actions"
import { buttonVariants } from "@/components/ui/button"
import UserAvatar from "@/components/shared/user-avatar"
import SignOutButton from "@/components/button/signout-button"

const UserNav = async () => {
  const { session } = await getUserSession()
  return (
    <div>
      {session ? (
        <div className="flex gap-12 justify-center items-center"><UserAvatar /><Link href="/profile">
          Profile
        </Link>
        <SignOutButton /></div>
      ) : (
        <Link className={buttonVariants()} href="/signin">
          Sign In
        </Link>
      )}
    </div>
  )
}

export default UserNav