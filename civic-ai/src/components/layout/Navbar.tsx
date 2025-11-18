"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white border-b border-secondary-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <span className="text-2xl font-bold text-primary">CivicAI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/#how-it-works"
              className="text-secondary-700 hover:text-primary transition-colors font-medium"
            >
              How It Works
            </Link>
            <Link
              href="/#impact"
              className="text-secondary-700 hover:text-primary transition-colors font-medium"
            >
              Impact
            </Link>
            <Link
              href="/dashboard"
              className="text-secondary-700 hover:text-primary transition-colors font-medium"
            >
              Dashboard
            </Link>
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className="px-4 py-2 text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-sm"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-secondary-700 hover:bg-secondary-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden bg-white border-t border-secondary-200 overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-96" : "max-h-0"
        )}
      >
        <div className="px-4 py-4 space-y-3">
          <Link
            href="/#how-it-works"
            className="block px-4 py-2 text-secondary-700 hover:bg-secondary-50 hover:text-primary rounded-lg transition-colors font-medium"
            onClick={() => setIsOpen(false)}
          >
            How It Works
          </Link>
          <Link
            href="/#impact"
            className="block px-4 py-2 text-secondary-700 hover:bg-secondary-50 hover:text-primary rounded-lg transition-colors font-medium"
            onClick={() => setIsOpen(false)}
          >
            Impact
          </Link>
          <Link
            href="/dashboard"
            className="block px-4 py-2 text-secondary-700 hover:bg-secondary-50 hover:text-primary rounded-lg transition-colors font-medium"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
          <div className="pt-3 border-t border-secondary-200 space-y-2">
            <Link
              href="/login"
              className="block px-4 py-2 text-primary hover:bg-primary/5 rounded-lg transition-colors font-medium text-center"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="block px-4 py-2 bg-primary text-white hover:bg-primary/90 rounded-lg transition-colors font-medium text-center shadow-sm"
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
