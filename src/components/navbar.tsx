
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-16">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="text-lg font-semibold text-white">Human Hands</div>
            <div className="text-2xl">👐</div>
          </div>
        </div>
        <div className="flex space-x-4">
          <Link href="/tutorials/grundfoss" className="text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-100">
              Pump System
          </Link>
          <span className="text-gray-500">Ikea Shelf (Coming Soon)</span>
        </div>
      </div>
    </nav>
  );
}
