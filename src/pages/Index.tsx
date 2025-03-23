
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Dashboard from '@/components/Dashboard';
import BudgetTracker from '@/components/BudgetTracker';
import InvestmentSuggestions from '@/components/InvestmentSuggestions';
import FinancialInsight from '@/components/FinancialInsight';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Add animation observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    // Add staggered children animation observer
    const staggerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const staggerElements = document.querySelectorAll('.stagger-children');
    staggerElements.forEach((el) => staggerObserver.observe(el));

    return () => {
      observer.disconnect();
      staggerObserver.disconnect();
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-white"
      >
        <Navbar />
        <Hero />
        <Dashboard />
        <BudgetTracker />
        <InvestmentSuggestions />
        <FinancialInsight />
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
