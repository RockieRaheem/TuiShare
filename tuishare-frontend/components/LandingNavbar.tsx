"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LandingNavbar() {
  const pathname = usePathname();
  
  const isHomePage = pathname === "/";
  const isShowcasePage = pathname === "/showcase";
  const isCryptoDemoPage = pathname === "/crypto-demo";
  const isDashboardPage = pathname?.includes("/dashboard") || false;

  return (
    <nav className="w-full bg-blue-600 text-white py-4 px-8 flex items-center justify-between shadow-lg fixed top-0 left-0 z-50">
      <Link href="/" className="text-2xl font-bold tracking-wide hover:text-blue-200 transition-colors">
        TuiShare Plus
      </Link>
      
      <div className="flex items-center gap-6">
        {/* Always show main navigation */}
        {!isDashboardPage && (
          <>
            <Link 
              href="/showcase" 
              className={`px-4 py-2 rounded-lg font-semibold transition-all shadow-md ${
                isShowcasePage 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:from-orange-600 hover:to-yellow-600'
              }`}
            >
              🎯 Full Demo
            </Link>
            <Link 
              href="/crypto-demo" 
              className={`transition-colors ${
                isCryptoDemoPage 
                  ? 'text-white font-semibold' 
                  : 'text-blue-100 hover:text-white'
              }`}
            >
              Crypto Demo
            </Link>
          </>
        )}

        {/* Auth Links for non-dashboard pages */}
        {!isDashboardPage && (
          <div className="flex items-center gap-4">
            <div className="relative group">
              <button className="text-blue-100 hover:text-white transition-colors">
                Login ▼
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link href="/student/login" className="block px-4 py-2 text-gray-800 hover:bg-blue-50">
                  👩‍🎓 Student Login
                </Link>
                <Link href="/school/login" className="block px-4 py-2 text-gray-800 hover:bg-blue-50">
                  🏫 School Login
                </Link>
                <Link href="/supporter/login" className="block px-4 py-2 text-gray-800 hover:bg-blue-50">
                  🤝 Supporter Login
                </Link>
              </div>
            </div>
            
            <div className="relative group">
              <button className="text-blue-100 hover:text-white transition-colors">
                Register ▼
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link href="/student/register" className="block px-4 py-2 text-gray-800 hover:bg-blue-50">
                  👩‍🎓 Student Register
                </Link>
                <Link href="/school/register" className="block px-4 py-2 text-gray-800 hover:bg-blue-50">
                  🏫 School Register
                </Link>
                <Link href="/supporter/register" className="block px-4 py-2 text-gray-800 hover:bg-blue-50">
                  🤝 Supporter Register
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard navigation */}
        {isDashboardPage && (
          <div className="flex items-center gap-4">
            <Link href="/" className="text-blue-100 hover:text-white transition-colors">
              Home
            </Link>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition-colors">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
