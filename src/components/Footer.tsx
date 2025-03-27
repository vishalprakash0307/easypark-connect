
import React from 'react';
import { Car, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-12 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 text-primary mb-4">
              <Car className="h-6 w-6" />
              <span className="text-lg font-medium">Park Smart</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Making urban parking effortless with real-time availability information, seamless payments, and smart technology.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center transition-colors hover:bg-primary hover:text-white"
                aria-label="Twitter"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a 
                href="#" 
                className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center transition-colors hover:bg-primary hover:text-white"
                aria-label="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a 
                href="#" 
                className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center transition-colors hover:bg-primary hover:text-white"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a 
                href="#" 
                className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center transition-colors hover:bg-primary hover:text-white"
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h5 className="font-medium text-gray-900 mb-4">Quick Links</h5>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-600 hover:text-primary text-sm transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <a href="#features" className="text-gray-600 hover:text-primary text-sm transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-600 hover:text-primary text-sm transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-600 hover:text-primary text-sm transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-medium text-gray-900 mb-4">Legal</h5>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-primary text-sm transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary text-sm transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary text-sm transition-colors">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary text-sm transition-colors">
                  GDPR
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-medium text-gray-900 mb-4">Contact Us</h5>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-gray-600 text-sm">
                  123 Innovation Drive<br />
                  Smart City, SC 10001
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <a href="tel:+11234567890" className="text-gray-600 hover:text-primary text-sm transition-colors">
                  +1 (123) 456-7890
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <a href="mailto:info@parksmart.com" className="text-gray-600 hover:text-primary text-sm transition-colors">
                  info@parksmart.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Globe className="h-5 w-5 text-primary shrink-0" />
                <a href="https://parksmart.com" className="text-gray-600 hover:text-primary text-sm transition-colors">
                  www.parksmart.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Park Smart. All rights reserved.
          </p>
          <div className="mt-4 sm:mt-0">
            <ul className="flex space-x-6">
              <li>
                <a href="#" className="text-gray-500 hover:text-primary text-sm transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-primary text-sm transition-colors">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-primary text-sm transition-colors">
                  API
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
