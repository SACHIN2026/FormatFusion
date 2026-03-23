"use client";
import React from "react";

export default function AboutPage() {
  return (
    <main className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">About FormatFusion</h1>

      <div className="bg-card text-card-foreground p-6 rounded-lg shadow-sm border border-border space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3 text-foreground">Our Mission</h2>
          <p className="text-muted-foreground">
            FormatFusion was created with a simple mission: to provide a fast,
            free, and easy-to-use tool for converting images between different
            formats. We believe that powerful image conversion tools should be
            accessible to everyone, without requiring technical knowledge or
            expensive software.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-foreground">What We Offer</h2>
          <p className="text-muted-foreground">
            All processing is done securely, and we never store your images
            permanently.
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
            <li>Convert images between JPEG, PNG, WebP, and AVIF formats</li>
            <li>Adjust quality settings to balance between size and appearance</li>
            <li>Process images directly in your browser for instant results</li>
            <li>Download converted images immediately</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-foreground">How It Works</h2>
          <p className="text-muted-foreground">
            FormatFusion uses cutting-edge web technologies to process your images efficiently:
          </p>
          <ol className="list-decimal pl-5 mt-2 space-y-1 text-muted-foreground">
            <li>Upload your image through our simple drag-and-drop interface</li>
            <li>Select your desired output format and quality settings</li>
            <li>Our service processes your image using Cloudinary&apos;s powerful conversion engine</li>
            <li>Download your converted image immediately</li>
          </ol>
          <p className="mt-3 text-muted-foreground">
            Have questions or suggestions? We&apos;d love to hear from you at{" "}
            <a href="mailto:support@formatfusion.dev" className="text-primary underline">
              support@formatfusion.dev
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-foreground">Why Different Formats Matter</h2>
          <p className="text-muted-foreground">
            Different image formats serve different purposes:
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-3">
            <div className="p-3 bg-muted rounded">
              <h3 className="font-medium mb-1 text-foreground">JPEG</h3>
              <p className="text-sm text-muted-foreground">
                Best for photographs and complex images with many colors. Offers good compression but is lossy.
              </p>
            </div>
            <div className="p-3 bg-muted rounded">
              <h3 className="font-medium mb-1 text-foreground">PNG</h3>
              <p className="text-sm text-muted-foreground">
                Supports transparency and is lossless. Ideal for graphics, logos, and images with text.
              </p>
            </div>
            <div className="p-3 bg-muted rounded">
              <h3 className="font-medium mb-1 text-foreground">WebP</h3>
              <p className="text-sm text-muted-foreground">
                Modern format developed by Google that offers superior compression and quality. Supports transparency.
              </p>
            </div>
            <div className="p-3 bg-muted rounded">
              <h3 className="font-medium mb-1 text-foreground">AVIF</h3>
              <p className="text-sm text-muted-foreground">
                Next-generation format with excellent compression and quality. Growing browser support.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-foreground">Built With Modern Technology</h2>
          <p className="text-muted-foreground">
            FormatFusion is built using Next.js, React, and Tailwind CSS, with image processing powered by Cloudinary. This combination provides a fast, responsive, and reliable conversion experience.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-foreground">Contact Us</h2>
          <p className="text-muted-foreground">
            Have questions or suggestions? We&apos;d love to hear from you at{" "}
            <a href="mailto:support@formatfusion.dev" className="text-primary underline">
              support@formatfusion.dev
            </a>.
          </p>
        </section>
      </div>
    </main>
  );
}