import ConversionForm from "@/components/ConversionForm"
import { Providers } from "@/components/Providers"
import Link from "next/link"

export default function Convert() {
  return (
    <main className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">FormatFusion</h1>
        <p className="text-center mb-8 text-gray-600">
          Convert your images between JPEG, PNG, WebP, and AVIF formats with custom quality settings
        </p>
        <Providers>
          <ConversionForm />
        </Providers>
      </div>
      {/* <Link href="/about" className="text-blue-500 hover:underline">About</Link> */}
    </main>
  )
}