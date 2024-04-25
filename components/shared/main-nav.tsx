"use client"
import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { mainNavLinks } from "@/constants"
import { Menu } from "lucide-react"
import { useSession } from "next-auth/react"

const MainNav = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathName = usePathname()
  const { data: session } = useSession();
  const rol=session?.user?.Role;
  const filteredNavLinks = mainNavLinks.filter((link) => {
    if (rol === "admin") return true;
    return link.title !== "Admin" && link.title !== "Tenant-Manage";
  });
  return (
    <div className="flex items-center lg:space-x-6 mx-4 font-size-large">
      <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden">
        <Menu />
      </button>
      <div className={cn(
        "absolute top-full left-0 w-full border",
        "lg:border-none lg:static lg:flex lg:space-x-6",
        menuOpen ? "block" : "hidden"
      )}>
        {filteredNavLinks.map((link) => (
          <Link
            key={link.title}
            href={link.url}
            className={cn(
              "block py-6 px-12 text-sm transition-colors text-xl",
              pathName === link.url ? "text-teal dark:text-white" : "text-muted-foreground"
            )}
          >
            {link.title}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default MainNav