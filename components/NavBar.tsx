"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ImageIcon } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export default function NavBar() {
  const pathname = usePathname()
  
  return (
    <div className="border-b">
      <div className="container flex h-16 items-center px-4">
        <div className="mr-4 flex items-center gap-2">
          <ImageIcon className="h-6 w-6 text-blue-600" />
          <Link href="/" className="font-bold text-lg">ImageConverter</Link>
        </div>
        
        <NavigationMenu className="mx-6">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
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
              <NavigationMenuTrigger>Features</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 w-[400px] md:grid-cols-2">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:text-slate-900"
                      >
                        <div className="text-sm font-medium leading-none">Image Converter</div>
                        <p className="line-clamp-2 text-sm leading-snug text-slate-500">
                          Convert images between multiple formats
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/history"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:text-slate-900"
                      >
                        <div className="text-sm font-medium leading-none">Conversion History</div>
                        <p className="line-clamp-2 text-sm leading-snug text-slate-500">
                          View your past image conversions
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link href="/about" legacyBehavior passHref>
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
    </div>
  )
}