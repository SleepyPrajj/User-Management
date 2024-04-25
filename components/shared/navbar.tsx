import Link from "next/link"
import MainNav from "@/components/shared/main-nav"
import UserNav from "@/components/shared/user-nav"
const Navbar = () => {
  return (
    <header className="w-full fixed z-10 top-0 bg-gray-100 dark:bg-gray-900 border-b p-8 border-gray-200">
      <nav className="h-16 px-4 flex items-center">
        <MainNav />
        <div className="ml-auto flex justify-center items-center">
          <UserNav />
        </div>
      </nav>
    </header>
  )
}

export default Navbar