import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ImageIcon, Zap, Lock } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Convert Images Quickly and Easily
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Transform your images between formats with our powerful, free online converter. No software to install.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/login">
            <Button size="lg" className="px-8 w-full sm:w-auto">
              Start Converting <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <ImageIcon className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Multiple Formats</h3>
            <p className="text-gray-600">
              Convert between JPEG, PNG, WebP, AVIF and more with a single click.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
            <p className="text-gray-600">
              Our optimized conversion engine processes your images in seconds.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
            <p className="text-gray-600">
              Your images are processed securely and never shared with third parties.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16 bg-gray-50 -mx-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="max-w-3xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="bg-blue-600 text-white h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
            <h3 className="text-lg font-medium mb-2">Upload Your Image</h3>
            <p className="text-gray-600">Drag & drop or browse to select the image you want to convert.</p>
          </div>
          
          <div>
            <div className="bg-blue-600 text-white h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
            <h3 className="text-lg font-medium mb-2">Choose Format & Quality</h3>
            <p className="text-gray-600">Select your desired output format and adjust quality settings.</p>
          </div>
          
          <div>
            <div className="bg-blue-600 text-white h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
            <h3 className="text-lg font-medium mb-2">Download Converted Image</h3>
            <p className="text-gray-600">Get your converted image instantly, ready to use.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Convert Your Images?</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Our free tool is waiting for you. Register Now.
        </p>
        <Link href="/register">
          <Button size="lg" className="px-8">
            Start Now <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 mt-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center">
          <Link href="/">
            <Image src="/images/logo.png" alt="Logo" width={40} height={40} className="object-contain" />
          </Link>
        </div>
          <div className="flex gap-6 text-sm text-gray-600">
            <Link href="/about" className="hover:text-blue-600 transition-colors">About</Link>
            <Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-blue-600 transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}