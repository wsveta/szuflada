import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-wide">
          SZUFLADA
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/#catalog" className="text-gray-600 hover:text-black">
            Каталог
          </Link>

          <Link href="/#about" className="text-gray-600 hover:text-black">
            Про проєкт
          </Link>

          <Link
            href="/support"
            className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:text-black hover:bg-gray-50"
          >
            Запуск магазину
          </Link>
        </nav>
      </div>
    </header>
  );
}