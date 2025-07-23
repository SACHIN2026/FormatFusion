"use client"

import React, { useState } from 'react'
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { ArrowRight, Upload, Download, RefreshCw } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { totalmem } from 'os';

const ConversionForm = () => {
    const { data: session } = useSession();
    const [format, setFormat] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [quality, setQuality] = useState(80);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [result, setResult] = useState<any>(null);
    const [preview, setPreview] = useState<string | null>(null);
    
    
    const MAX_FILE_SIZE = 10 * 1024 * 1024; 
    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) {
            // alert("No file selected");
            return;
        }

        if (!selectedFile.type.startsWith('image/')) {
            toast.error("Please select an image file");
            return;
        }

        if(selectedFile.size>MAX_FILE_SIZE){
            toast.error(`File is too large (${(selectedFile.size/(1024 * 1024)).toFixed(2)}MB). Max size is 10MB allowed.`);
            return;
        }

        setFile(selectedFile)

        //create preview
        const reader = new FileReader();
        reader.onload = (event) => {
            setPreview(event.target?.result as string);
        };
        reader.readAsDataURL(selectedFile);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files?.[0];
        if (!droppedFile) {
            // alert("No file dropped");
            return;
        }

        if (!droppedFile.type.startsWith('image/')) {
            toast.error("Please select an image file");
            return;
        }

        if(droppedFile.size>MAX_FILE_SIZE){
            toast.error(`File is too large (${(droppedFile.size/(1024 * 1024)).toFixed(2)}MB). Max size is 10MB allowed.`);
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

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        // e.dataTransfer.dropEffect = 'copy'; // Show copy cursor
    };

    const handleConvert = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) {
            toast.error("No file selected for conversion");
            return;
        }

        if (!format || !["jpeg", "png", "jpg", "webp", "avif"].includes(format)) {
            toast.error("Invalid format selected");
            return;
        }

        setLoading(true);
        setProgress(10);


        const formdata = new FormData();
        formdata.append("file", file);
        formdata.append("format", format);
        formdata.append("quality", quality.toString());

        try {
            setProgress(30);
            const res = await fetch('/api/auth/convert', {
                method: 'POST',
                body: formdata,
            });

            setProgress(60);

            if (!res.ok) {
                throw new Error("Conversion failed");
            }

            const data = await res.json();
            setResult(data);
            // setLoading(false);
            toast.success("Conversion successful");

            if(session){
                await saveToHistory(data);
            }

        } catch (error) {
            // console.error("Conversion error:", error);
            toast.error("Conversion failed. Please try again.");
        } finally {
            setProgress(100);
            // Optionally reset the form or file input
            // setFile(null);
            // setFormat('');
            setTimeout(() => setLoading(false), 500);
        }


    }


    const handleReset = () => {
        setFile(null);
        setFormat('');
        setQuality(80);
        setResult(null);
        setPreview(null);
    }



    const handleDownload = () => {

        if (!result || !result?.url || !result.afterFormat) {
            toast.error("No converted image available for download");
            return;
        }

        const filename = `converted-image.${result.afterFormat}`;
        window.location.href = `/api/download?url=${encodeURIComponent(result.url)}&filename=${encodeURIComponent(filename)}`;
    };



    const saveToHistory = async (result: any) => {
        try {
            const res = await fetch("/api/history", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    url: result.url,
                    beforeFormat: result.beforeFormat,
                    afterFormat: result.afterFormat,
                    name: file?.name || "Converted Image",
                    beforeSize: result.beforeSize,
                    afterSize: result.afterSize
                }),
            })

            if (!res.ok) {
                throw new Error("Failed to save to history");
            }
            // const data = await res.json();
            toast.success("Image saved to history");
        } catch (error) {
            toast.error("Failed to save to history");
        }
    }

    return (
        <div className='space-y-6'>
            {!result ? (
                <>
                    {!file && (
                        <div className='border-2 border-dashed border-gray-300 p-6 rounded-lg text-center cursor-pointer hover:border-blue-500 transition-colors'
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            onClick={() => document.getElementById('fileInput')?.click()}
                        >
                            <Upload className='h-12 w-12 text-gray-400 mx-auto mb-4' />
                            <p className='mb-1'> Drag & Drop Image here, or click to browse</p>
                            <p className='text-sm text-gray-500'>Supported formats: JPEG, PNG, WebP, AVIF</p>
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
                                    <img src={preview} alt="Preview" className='max-h-[300px] rounded-lg shadow-sm' />
                                </div>
                            )}

                            <div className='text-center'>
                                <p className='text-sm font-medium'>{file.name}</p>
                                <p className='text-xs text-gray-500'>{(file.size / 1024).toFixed(2)} KB</p>
                            </div>


                            <Card className='p-4'>
                                <form onSubmit={handleConvert} className='space-y-4'>
                                    <div>
                                        <label className='block mb-2 text-sm font-medium'>Target Format</label>
                                        <select
                                            value={format}
                                            onChange={(e) => setFormat(e.target.value.toLowerCase())}
                                            className='w-full p-2 border rounded-md'
                                        >
                                            <option value="">Select target format</option>
                                            <option value="jpeg">JPEG</option>
                                            <option value="webp">WebP</option>
                                            <option value="jpg">JPG</option>
                                            <option value="png">PNG</option>
                                            <option value="avif">AVIF</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className='block mb-2 text-sm font-medium'>
                                            Quality: {quality}%
                                        </label>
                                        <input
                                            type='range'
                                            min="10"
                                            max="100"
                                            value={quality}
                                            onChange={(e) => setQuality(Number(e.target.value))}
                                            className='w-full'
                                        />
                                    </div>

                                    <div className='flex gap-2 pt-2'>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={handleReset}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type='submit'
                                            disabled={loading || !format}
                                            className='flex-1'
                                        >
                                            {loading ? 'Converting...' : 'Convert'}
                                        </Button>
                                    </div>
                                </form>

                                {loading && (
                                    <div className="mt-4 space-y-2">
                                        <Progress value={progress} />
                                        <p className="text-sm text-center text-gray-500">
                                            {progress < 50 ? "Processing..." : "Almost done..."}
                                        </p>
                                    </div>
                                )}
                            </Card>
                        </div>
                    )}
                </>
            ) : (
                <div className='space-y-6'>
                    <div className='flex justify-center'>
                        <img
                            src={result.url}
                            alt="Converted"
                            className='max-h-[300px] rounded-lg shadow-sm'
                        />
                    </div>

                    <Card className='p-4 space-y-3'>
                        <div className='grid grid-cols-2 gap-2 text-sm'>
                            <div>
                                <p className='text-gray-500'>Original format</p>
                                <p className='font-medium'>{result.beforeFormat.toUpperCase()}</p>
                            </div>
                            <div>
                                <p className='text-gray-500'>New format</p>
                                <p className='font-medium'>{result.afterFormat.toUpperCase()}</p>
                            </div>
                            <div>
                                <p className='text-gray-500'>Original size</p>
                                <p className='font-medium'>{(result.beforeSize / 1024).toFixed(2)} KB</p>
                            </div>
                            <div>
                                <p className='text-gray-500'>New size</p>
                                <p className='font-medium'>{(result.afterSize / 1024).toFixed(2)} KB</p>
                            </div>
                        </div>

                        <div>
                            <p className='text-sm text-gray-500 mb-1'>Compression</p>
                            <div className='h-2 bg-gray-200 rounded-full overflow-hidden'>
                                <div
                                    className={`h-full ${result.afterSize < result.beforeSize ? 'bg-green-500' : 'bg-yellow-500'}`}
                                    style={{ width: `${Math.min(100, Math.abs(((result.beforeSize - result.afterSize) / result.beforeSize * 100)))}%` }}
                                ></div>
                            </div>
                            <p className='text-right text-xs mt-1'>
                                {((result.beforeSize - result.afterSize) / result.beforeSize * 100).toFixed(2)}%
                            </p>
                        </div>
                    </Card>

                    <div className='flex gap-3'>
                        <Button
                            variant="outline"
                            onClick={handleReset}
                            className='flex items-center gap-2 flex-1'
                        >
                            <RefreshCw className='h-4 w-4' /> Convert Another
                        </Button>
                        <Button
                            onClick={handleDownload}
                            className='flex items-center gap-2 flex-1'
                        >
                            <Download className='h-4 w-4' /> Download
                        </Button>
                    </div>
                </div>
            )}

        </div>
    )
}

export default ConversionForm
