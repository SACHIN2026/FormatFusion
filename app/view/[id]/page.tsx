import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface ViewItem {
  _id: string;
  url: string;
  beforeFormat: string;
  afterFormat: string;
  name: string;
  beforeSize: number;
  afterSize: number;
  createdAt: string;
  removedBg?: boolean;
}

async function getItem(id: string): Promise<ViewItem | null> {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/view/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const item = await getItem(id);
  if (!item) return { title: 'Image not found' };
  return {
    title: `${item.name} — FormatFusion`,
    description: item.removedBg
      ? `Background-removed image: ${item.name}`
      : `Converted from ${item.beforeFormat.toUpperCase()} to ${item.afterFormat.toUpperCase()}`,
    openGraph: { images: [{ url: item.url }] },
  };
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
}

export default async function ViewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getItem(id);
  if (!item) notFound();

  const compression = item.beforeSize > 0
    ? ((item.beforeSize - item.afterSize) / item.beforeSize * 100).toFixed(1)
    : '0';

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Image */}
          <div className="bg-gray-100 flex items-center justify-center p-4 min-h-64">
            <Image
              src={item.url}
              alt={item.name}
              width={600}
              height={400}
              className="max-h-[400px] object-contain rounded"
              style={{ background: item.removedBg ? 'repeating-conic-gradient(#e5e7eb 0% 25%, white 0% 50%) 0 0 / 16px 16px' : undefined }}
            />
          </div>

          {/* Info */}
          <div className="p-6 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{item.name}</h1>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(item.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
              {item.removedBg && (
                <span className="shrink-0 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                  BG Removed
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-500">Original format</p>
                <p className="font-semibold mt-0.5">{item.beforeFormat.toUpperCase()}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-500">Output format</p>
                <p className="font-semibold mt-0.5">{item.afterFormat.toUpperCase()}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-500">Original size</p>
                <p className="font-semibold mt-0.5">{formatSize(item.beforeSize)}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-500">Output size</p>
                <p className="font-semibold mt-0.5">{formatSize(item.afterSize)}</p>
              </div>
            </div>

            {parseFloat(compression) > 0 && (
              <div className="text-sm text-green-600 font-medium">
                ✓ {compression}% size reduction
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <a
                href={`/api/download?url=${encodeURIComponent(item.url)}&filename=${encodeURIComponent(item.name)}`}
                className="flex-1 text-center py-2.5 px-4 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
              >
                Download
              </a>
              <Link
                href="/convert"
                className="flex-1 text-center py-2.5 px-4 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Convert your own
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
