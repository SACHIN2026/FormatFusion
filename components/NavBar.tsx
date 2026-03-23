"use client"

import { signOut } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
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
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()

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
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      pathname === "/" && "bg-accent text-accent-foreground"
                    )}
                  >
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {session && (
                <NavigationMenuItem>
                  <Link href="/convert" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        pathname === "/convert" && "bg-accent text-accent-foreground"
                      )}
                    >
                      Convert
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )}

              {session && (
                <NavigationMenuItem>
                  <Link href="/removebackground" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        pathname === "/removebackground" && "bg-accent text-accent-foreground"
                      )}
                    >
                      Remove BG
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )}

              {/* Only show history to logged in users */}
              {session && (
                <NavigationMenuItem>
                  <Link href="/history" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        pathname === "/history" && "bg-accent text-accent-foreground"
                      )}
                    >
                      History
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )}

              {/* Dashboard for logged in users */}
              {session && (
                <NavigationMenuItem>
                  <Link href="/dashboard" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        pathname === "/dashboard" && "bg-accent text-accent-foreground"
                      )}
                    >
                      Dashboard
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )}

              <NavigationMenuItem>
                <Link href="/pricing" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      pathname === "/pricing" && "bg-accent text-accent-foreground"
                    )}
                  >
                    Pricing
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      pathname === "/about" && "bg-accent text-accent-foreground"
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


        {/* Right: theme toggle + auth buttons */}
        <div className="flex items-center gap-2">
          {/* Dark mode toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          {session ? (
            <div className="flex items-center gap-3">
              <span className="text-sm hidden md:inline">
                {session.user?.name || session.user?.email}
              </span>
              <Button variant="outline" size="sm" onClick={() => { signOut({ redirect: true, callbackUrl: "/" }) }}>
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/register">Sign up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}