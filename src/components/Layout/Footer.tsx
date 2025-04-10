
import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="container py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 bg-gradient-to-br from-primary via-secondary to-accent rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-xl font-bold">AIBuildify</span>
            </div>
            <p className="text-gray-600 text-sm">
              Create, customize, and deploy AI chatbots in minutes with our intuitive platform.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" className="text-gray-600 hover:text-primary" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://github.com" className="text-gray-600 hover:text-primary" aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com" className="text-gray-600 hover:text-primary" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Product</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li><Link to="/features" className="hover:text-primary">Features</Link></li>
              <li><Link to="/pricing" className="hover:text-primary">Pricing</Link></li>
              <li><Link to="/templates" className="hover:text-primary">Templates</Link></li>
              <li><Link to="/integrations" className="hover:text-primary">Integrations</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li><Link to="/docs" className="hover:text-primary">Documentation</Link></li>
              <li><Link to="/blog" className="hover:text-primary">Blog</Link></li>
              <li><Link to="/tutorials" className="hover:text-primary">Tutorials</Link></li>
              <li><Link to="/showcase" className="hover:text-primary">Showcase</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} AIBuildify. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <select
              className="bg-transparent text-sm text-gray-600 border border-gray-300 rounded-md px-2 py-1"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
};
