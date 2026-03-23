"use client"

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { toast } from 'sonner'
import { Card } from './ui/card'
import { Progress } from './ui/progress'
import { Upload, Download, RefreshCw, Copy } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface ConversionResult {
  url: string
  beforeFormat: string
  afterFormat: string
  beforeSize: number
  afterSize: number
  sourceName: string
}

const OUTPUT_FORMATS = ['jpeg', 'png', 'jpg', 'webp', 'avif']
const MAX_FILE_SIZE = 10 * 1024 * 1024

const ConversionForm = () => {
  const router = useRouter()

  const [format, setFormat] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [imageUrl, setImageUrl] = useState('')
  const [quality, setQuality] = useState(80)
  const [resizeWidth, setResizeWidth] = useState('')
  const [resizeHeight, setResizeHeight] = useState('')
  const [resizeFit, setResizeFit] = useState<'inside' | 'cover' | 'contain' | 'fill'>('inside')
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [processingIndex, setProcessingIndex] = useState(0)
  const [results, setResults] = useState<ConversionResult[]>([])
  const [preview, setPreview] = useState<string | null>(null)

  const setPreviewFromFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = (ev) => setPreview(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  const acceptFiles = useCallback((incoming: File[]) => {
    const valid: File[] = []

    for (const file of incoming) {
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name}: not an image file`)
        continue
      }

      if (file.size > MAX_FILE_SIZE) {
        toast.error(`${file.name}: exceeds 10MB`)
        continue
      }

      valid.push(file)
    }

    if (valid.length === 0) return

    setFiles(valid)
    setImageUrl('')
    setResults([])
    setProgress(0)
    setProcessingIndex(0)
    setPreviewFromFile(valid[0])

    if (valid.length > 1) {
      toast.success(`${valid.length} files selected. Click Convert All.`)
    }
  }, [])

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (results.length > 0 || loading) return

      const item = Array.from(e.clipboardData?.items ?? []).find(
        i => i.kind === 'file' && i.type.startsWith('image/')
      )
      if (!item) return

      const pasted = item.getAsFile()
      if (pasted) acceptFiles([pasted])
    }

    document.addEventListener('paste', handlePaste)
    return () => document.removeEventListener('paste', handlePaste)
  }, [results.length, loading, acceptFiles])

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? [])
    if (selected.length > 0) acceptFiles(selected)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const dropped = Array.from(e.dataTransfer.files ?? [])
    if (dropped.length > 0) acceptFiles(dropped)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const convertOne = (file: File, onProgress: (p: number) => void) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('format', format)
    formData.append('quality', quality.toString())
    if (resizeWidth.trim()) formData.append('width', resizeWidth.trim())
    if (resizeHeight.trim()) formData.append('height', resizeHeight.trim())
    formData.append('fit', resizeFit)

    return new Promise<ConversionResult>((resolve, reject) => {
      const xhr = new XMLHttpRequest()

      xhr.upload.onprogress = (ev) => {
        if (ev.lengthComputable) {
          onProgress(Math.round((ev.loaded / ev.total) * 90))
        }
      }

      xhr.onload = () => {
        onProgress(100)

        if (xhr.status === 403) {
          try {
            const errData = JSON.parse(xhr.responseText)
            if (errData.limitReached) {
              toast.error('Free plan limit reached (5/month). Upgrade to continue.', {
                action: { label: 'View Plans', onClick: () => router.push('/pricing') },
              })
            } else {
              toast.error(errData.error || 'Conversion failed')
            }
          } catch {
            toast.error('Conversion failed')
          }

          reject(new Error('limit_reached'))
          return
        }

        if (xhr.status < 200 || xhr.status >= 300) {
          reject(new Error(`HTTP ${xhr.status}`))
          return
        }

        try {
          const parsed = JSON.parse(xhr.responseText)
          resolve({
            ...parsed,
            sourceName: file.name,
          })
        } catch {
          reject(new Error('Invalid response'))
        }
      }

      xhr.onerror = () => reject(new Error('Network error'))
      xhr.open('POST', '/api/auth/convert')
      xhr.send(formData)
    })
  }

  const convertFromUrl = async () => {
    const url = imageUrl.trim()
    const formData = new FormData()
    formData.append('imageUrl', url)
    formData.append('format', format)
    formData.append('quality', quality.toString())
    if (resizeWidth.trim()) formData.append('width', resizeWidth.trim())
    if (resizeHeight.trim()) formData.append('height', resizeHeight.trim())
    formData.append('fit', resizeFit)

    setProgress(30)
    const response = await fetch('/api/auth/convert', {
      method: 'POST',
      body: formData,
    })

    if (response.status === 403) {
      const errData = await response.json().catch(() => ({}))
      if (errData.limitReached) {
        toast.error('Free plan limit reached (5/month). Upgrade to continue.', {
          action: { label: 'View Plans', onClick: () => router.push('/pricing') },
        })
      } else {
        toast.error(errData.error || 'Conversion failed')
      }
      throw new Error('limit_reached')
    }

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}))
      throw new Error(errData.error || 'Conversion failed')
    }

    const data = await response.json()
    setProgress(100)

    const sourceName = (() => {
      try {
        const parsed = new URL(url)
        const last = parsed.pathname.split('/').pop() || 'remote-image'
        return decodeURIComponent(last)
      } catch {
        return 'remote-image'
      }
    })()

    return {
      ...data,
      sourceName,
    } as ConversionResult
  }

  const handleConvert = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (files.length === 0 && !imageUrl.trim()) {
      toast.error('Select files or provide an image URL')
      return
    }

    if (!format || !OUTPUT_FORMATS.includes(format)) {
      toast.error('Invalid format selected')
      return
    }

    setLoading(true)
    setProgress(0)
    setProcessingIndex(0)
    setResults([])

    const successful: ConversionResult[] = []

    try {
      if (files.length > 0) {
        for (let index = 0; index < files.length; index++) {
          setProcessingIndex(index + 1)

          const result = await convertOne(files[index], (fileProgress) => {
            const overall = ((index + fileProgress / 100) / files.length) * 100
            setProgress(Math.round(overall))
          })

          successful.push(result)
        }
      } else {
        setProcessingIndex(1)
        const result = await convertFromUrl()
        successful.push(result)
      }

      setResults(successful)

      if (successful.length === 1) {
        const single = successful[0]
        toast.success('Conversion successful!', {
          action: {
            label: 'Download',
            onClick: () => {
              const baseName = single.sourceName.includes('.')
                ? single.sourceName.substring(0, single.sourceName.lastIndexOf('.'))
                : single.sourceName
              const filename = `converted-${baseName}.${single.afterFormat}`
              window.location.href = `/api/download?url=${encodeURIComponent(single.url)}&filename=${encodeURIComponent(filename)}`
            },
          },
        })
      } else {
        toast.success(`Converted ${successful.length} images successfully.`)
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error)
      if (msg !== 'limit_reached') {
        toast.error('Batch conversion stopped due to an error.')
      }

      if (successful.length > 0) {
        setResults(successful)
        const total = files.length > 0 ? files.length : 1
        toast.message(`${successful.length}/${total} files converted before stopping.`)
      }
    } finally {
      setLoading(false)
      setProcessingIndex(0)
    }
  }

  const handleReset = () => {
    setFiles([])
    setImageUrl('')
    setFormat('')
    setQuality(80)
    setResizeWidth('')
    setResizeHeight('')
    setResizeFit('inside')
    setResults([])
    setPreview(null)
    setProgress(0)
    setProcessingIndex(0)
  }

  const handleDownloadOne = (item: ConversionResult) => {
    const baseName = item.sourceName.includes('.')
      ? item.sourceName.substring(0, item.sourceName.lastIndexOf('.'))
      : item.sourceName
    const filename = `converted-${baseName}.${item.afterFormat}`
    window.location.href = `/api/download?url=${encodeURIComponent(item.url)}&filename=${encodeURIComponent(filename)}`
  }

  const handleCopyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url)
      toast.success('Image URL copied to clipboard!')
    } catch {
      toast.error('Failed to copy URL')
    }
  }

  const handleDownloadAll = () => {
    if (results.length === 0) return

    results.forEach((item, idx) => {
      setTimeout(() => handleDownloadOne(item), idx * 250)
    })
  }

  return (
    <div className='space-y-6'>
      {results.length === 0 ? (
        <>
          {files.length === 0 && (
            <div className='space-y-3'>
              <div
                className='border-2 border-dashed border-gray-300 p-6 rounded-lg text-center cursor-pointer hover:border-blue-500 transition-colors'
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => document.getElementById('fileInput')?.click()}
              >
                <Upload className='h-12 w-12 text-gray-400 mx-auto mb-4' />
                <p className='mb-1'>Drag & Drop, paste (Ctrl+V), or click to browse</p>
                <p className='text-sm text-gray-500'>Supports multiple files: JPEG, PNG, WebP, AVIF, HEIC/HEIF</p>
                <Input
                  id='fileInput'
                  type='file'
                  accept='image/*,.heic,.heif'
                  multiple
                  onChange={handleUpload}
                  className='hidden'
                />
              </div>

              <div className='text-center text-sm text-muted-foreground'>or convert from image URL</div>
              <Input
                type='url'
                placeholder='https://example.com/image.jpg'
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>
          )}

          {(files.length > 0 || imageUrl.trim()) && (
            <div className='space-y-6'>
              {preview && (
                <div className='flex justify-center'>
                  <Image src={preview} alt='Preview' width={400} height={300} className='max-h-[300px] rounded-lg shadow-sm' />
                </div>
              )}

              <div className='text-center'>
                <p className='text-sm font-medium'>
                  {files.length} file{files.length > 1 ? 's' : ''} selected
                </p>
                <p className='text-xs text-gray-500 mt-1'>
                  {files.slice(0, 3).map(f => f.name).join(', ')}
                  {files.length > 3 ? ` +${files.length - 3} more` : ''}
                </p>
              </div>

              <Card className='p-4'>
                <form onSubmit={handleConvert} className='space-y-4'>
                  {imageUrl.trim() && files.length === 0 && (
                    <div className='text-xs text-muted-foreground break-all'>
                      Source URL: {imageUrl.trim()}
                    </div>
                  )}

                  <div>
                    <label className='block mb-2 text-sm font-medium'>Target Format</label>
                    <select
                      value={format}
                      onChange={(e) => setFormat(e.target.value.toLowerCase())}
                      className='w-full p-2 border rounded-md'
                    >
                      <option value=''>Select target format</option>
                      <option value='jpeg'>JPEG</option>
                      <option value='webp'>WebP</option>
                      <option value='jpg'>JPG</option>
                      <option value='png'>PNG</option>
                      <option value='avif'>AVIF</option>
                    </select>
                  </div>

                  <div>
                    <label className='block mb-2 text-sm font-medium'>
                      Quality: {quality}%
                    </label>
                    <input
                      type='range'
                      min='10'
                      max='100'
                      value={quality}
                      onChange={(e) => setQuality(Number(e.target.value))}
                      className='w-full'
                    />
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                    <div>
                      <label className='block mb-2 text-sm font-medium'>Width (optional)</label>
                      <Input
                        type='number'
                        min='1'
                        placeholder='e.g. 1920'
                        value={resizeWidth}
                        onChange={(e) => setResizeWidth(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className='block mb-2 text-sm font-medium'>Height (optional)</label>
                      <Input
                        type='number'
                        min='1'
                        placeholder='e.g. 1080'
                        value={resizeHeight}
                        onChange={(e) => setResizeHeight(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className='block mb-2 text-sm font-medium'>Resize Mode</label>
                      <select
                        value={resizeFit}
                        onChange={(e) => setResizeFit(e.target.value as 'inside' | 'cover' | 'contain' | 'fill')}
                        className='w-full p-2 border rounded-md'
                      >
                        <option value='inside'>Inside (keep aspect)</option>
                        <option value='cover'>Cover (crop to fit)</option>
                        <option value='contain'>Contain</option>
                        <option value='fill'>Fill</option>
                      </select>
                    </div>
                  </div>

                  <div className='flex gap-2 pt-2'>
                    <Button type='button' variant='outline' onClick={handleReset}>
                      Cancel
                    </Button>
                    <Button type='submit' disabled={loading || !format} className='flex-1'>
                      {loading
                        ? `Converting ${processingIndex}/${files.length || 1}...`
                        : files.length > 1
                          ? 'Convert All'
                          : 'Convert'}
                    </Button>
                  </div>
                </form>

                {loading && (
                  <div className='mt-4 space-y-2'>
                    <Progress value={progress} />
                    <p className='text-sm text-center text-gray-500'>
                      {processingIndex > 0
                        ? `Processing file ${processingIndex} of ${files.length || 1}`
                        : 'Preparing conversion...'}
                    </p>
                  </div>
                )}
              </Card>
            </div>
          )}
        </>
      ) : (
        <div className='space-y-4'>
          <Card className='p-4'>
            <p className='font-medium'>Converted {results.length} image{results.length > 1 ? 's' : ''}</p>
            <p className='text-sm text-muted-foreground'>Download individually or all at once.</p>
          </Card>

          <div className='space-y-3'>
            {results.map((item, index) => (
              <Card key={`${item.url}-${index}`} className='p-4'>
                <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-3'>
                  <div>
                    <p className='font-medium'>{item.sourceName}</p>
                    <p className='text-sm text-muted-foreground'>
                      {item.beforeFormat.toUpperCase()} → {item.afterFormat.toUpperCase()} | {(item.beforeSize / 1024).toFixed(1)}KB → {(item.afterSize / 1024).toFixed(1)}KB
                    </p>
                  </div>
                  <div className='flex gap-2'>
                    <Button variant='outline' size='sm' onClick={() => handleCopyUrl(item.url)}>
                      <Copy className='h-4 w-4 mr-1' /> Copy URL
                    </Button>
                    <Button size='sm' onClick={() => handleDownloadOne(item)}>
                      <Download className='h-4 w-4 mr-1' /> Download
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className='flex gap-3 flex-wrap'>
            <Button variant='outline' onClick={handleReset} className='flex items-center gap-2 flex-1'>
              <RefreshCw className='h-4 w-4' /> Convert Another Batch
            </Button>
            <Button onClick={handleDownloadAll} className='flex items-center gap-2 flex-1'>
              <Download className='h-4 w-4' /> Download All
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ConversionForm
