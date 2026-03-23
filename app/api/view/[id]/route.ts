import { NextRequest, NextResponse } from 'next/server';
import { dbconnect } from '@/lib/db';
import History from '@/models/History';

// Public endpoint – no auth required so images can be shared via URL
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await dbconnect();

    const item = await History.findById(id).lean();
    if (!item) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const safeItem = item as unknown as {
      _id: unknown;
      url?: string;
      beforeFormat?: string;
      afterFormat?: string;
      name?: string;
      beforeSize?: number;
      afterSize?: number;
      createdAt?: Date;
      removedBg?: boolean;
    };

    if (!safeItem.url || !safeItem.beforeFormat || !safeItem.afterFormat || !safeItem.name) {
      return NextResponse.json({ error: 'Invalid record' }, { status: 500 });
    }

    return NextResponse.json({
      _id: safeItem._id,
      url: safeItem.url,
      beforeFormat: safeItem.beforeFormat,
      afterFormat: safeItem.afterFormat,
      name: safeItem.name,
      beforeSize: safeItem.beforeSize ?? 0,
      afterSize: safeItem.afterSize ?? 0,
      createdAt: safeItem.createdAt,
      removedBg: safeItem.removedBg,
    });
  } catch (error) {
    console.error('View API error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
