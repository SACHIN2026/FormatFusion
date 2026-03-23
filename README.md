# FormatFusion - Image Converter & Editor

A modern web application for image format conversion, background removal, and image editing with subscription-based premium features.

## Features

- **Image Format Conversion**: Convert between various image formats (JPEG, PNG, WebP, etc.)
- **Background Removal**: Remove backgrounds from images using Remove.bg API
- **User Authentication**: Secure login/registration with NextAuth.js
- **Subscription System**: Premium plans with Razorpay payment integration
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Backend**: Next.js API routes
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **Payment**: Razorpay integration
- **Image Processing**: Cloudinary, Sharp, Remove.bg API

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB database
- Cloudinary account
- Remove.bg API key
- Razorpay account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/formatfusion.git
   cd formatfusion
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your actual values:
   - `MONGODB_URI`: Your MongoDB connection string
   - `NEXTAUTH_SECRET`: A random secret for NextAuth.js
   - `NEXTAUTH_URL`: Your app URL (http://localhost:3000 for development)
   - `CLOUDINARY_URL`: Your Cloudinary API URL
   - `REMOVE_BG_API_KEY`: Your Remove.bg API key
   - `RAZORPAY_KEY_ID`: Your Razorpay key ID
   - `RAZORPAY_KEY_SECRET`: Your Razorpay key secret
   - `NEXT_PUBLIC_RAZORPAY_KEY_ID`: Your Razorpay key ID (public)
   - `SMTP_HOST`: SMTP server host (e.g. smtp.gmail.com)
   - `SMTP_PORT`: SMTP port (587 for STARTTLS, 465 for SSL)
   - `SMTP_USER`: SMTP username/email
   - `SMTP_PASS`: SMTP password or app password
   - `SMTP_FROM`: Sender display + email (e.g. "FormatFusion" <noreply@yourdomain.com>)
   - `PASSWORD_RESET_BASE_URL`: Public website URL used in reset email links

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Protected Environment (Safe Mode)

Use protected mode to prevent accidental use of production-like values during development.

```bash
cp .env.protected.example .env.local
npm run dev:protected
```

## Deployment

### Environment Variables for Production

Make sure to set these environment variables in your production environment:

- `MONGODB_URI`: Production MongoDB connection string
- `NEXTAUTH_SECRET`: Strong random secret
- `NEXTAUTH_URL`: Your production domain (https://yourdomain.com)
- `CLOUDINARY_URL`: Cloudinary production credentials
- `REMOVE_BG_API_KEY`: Remove.bg API key
- `RAZORPAY_KEY_ID`: Razorpay live key ID
- `RAZORPAY_KEY_SECRET`: Razorpay live key secret
- `NEXT_PUBLIC_RAZORPAY_KEY_ID`: Razorpay live key ID (public)
- `SMTP_HOST`: SMTP server host
- `SMTP_PORT`: SMTP server port
- `SMTP_USER`: SMTP username/email
- `SMTP_PASS`: SMTP password/app password
- `SMTP_FROM`: Sender display + email
- `PASSWORD_RESET_BASE_URL`: Public website URL used in reset email links

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The app can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- Heroku
- DigitalOcean App Platform

## API Routes

- `/api/auth/*` - Authentication endpoints
- `/api/convert` - Image conversion
- `/api/remove-bg` - Background removal
- `/api/razorpay/create-order` - Create payment order
- `/api/razorpay/verify-payment` - Verify payment
- `/api/subscription/status` - Get subscription status
- `/api/history` - User conversion history
- `/api/apikey` - Generate/revoke API key for programmatic access

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@formatfusion.dev or create an issue on GitHub.