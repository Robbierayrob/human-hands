import Image from "next/image";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-16">
        <div className="flex items-center space-x-4 ml-auto">
          <div className="text-left">
            <div className="text-lg font-semibold text-orange-500">can we fix it,</div>
            <div className="text-lg font-semibold text-orange-500">yes we can</div>
          </div>
        </div>
      </div>
    </nav>
  );
}
