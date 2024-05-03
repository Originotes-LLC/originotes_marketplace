'use client'

import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <ExclamationTriangleIcon className="h-16 w-full text-red-500" />
        <h2 className="mt-2 text-4xl font-bold tracking-tight text-red-500">Oops, something went wrong!</h2>
        <p className="mt-6 text-lg leading-8 text-neutral-400">
          {error.message}
        </p>
      </div>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
          className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
          Try again
        </button>
        <Link href="/vendor/dashboard" className="text-sm font-semibold leading-6 text-neutral-900">
          Exit this page <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>

  )
}