export default function TermsPage() {
  return (
    <main className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
          <p className="text-gray-700">
            By accessing or using our image conversion service, you agree to be bound by these Terms of Service. If you do not agree to these Terms, you may not use our service.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-3">2. Description of Service</h2>
          <p className="text-gray-700">
            ImageConverter provides an online tool for converting images between different formats including JPEG, PNG, WebP, and AVIF. The service is provided "as is" and "as available" without warranties of any kind.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-3">3. User Conduct</h2>
          <p className="text-gray-700">
            When using our service, you agree not to:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
            <li>Upload images that violate any third party's intellectual property rights</li>
            <li>Upload illegal, harmful, threatening, abusive, or otherwise objectionable content</li>
            <li>Attempt to disrupt or overload our service</li>
            <li>Use automated means to access or use our service</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-3">4. Intellectual Property</h2>
          <p className="text-gray-700">
            You retain all ownership rights to the images you upload. By uploading images, you grant us a temporary license to process and convert your images as requested. We do not claim ownership of your content.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-3">5. Limitation of Liability</h2>
          <p className="text-gray-700">
            To the maximum extent permitted by law, ImageConverter shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or use, arising out of or in connection with these Terms or the use of our service.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-3">6. Service Modifications</h2>
          <p className="text-gray-700">
            We reserve the right to modify, suspend, or discontinue our service at any time without notice. We may also modify these Terms at any time, and your continued use of the service constitutes your acceptance of the revised Terms.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-3">7. Governing Law</h2>
          <p className="text-gray-700">
            These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-3">8. Contact</h2>
          <p className="text-gray-700">
            If you have any questions about these Terms, please contact us at terms@imageconverter.com.
          </p>
        </section>
        
        <div className="text-sm text-gray-500 pt-4 border-t">
          Last updated: July 21, 2025
        </div>
      </div>
    </main>
  );
}