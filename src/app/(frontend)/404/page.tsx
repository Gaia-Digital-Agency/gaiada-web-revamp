import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'

export default function NotFoundPage() {
  return (
    <div className="container mt-18 py-28 min-h-[50vh] flex flex-col justify-center items-center">
      <div className="prose max-w-none text-center">
        <h1 className="text-[200px]!">404</h1>
        <p className="mb-4">This page could not be found.</p>
      </div>
      <Button asChild variant="default">
        <Link href="/">Go home</Link>
      </Button>
    </div>
  )
}
