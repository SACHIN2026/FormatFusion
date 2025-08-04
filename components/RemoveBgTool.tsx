// components/RemoveBgTool.tsx
"use client";

import { useState } from 'react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, Download, RefreshCw } from 'lucide-react';
import Image from 'next/image';

export default function RemoveBgTool() {
  const [file, setFile] = useState<File | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) {
      return;
    }

    if (!selectedFile.type.startsWith('image/')) {
      toast.error("Please select an image file");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      toast.error(`File is too large (${(selectedFile.size / (1024 * 1024)).toFixed(2)}MB). Max size is 10MB allowed.`);
      return;
    }

    setFile(selectedFile);

    //create preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target?.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleRemoveBg = async () => {
    if (!file) return;
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/remove-bg", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Background removal failed");
      }

      const data = await res.json();
      setOutputUrl(data.url);
      toast.success("Background removed successfully");
    } catch (error) {
      console.error("Remove background error:", error);
      toast.error("Failed to remove background. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (!droppedFile) {
      return;
    }

    if (!droppedFile.type.startsWith('image/')) {
      toast.error("Please select an image file");
      return;
    }

    if (droppedFile.size > MAX_FILE_SIZE) {
      toast.error(`File is too large (${(droppedFile.size / (1024 * 1024)).toFixed(2)}MB). Max size is 10MB allowed.`);
      return;
    }

    setFile(droppedFile);

    //create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(droppedFile);
  }

  const handleReset = () => {
    setFile(null);
    setOutputUrl(null);
    setPreview(null);
  }

  const handleDownload = () => {
    if (!outputUrl) {
      toast.error("No processed image available for download");
      return;
    }

    const filename = `no-background-${Date.now()}.png`;
    window.location.href = `/api/download?url=${encodeURIComponent(outputUrl)}&filename=${encodeURIComponent(filename)}`;
  };

  return (
    <div className='space-y-6'>
      {!outputUrl ? (
        <>
          {!file && (
            <div className='border-2 border-dashed border-gray-300 p-6 rounded-lg text-center cursor-pointer hover:border-blue-500 transition-colors'
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => document.getElementById('fileInput')?.click()}
            >
              <Upload className='h-12 w-12 text-gray-400 mx-auto mb-4' />
              <p className='mb-1 text-lg font-medium'>Drag & Drop Image here, or click to browse</p>
              <p className='text-sm text-gray-500'>Supported formats: JPEG, PNG, WebP (Max 10MB)</p>
              <Input
                id='fileInput'
                type='file'
                accept='image/*'
                onChange={handleUpload}
                className='hidden'
              />
            </div>
          )}

          {file && (
            <div className='space-y-6'>
              {preview && (
                <div className='flex justify-center'>
                  <Image
                    src={preview}
                    alt="Preview"
                    width={400}
                    height={300}
                    className='max-h-[300px] rounded-lg shadow-sm border'
                  />
                </div>
              )}

              <div className='text-center'>
                <p className='text-sm font-medium'>{file.name}</p>
                <p className='text-xs text-gray-500'>{(file.size / 1024).toFixed(2)} KB</p>
              </div>

              <Card className='p-4'>
                <div className='space-y-4'>
                  <div className='text-center'>
                    <h3 className='text-lg font-medium mb-2'>Ready to Remove Background?</h3>
                    <p className='text-sm text-gray-600 mb-4'>
                      Our AI will automatically detect and remove the background from your image.
                    </p>
                  </div>

                  <div className='flex gap-2'>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleReset}
                      className='flex-1'
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleRemoveBg}
                      disabled={loading}
                      className='flex-1'
                    >
                      {loading ? 'Processing...' : 'Remove Background'}
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </>
      ) : (
        <div className='space-y-6'>
          <div className='flex justify-center'>
            <Image
              src={outputUrl}
              alt="Background Removed"
              width={400}
              height={300}
              className='max-h-[300px] rounded-lg shadow-sm border'
            />
          </div>

          <Card className='p-4 space-y-3'>
            <div className='text-center'>
              <h3 className='text-lg font-medium text-green-600 mb-2'>✓ Background Removed Successfully!</h3>
              <p className='text-sm text-gray-600'>
                Your image is ready for download with a transparent background.
              </p>
            </div>
          </Card>

          <div className='flex gap-3'>
            <Button
              variant="outline"
              onClick={handleReset}
              className='flex items-center gap-2 flex-1'
            >
              <RefreshCw className='h-4 w-4' /> Process Another
            </Button>
            <Button
              onClick={handleDownload}
              className='flex items-center gap-2 flex-1'
            >
              <Download className='h-4 w-4' /> Download PNG
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
