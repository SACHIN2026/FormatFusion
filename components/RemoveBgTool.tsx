// components/RemoveBgTool.tsx
"use client";

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, Download, RefreshCw } from 'lucide-react';
import Image from 'next/image';

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export default function RemoveBgTool() {
  const [file, setFile] = useState<File | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  // #15 â€“ Before/After slider position (0â€“100)
  const [sliderPos, setSliderPos] = useState(50);

  // Shared file acceptor (upload + drop + paste)
  const acceptFile = useCallback((incoming: File) => {
    if (!incoming.type.startsWith('image/')) {
      toast.error("Please select an image file");
      return;
    }
    if (incoming.size > MAX_FILE_SIZE) {
      toast.error(`File is too large (${(incoming.size / (1024 * 1024)).toFixed(2)}MB). Max 10MB.`);
      return;
    }
    setFile(incoming);
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(incoming);
  }, []);

  // #16 â€“ Paste from clipboard
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (outputUrl) return;
      const item = Array.from(e.clipboardData?.items ?? []).find(i => i.kind === 'file' && i.type.startsWith('image/'));
      if (!item) return;
      const pasted = item.getAsFile();
      if (pasted) acceptFile(pasted);
    };
    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, [outputUrl, acceptFile]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) acceptFile(selectedFile);
  };

  const handleRemoveBg = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/remove-bg", { method: "POST", body: formData });
      if (res.status === 403) {
        const errData = await res.json().catch(() => ({}));
        if (errData.limitReached) {
          toast.error("Free plan limit reached (5/month). Upgrade to continue.");
        } else {
          toast.error(errData.error || "Limit reached");
        }
        return;
      }
      if (!res.ok) throw new Error("Background removal failed");
      const data = await res.json();
      setOutputUrl(data.url);
      setSliderPos(50);
      toast.success("Background removed successfully", {
        action: {
          label: 'Download',
          onClick: () => {
            const filename = `no-background-${Date.now()}.png`;
            window.location.href = `/api/download?url=${encodeURIComponent(data.url)}&filename=${encodeURIComponent(filename)}`;
          }
        }
      });
    } catch (error) {
      console.error("Remove background error:", error);
      toast.error("Failed to remove background. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) acceptFile(droppedFile);
  };

  const handleReset = () => {
    setFile(null);
    setOutputUrl(null);
    setPreview(null);
    setSliderPos(50);
  };

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
            <div
              className='border-2 border-dashed border-border p-6 rounded-lg text-center cursor-pointer hover:border-primary transition-colors'
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => document.getElementById('removeBgInput')?.click()}
            >
              <Upload className='h-12 w-12 text-muted-foreground mx-auto mb-4' />
              <p className='mb-1 text-lg font-medium'>Drag & Drop, paste (Ctrl+V), or click to browse</p>
              {/* #9 â€“ HEIC/HEIF support */}
              <p className='text-sm text-muted-foreground'>Supported: JPEG, PNG, WebP, HEIC/HEIF (Max 10MB)</p>
              <Input
                id='removeBgInput'
                type='file'
                accept='image/*,.heic,.heif'
                onChange={handleUpload}
                className='hidden'
              />
            </div>
          )}

          {file && (
            <div className='space-y-6'>
              {preview && (
                <div className='flex justify-center'>
                  <Image src={preview} alt="Preview" width={400} height={300} className='max-h-75 rounded-lg shadow-sm border' />
                </div>
              )}
              <div className='text-center'>
                <p className='text-sm font-medium'>{file.name}</p>
                <p className='text-xs text-muted-foreground'>{(file.size / 1024).toFixed(2)} KB</p>
              </div>
              <Card className='p-4'>
                <div className='space-y-4'>
                  <div className='text-center'>
                    <h3 className='text-lg font-medium mb-2'>Ready to Remove Background?</h3>
                    <p className='text-sm text-muted-foreground mb-4'>
                      Our AI will automatically detect and remove the background from your image.
                    </p>
                  </div>
                  <div className='flex gap-2'>
                    <Button type="button" variant="outline" onClick={handleReset} className='flex-1'>Cancel</Button>
                    <Button onClick={handleRemoveBg} disabled={loading} className='flex-1'>
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
          {/* #15 â€“ Before / After comparison slider */}
          <div className='relative overflow-hidden rounded-lg border select-none' style={{ maxHeight: 400 }}>
            {/* After image (result on top, clipped to right portion) */}
            <div className='relative w-full' style={{ minHeight: 200 }}>
              {/* Base: original preview */}
              {preview && (
                <Image
                  src={preview}
                  alt="Before"
                  width={800}
                  height={600}
                  className='w-full object-contain max-h-100'
                  style={{ display: 'block' }}
                />
              )}
              {/* Overlay: result clipped on the right */}
              <div
                className='absolute inset-0 overflow-hidden'
                style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
              >
                <Image
                  src={outputUrl}
                  alt="After"
                  width={800}
                  height={600}
                  className='w-full object-contain max-h-100'
                  style={{ display: 'block', background: 'repeating-conic-gradient(#e5e7eb 0% 25%, white 0% 50%) 0 0 / 16px 16px' }}
                />
              </div>
              {/* Divider line */}
              <div
                className='absolute inset-y-0 w-0.5 bg-background shadow-lg pointer-events-none'
                style={{ left: `${sliderPos}%` }}
              >
                <div className='absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 bg-background rounded-full shadow-md flex items-center justify-center text-muted-foreground font-bold text-xs'>
                  &#8597;
                </div>
              </div>
            </div>
            {/* Range slider */}
            <input
              type='range'
              min={0}
              max={100}
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              className='absolute inset-0 w-full h-full opacity-0 cursor-col-resize'
            />
            {/* Labels */}
            <div className='absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded pointer-events-none'>Before</div>
            <div className='absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded pointer-events-none'>After</div>
          </div>

          <Card className='p-4 space-y-3'>
            <div className='text-center'>
              <h3 className='text-lg font-medium text-green-600 mb-2'>âœ“ Background Removed Successfully!</h3>
              <p className='text-sm text-muted-foreground'>Drag the slider above to compare. Download the PNG below.</p>
            </div>
          </Card>

          <div className='flex gap-3'>
            <Button variant="outline" onClick={handleReset} className='flex items-center gap-2 flex-1'>
              <RefreshCw className='h-4 w-4' /> Process Another
            </Button>
            <Button onClick={handleDownload} className='flex items-center gap-2 flex-1'>
              <Download className='h-4 w-4' /> Download PNG
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

