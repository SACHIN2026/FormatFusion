"use client"

import { useState } from "react"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card" // Removed unused CardContent
import { LogOut } from "lucide-react"
// import Link from "next/link" // Removed as Link was unused
import { useRouter } from "next/navigation"

export default function SignOutPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignOut = async () => {
    setIsLoading(true)
    await signOut({ redirect: true, callbackUrl: "/" })
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md border shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
            <LogOut className="h-6 w-6 text-gray-600" />
          </div>
          <CardTitle className="text-2xl">Sign Out</CardTitle>
          <CardDescription>
            Are you sure you want to sign out?
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex gap-2 justify-center">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSignOut}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? (
              <>
                <span className="animate-spin mr-2">⟳</span>
                Signing out...
              </>
            ) : (
              "Sign out"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
