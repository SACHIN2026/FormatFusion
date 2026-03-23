import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { dbconnect } from '@/lib/db';
import User from '@/models/User';
import { generateApiKey, hashApiKey } from '@/lib/api-key';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbconnect();
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      hasApiKey: Boolean(user.apiKeyHash),
      prefix: user.apiKeyPrefix || null,
      createdAt: user.apiKeyCreatedAt || null,
    });
  } catch (error) {
    console.error('API key GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbconnect();
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { key, prefix } = generateApiKey();

    user.apiKeyHash = hashApiKey(key);
    user.apiKeyPrefix = prefix;
    user.apiKeyCreatedAt = new Date();
    await user.save();

    return NextResponse.json({
      message: 'API key generated',
      apiKey: key,
      prefix,
      createdAt: user.apiKeyCreatedAt,
    });
  } catch (error) {
    console.error('API key POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbconnect();
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    user.apiKeyHash = undefined;
    user.apiKeyPrefix = undefined;
    user.apiKeyCreatedAt = undefined;
    await user.save();

    return NextResponse.json({ message: 'API key revoked' });
  } catch (error) {
    console.error('API key DELETE error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
