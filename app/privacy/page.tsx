export default function PrivacyPage() {
  return (
    <main className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3">Information We Collect</h2>
          <p className="text-gray-700">
            When you use our image conversion service, we collect the following information:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
            <li>Images you upload for conversion</li>
            <li>Selected conversion parameters (format, quality)</li>
            <li>Technical information such as browser type and device information</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-3">How We Use Your Information</h2>
          <p className="text-gray-700">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
            <li>Provide and maintain our image conversion service</li>
            <li>Process your image conversion requests</li>
            <li>Improve and optimize our service</li>
            <li>Detect and prevent technical issues</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-3">Image Storage and Security</h2>
          <p className="text-gray-700">
            Your images are processed temporarily to perform the conversion. We do not permanently store your 
            images on our servers beyond the time needed for conversion. All image processing is done through 
            secure channels.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-3">Third-Party Services</h2>
          <p className="text-gray-700">
            We use Cloudinary for image processing and storage. Their privacy policy applies to how they handle 
            your images. You can view Cloudinary's privacy policy at{' '}
            <a href="https://cloudinary.com/privacy" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              https://cloudinary.com/privacy
            </a>.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-3">Cookies</h2>
          <p className="text-gray-700">
            We use cookies to enhance your experience on our website. These cookies are used to store your preferences
            and provide analytics that help us improve our service.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about our Privacy Policy, please contact us at privacy@imageconverter.com.
          </p>
        </section>
        
        <div className="text-sm text-gray-500 pt-4 border-t">
          Last updated: July 21, 2025
        </div>
      </div>
    </main>
  );
}