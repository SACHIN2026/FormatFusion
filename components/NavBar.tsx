"use client"

import { signOut } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react" // Add this import
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Image from "next/image"


export default function NavBar() {
  const pathname = usePathname()
  const { data: session } = useSession() // Get session only

  return (
    <div className="border-b">
      <div className="container flex h-16 items-center px-4 justify-between">
        {/* Logo on left */}
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image src="/images/logo.png" alt="Logo" width={100} height={40} className="object-contain" />
          </Link>
        </div>

        {/* Navigation in middle */}
        <div className="flex-1 flex justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      pathname === "/" && "text-blue-600 bg-blue-50"
                    )}
                  >
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/convert" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      pathname === "/convert" && "text-blue-600 bg-blue-50"
                    )}
                  >
                    Convert
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* Only show history to logged in users */}
              {session && (
                <NavigationMenuItem>
                  <Link href="/history" passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        pathname === "/history" && "text-blue-600 bg-blue-50"
                      )}
                    >
                      History
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )}

              <NavigationMenuItem>
                <Link href="/about" passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      pathname === "/about" && "text-blue-600 bg-blue-50"
                    )}
                  >
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/*history in navbar is not showing properly when login */}


        {/* Login/Signup buttons on right */}
        <div className="flex items-center gap-2">
          {session ? (
            <div className="flex items-center gap-3">
              <span className="text-sm hidden md:inline">
                {session.user?.name || session.user?.email}
              </span>
              {/* <form action="/api/auth/signout" method="post"> */}
              <Button variant="outline" size="sm" onClick={() => { signOut({ redirect: true, callbackUrl: "/" }) }}>
                Logout
              </Button>
              {/* </form> */}
            </div>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline" size="sm">Login</Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Sign up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}