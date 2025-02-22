import Image from "next/image";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-16">
        <div className="flex items-center space-x-4">
          <Image
            src="/next.svg"
            alt="Logo"
            width={100}
            height={40}
            className="h-8 w-auto"
          />
          <span className="text-lg font-semibold">Yes We Can</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600 dark:text-gray-400">with a hammer</span>
          <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2" />
          <span className="text-gray-600 dark:text-gray-400">and line break</span>
        </div>
      </div>
    </nav>
  );
}
