import { NextResponse } from 'next/server';
import { getDatabase } from '../../../lib/mongodb';

export async function GET() {
    try {
        const db = await getDatabase();
        const posts = await db
            .collection('posts')
            .find({})
            .limit(10)
            .toArray();

        return NextResponse.json(posts);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Unable to fetch posts' }, { status: 500 });
    }
}