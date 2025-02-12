import Link from 'next/link';

export default async function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4">
      <div className="text-center">
        <div className="relative mx-auto mb-8 h-48 w-48"></div>
        <h1 className="mb-2 text-6xl font-bold text-gray-900">404</h1>
        <h2 className="mb-4 text-3xl font-semibold text-gray-800">Page Not Found</h2>
        <p className="mx-auto mb-8 max-w-md text-lg text-gray-600">
          Oops! The page you&apos;re looking for seems to have gone on an adventure.
        </p>
        <div className="space-x-4">
          <Link
            href="/"
            className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-blue-700"
          >
            Go Home
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-50"
          >
            View Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
