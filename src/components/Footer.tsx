
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Github, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  const year = new Date().getFullYear();
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribed to newsletter');
    // In a real app, this would send the email to a newsletter service
  };

  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-finance-600">FINAI</h3>
            <p className="text-gray-600">
              Your intelligent finance and budgeting assistant, providing AI-driven insights for smarter financial decisions.
            </p>
            <div className="flex space-x-4">
              <SocialLink icon={<Facebook size={18} />} href="#" />
              <SocialLink icon={<Twitter size={18} />} href="#" />
              <SocialLink icon={<Instagram size={18} />} href="#" />
              <SocialLink icon={<Linkedin size={18} />} href="#" />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-4">Company</h4>
            <ul className="space-y-2">
              <FooterLink text="About" href="#" />
              <FooterLink text="Careers" href="#" />
              <FooterLink text="Blog" href="#" />
              <FooterLink text="Partners" href="#" />
              <FooterLink text="Press" href="#" />
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-4">Resources</h4>
            <ul className="space-y-2">
              <FooterLink text="Help Center" href="#" />
              <FooterLink text="Financial Glossary" href="#" />
              <FooterLink text="Investment Guides" href="#" />
              <FooterLink text="Market Updates" href="#" />
              <FooterLink text="Budget Templates" href="#" />
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-4">Subscribe</h4>
            <p className="text-gray-600 text-sm mb-4">
              Get the latest financial tips and insights delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="rounded-r-none focus-visible:ring-finance-600"
                />
                <Button type="submit" className="rounded-l-none bg-finance-600 hover:bg-finance-700">
                  <ArrowRight size={16} />
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                By subscribing, you agree to our Privacy Policy and Terms of Service.
              </p>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              © {year} FINAI. All rights reserved.
            </p>
            <div className="flex flex-wrap space-x-6">
              <FooterLink text="Privacy Policy" href="#" className="text-sm" />
              <FooterLink text="Terms of Service" href="#" className="text-sm" />
              <FooterLink text="Cookies" href="#" className="text-sm" />
              <FooterLink text="Contact" href="#" className="text-sm" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ icon, href }: { icon: React.ReactNode; href: string }) => {
  return (
    <a
      href={href}
      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-finance-600 hover:text-white transition-colors"
    >
      {icon}
    </a>
  );
};

const FooterLink = ({ 
  text, 
  href, 
  className = "" 
}: { 
  text: string; 
  href: string; 
  className?: string 
}) => {
  return (
    <li>
      <a
        href={href}
        className={`text-gray-600 hover:text-finance-600 transition-colors ${className}`}
      >
        {text}
      </a>
    </li>
  );
};

export default Footer;
