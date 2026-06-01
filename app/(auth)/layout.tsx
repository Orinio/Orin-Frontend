import Link from 'next/link';

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-serif font-bold grad-emerald">
            ORIN
          </Link>
          <p className="text-sm text-gray-600">
            Turn your work into career proof
          </p>
        </div>
      </nav>
      <main id="main-content">{children}</main>
    </div>
  );
}
