
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, PiggyBank, LineChart, BadgeDollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen pt-24 overflow-hidden bg-gradient-to-br from-white to-gray-50"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-t from-finance-50/30 to-transparent"></div>
        <div className="absolute -top-[30%] -right-[10%] w-[70vw] h-[70vw] rounded-full bg-finance-100/30 blur-3xl pulse-subtle"></div>
        <div className="absolute top-[50%] -left-[20%] w-[50vw] h-[50vw] rounded-full bg-finance-50/40 blur-3xl pulse-subtle"></div>
      </div>

      <div className="container relative mx-auto px-4 md:px-6 pt-12 pb-24 md:pt-20 md:pb-32">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center space-y-6 animate-on-scroll"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-finance-50 border border-finance-100 text-finance-700 text-sm font-medium mb-2">
              <span className="flex-shrink-0 w-2 h-2 rounded-full bg-finance-500 mr-2"></span>
              <span>Intelligent Finance Management</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 balance-text">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-finance-700 to-finance-500">Transform</span> Your 
              <br className="hidden md:block" /> Financial Future
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto balance-text">
              Intelligent insights, automated budgeting, and AI-driven investment suggestions to help you save, spend, and invest smarter.
            </p>
            
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-finance-600 hover:bg-finance-700 text-white rounded-full px-8 h-12 text-base shadow-sm group"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full px-8 h-12 text-base border-gray-300"
              >
                See How It Works
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 animate-on-scroll"
          >
            <FeatureCard
              icon={<BadgeDollarSign className="h-6 w-6 text-finance-600" />}
              title="Real-time Insights"
              description="Get detailed analysis of your spending habits and financial health with AI-powered recommendations."
            />
            <FeatureCard
              icon={<PiggyBank className="h-6 w-6 text-finance-600" />}
              title="Smart Budgeting"
              description="Automated budget creation based on your income, goals, and spending patterns that adapts over time."
            />
            <FeatureCard
              icon={<LineChart className="h-6 w-6 text-finance-600" />}
              title="Investment Guidance"
              description="Personalized investment suggestions based on your risk tolerance, goals, and market conditions."
            />
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="glass-card rounded-xl p-6 flex flex-col items-center text-center"
    >
      <div className="rounded-full bg-finance-50 p-3 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

export default Hero;
