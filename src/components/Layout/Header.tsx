
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X, Settings } from "lucide-react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full border-b border-gray-200 bg-white/80 backdrop-blur-md fixed top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8 bg-gradient-to-br from-primary via-secondary to-accent rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="text-xl font-bold">AIBuildify</span>
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex gap-4 text-sm">
            <Link to="/admin" className="text-gray-700 hover:text-primary transition-colors flex items-center gap-1">
              <Settings size={16} />
              Admin
            </Link>
            <Link to="/dashboard" className="text-gray-700 hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link to="/builds" className="text-gray-700 hover:text-primary transition-colors">
              My Builds
            </Link>
            <Link to="/integrations" className="text-gray-700 hover:text-primary transition-colors">
              Integrations
            </Link>
            <Link to="/analytics" className="text-gray-700 hover:text-primary transition-colors">
              Analytics
            </Link>
          </nav>
          <Button size="sm" variant="outline" asChild>
            <Link to="/login">Sign In</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/create">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 inset-x-0 bg-white border-b border-gray-200 shadow-lg z-50">
            <div className="flex flex-col p-4 gap-2">
              <Link to="/admin" className="py-2 px-4 hover:bg-gray-100 rounded-md flex items-center gap-2">
                <Settings size={16} />
                Admin
              </Link>
              <Link to="/dashboard" className="py-2 px-4 hover:bg-gray-100 rounded-md">Dashboard</Link>
              <Link to="/builds" className="py-2 px-4 hover:bg-gray-100 rounded-md">My Builds</Link>
              <Link to="/integrations" className="py-2 px-4 hover:bg-gray-100 rounded-md">Integrations</Link>
              <Link to="/analytics" className="py-2 px-4 hover:bg-gray-100 rounded-md">Analytics</Link>
              <div className="flex flex-col gap-2 pt-2 border-t border-gray-200">
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link to="/create">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
