import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get('tag')
  const path = request.nextUrl.searchParams.get('path')

  if (tag) {
    revalidateTag(tag, 'max')
  }

  if (path) {
    revalidatePath(path, 'page')
  }

  // If no specific tag or path, revalidate common ones
  if (!tag && !path) {
    revalidateTag('pages', 'max')
    revalidateTag('posts', 'max')
    revalidateTag('services', 'max')
    revalidatePath('/', 'layout')
  }

  return NextResponse.json({
    revalidated: true,
    tag: tag || null,
    path: path || null,
    now: Date.now(),
  })
}

export async function GET(request: NextRequest) {
  return POST(request)
}
