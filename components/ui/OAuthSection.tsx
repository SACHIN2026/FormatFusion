'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { FaGoogle, FaGithub } from 'react-icons/fa';

interface OAuthSectionProps {
  loading?: boolean;
}

const OAuthSection: React.FC<OAuthSectionProps> = ({ loading = false }) => {
  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/convert' });
  };

  const handleGitHubSignIn = () => {
    signIn('github', { callbackUrl: '/convert' });
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          <FaGoogle className="mr-2 h-4 w-4" />
          Google
        </Button>
        
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleGitHubSignIn}
          disabled={loading}
        >
          <FaGithub className="mr-2 h-4 w-4" />
          GitHub
        </Button>
      </div>
    </div>
  );
};

export default OAuthSection;
