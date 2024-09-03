import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-4 py-3 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left: Website Name */}
        <div className="text-2xl font-bold">
          <Link href="/">
            RateMyInternship
          </Link>
        </div>

        {/* Middle: Tabs */}
        <div className="hidden md:flex space-x-8">
          <Link href="/companies" className="hover:text-gray-300">
            Companies
          </Link>
          <Link href="/community" className="hover:text-gray-300">
            Community
          </Link>
          <Link href="/jobs" className="hover:text-gray-300">
            Jobs
          </Link>
        </div>

        {/* Right: Space for Clerk User Button */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Clerk user button will go here */}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {/* Add your mobile menu icon here, like a hamburger icon */}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden mt-2">
        <div className="flex flex-col space-y-2">
          <Link href="/companies" className="hover:text-gray-300">
            Companies
          </Link>
          <Link href="/community" className="hover:text-gray-300">
            Community
          </Link>
          <Link href="/jobs" className="hover:text-gray-300">
            Jobs
          </Link>
          {/* Clerk user button will go here */}
        </div>
      </div>
    </nav>
  );
}
