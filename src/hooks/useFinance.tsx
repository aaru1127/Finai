import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface Expense {
  id: string;
  category: string;
  amount: number;
  date: string;
  description: string;
}

export interface Category {
  name: string;
  icon: string;
  color: string;
  amount: number;
  limit: number;
  percentage: number;
}

export interface Investment {
  id: string;
  name: string;
  type: string;
  amount: number;
  returnRate: number;
  risk: 'low' | 'medium' | 'high';
  description: string;
}

interface FinanceContextType {
  income: number;
  expenses: Expense[];
  categories: Category[];
  investments: Investment[];
  savings: number;
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  updateIncome: (amount: number) => void;
  updateCategoryLimit: (category: string, limit: number) => void;
  getSavingsRate: () => number;
  addToCategory: (category: string, amount: number) => void;
  investSavings: (amount: number, investmentType: string) => void;
  getSuggestedInvestments: () => any[];
}

const INITIAL_CATEGORIES = [
  { name: 'Housing', icon: 'Home', color: 'bg-finance-400', amount: 18000, limit: 25000, percentage: 72 },
  { name: 'Food', icon: 'Utensils', color: 'bg-finance-500', amount: 8000, limit: 10000, percentage: 80 },
  { name: 'Transport', icon: 'Car', color: 'bg-finance-600', amount: 5000, limit: 6000, percentage: 83.3 },
  { name: 'Entertainment', icon: 'Film', color: 'bg-finance-300', amount: 3000, limit: 4000, percentage: 75 },
  { name: 'Shopping', icon: 'ShoppingCart', color: 'bg-finance-200', amount: 4000, limit: 5000, percentage: 80 },
  { name: 'Utilities', icon: 'Wifi', color: 'bg-finance-600', amount: 2500, limit: 3000, percentage: 83.3 },
];

const INITIAL_INVESTMENTS = [
  {
    id: 'inv-1',
    name: 'Nifty 50 Index Fund',
    type: 'stock',
    amount: 50000,
    returnRate: 12.0,
    risk: 'medium' as const,
    description: 'Tracks the performance of the Nifty 50 index, representing India\'s top 50 companies.'
  },
  {
    id: 'inv-2',
    name: 'Fixed Deposit (SBI)',
    type: 'savings',
    amount: 25000,
    returnRate: 6.5,
    risk: 'low' as const,
    description: 'Safe investment with guaranteed returns from State Bank of India, ideal for emergency funds.'
  }
];

// Investment suggestions based on risk profile for Indian market
const INVESTMENT_SUGGESTIONS = {
  conservative: [
    { 
      name: 'Government Bonds (Govt of India)', 
      returnRate: '7-8%', 
      risk: 'low',
      description: 'Sovereign bonds backed by the Government of India with virtually no default risk.',
      minAmount: 10000
    },
    { 
      name: 'Bank Fixed Deposits (HDFC)', 
      returnRate: '6-7%', 
      risk: 'low',
      description: 'Time deposits in leading Indian banks with guaranteed returns.',
      minAmount: 5000
    },
    { 
      name: 'Public Provident Fund (PPF)', 
      returnRate: '7-7.5%', 
      risk: 'low',
      description: 'Government-backed long-term savings scheme with tax benefits under 80C.',
      minAmount: 500
    }
  ],
  balanced: [
    { 
      name: 'Balanced Advantage Funds', 
      returnRate: '10-12%', 
      risk: 'medium',
      description: 'Dynamic allocation between equity and debt based on market valuations.',
      minAmount: 5000
    },
    { 
      name: 'Corporate Bonds (AAA-rated)', 
      returnRate: '8-9%', 
      risk: 'medium',
      description: 'Debt instruments issued by top-rated Indian corporations.',
      minAmount: 10000
    },
    { 
      name: 'REIT (Embassy Office Parks)', 
      returnRate: '8-10%', 
      risk: 'medium',
      description: 'Investment in India\'s commercial real estate market with regular dividend income.',
      minAmount: 15000
    }
  ],
  aggressive: [
    { 
      name: 'Small Cap Mutual Funds', 
      returnRate: '15-18%', 
      risk: 'high',
      description: 'Investments in small-sized Indian companies with high growth potential.',
      minAmount: 10000
    },
    { 
      name: 'Sectoral Funds (Technology)', 
      returnRate: '14-20%', 
      risk: 'high',
      description: 'Focused investments in India\'s booming technology sector.',
      minAmount: 10000
    },
    { 
      name: 'Mid-Cap Equity Funds', 
      returnRate: '13-16%', 
      risk: 'high',
      description: 'Investments in medium-sized growing Indian companies.',
      minAmount: 5000
    }
  ]
};

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [income, setIncome] = useState(80000);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [investments, setInvestments] = useState<Investment[]>(INITIAL_INVESTMENTS);
  const [savings, setSavings] = useState(15000);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedFinance = localStorage.getItem('finai-finance');
    if (storedFinance) {
      const parsed = JSON.parse(storedFinance);
      setIncome(parsed.income || income);
      setExpenses(parsed.expenses || expenses);
      setCategories(parsed.categories || categories);
      setInvestments(parsed.investments || investments);
      setSavings(parsed.savings || savings);
    }
  }, []);

  // Save data to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('finai-finance', JSON.stringify({
      income,
      expenses,
      categories,
      investments,
      savings
    }));
  }, [income, expenses, categories, investments, savings]);

  // Calculate total expenses
  useEffect(() => {
    const totalExpensesAmount = categories.reduce((sum, category) => sum + category.amount, 0);
    setSavings(income - totalExpensesAmount);
  }, [income, categories]);

  const updateIncome = (amount: number) => {
    setIncome(amount);
    toast({
      title: "Income Updated",
      description: `Your monthly income has been set to ₹${amount.toLocaleString()}.`,
    });
  };

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense = {
      ...expense,
      id: `exp-${Date.now()}`
    };
    
    setExpenses(prev => [...prev, newExpense]);
    
    // Update the corresponding category
    addToCategory(expense.category, expense.amount);
    
    toast({
      title: "Expense Added",
      description: `Added ₹${expense.amount.toLocaleString()} to ${expense.category}.`,
    });
  };

  const updateCategoryLimit = (categoryName: string, limit: number) => {
    setCategories(prev => 
      prev.map(cat => {
        if (cat.name === categoryName) {
          const percentage = (cat.amount / limit) * 100;
          return { ...cat, limit, percentage };
        }
        return cat;
      })
    );
    
    toast({
      title: "Budget Updated",
      description: `${categoryName} budget limit updated to ₹${limit.toLocaleString()}.`,
    });
  };

  const addToCategory = (categoryName: string, amount: number) => {
    setCategories(prev => 
      prev.map(cat => {
        if (cat.name === categoryName) {
          const newAmount = cat.amount + amount;
          const percentage = (newAmount / cat.limit) * 100;
          return { ...cat, amount: newAmount, percentage };
        }
        return cat;
      })
    );
  };

  const getSavingsRate = useCallback(() => {
    return (savings / income) * 100;
  }, [savings, income]);

  const investSavings = (amount: number, investmentType: string) => {
    if (amount > savings) {
      toast({
        title: "Investment Failed",
        description: "You don't have enough savings for this investment.",
        variant: "destructive"
      });
      return;
    }

    // Find a suggestion based on type
    let suggestion;
    if (investmentType === 'low') {
      suggestion = INVESTMENT_SUGGESTIONS.conservative[0];
    } else if (investmentType === 'medium') {
      suggestion = INVESTMENT_SUGGESTIONS.balanced[0];
    } else {
      suggestion = INVESTMENT_SUGGESTIONS.aggressive[0];
    }

    const newInvestment = {
      id: `inv-${Date.now()}`,
      name: suggestion.name,
      type: investmentType,
      amount: amount,
      returnRate: parseFloat(suggestion.returnRate.split('-')[0]),
      risk: investmentType as 'low' | 'medium' | 'high',
      description: suggestion.description
    };

    setInvestments(prev => [...prev, newInvestment]);
    setSavings(prev => prev - amount);

    toast({
      title: "Investment Made",
      description: `You've invested ₹${amount.toLocaleString()} in ${suggestion.name}.`,
    });
  };

  const getSuggestedInvestments = useCallback(() => {
    // Determine risk profile based on savings rate and income
    let riskProfile;
    const savingsRate = getSavingsRate();
    
    if (savingsRate < 10 || savings < 10000) {
      riskProfile = 'conservative';
    } else if (savingsRate < 20 || savings < 25000) {
      riskProfile = 'balanced';
    } else {
      riskProfile = 'aggressive';
    }
    
    // Return appropriate investment suggestions
    switch (riskProfile) {
      case 'conservative':
        return INVESTMENT_SUGGESTIONS.conservative;
      case 'balanced':
        return INVESTMENT_SUGGESTIONS.balanced;
      case 'aggressive':
        return INVESTMENT_SUGGESTIONS.aggressive;
      default:
        return [...INVESTMENT_SUGGESTIONS.conservative, ...INVESTMENT_SUGGESTIONS.balanced];
    }
  }, [savings, getSavingsRate]);

  const value = {
    income,
    expenses,
    categories,
    investments,
    savings,
    addExpense,
    updateIncome,
    updateCategoryLimit,
    getSavingsRate,
    addToCategory,
    investSavings,
    getSuggestedInvestments
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};
