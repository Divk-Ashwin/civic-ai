import Link from "next/link";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-secondary-50 flex flex-col">
      {/* Simple Header */}
      <header className="py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <span className="text-2xl font-bold text-primary">CivicAI</span>
          </Link>
        </div>
      </header>

      {/* Centered Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
