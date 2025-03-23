
import { IndianRupee, LineChart, TrendingUp, BarChart2, Shield } from 'lucide-react';

export interface InvestmentCompany {
  id: string;
  name: string;
  description: string;
  logo?: string;
  website: string;
  fundTypes: string[];
  minInvestment: number;
  aum?: number; // Assets Under Management in crores
  established?: number;
  rating?: number; // 1-5
}

export interface InvestmentFund {
  id: string;
  companyId: string; 
  name: string;
  type: 'equity' | 'debt' | 'hybrid' | 'commodity' | 'alternative' | 'index' | 'liquid' | 'tax-saving';
  category: string;
  risk: 'low' | 'medium' | 'high';
  returns: {
    oneYear?: number;
    threeYear?: number;
    fiveYear?: number;
  };
  minInvestment: number;
  expenseRatio: number;
  description: string;
  tags?: string[];
}

export interface InvestmentStrategy {
  name: string;
  description: string;
  riskLevel: 'low' | 'medium' | 'high';
  suitableFor: string[];
  timeHorizon: string;
  expectedReturns: string;
  allocation: Array<{
    type: string;
    percentage: number;
    description: string;
  }>;
  icon: any;
}

// Indian Investment Companies
export const investmentCompanies: InvestmentCompany[] = [
  {
    id: 'hdfc',
    name: 'HDFC Mutual Fund',
    description: 'One of India\'s largest asset management companies with a strong track record.',
    website: 'https://www.hdfcfund.com',
    fundTypes: ['Equity', 'Debt', 'Hybrid', 'Liquid', 'ETF'],
    minInvestment: 1000,
    aum: 4200,
    established: 1999,
    rating: 4.5
  },
  {
    id: 'sbi',
    name: 'SBI Mutual Fund',
    description: 'Backed by State Bank of India, offering a wide range of investment solutions.',
    website: 'https://www.sbimf.com',
    fundTypes: ['Equity', 'Debt', 'Hybrid', 'Index', 'ETF'],
    minInvestment: 500,
    aum: 6100,
    established: 1987,
    rating: 4.3
  },
  {
    id: 'icici',
    name: 'ICICI Prudential Mutual Fund',
    description: 'Joint venture between ICICI Bank and Prudential plc with diverse fund options.',
    website: 'https://www.icicipruamc.com',
    fundTypes: ['Equity', 'Debt', 'Hybrid', 'ETF', 'Index'],
    minInvestment: 1000,
    aum: 4900,
    established: 1993,
    rating: 4.4
  },
  {
    id: 'axis',
    name: 'Axis Mutual Fund',
    description: 'Investment solutions focused on long-term wealth creation with strong research capabilities.',
    website: 'https://www.axismf.com',
    fundTypes: ['Equity', 'Debt', 'Hybrid', 'Liquid'],
    minInvestment: 500,
    aum: 2500,
    established: 2009,
    rating: 4.2
  },
  {
    id: 'mirae',
    name: 'Mirae Asset',
    description: 'Global investment manager known for their equity-focused investment approach.',
    website: 'https://www.miraeassetmf.co.in',
    fundTypes: ['Equity', 'Hybrid', 'ETF', 'Fund of Funds'],
    minInvestment: 1000,
    aum: 1100,
    established: 2008,
    rating: 4.4
  },
  {
    id: 'nippon',
    name: 'Nippon India Mutual Fund',
    description: 'One of India\'s largest asset managers with a diverse range of funds.',
    website: 'https://mf.nipponindiaim.com',
    fundTypes: ['Equity', 'Debt', 'Hybrid', 'ETF', 'Index'],
    minInvestment: 500,
    aum: 3800,
    established: 1995,
    rating: 4.1
  },
  {
    id: 'kotak',
    name: 'Kotak Mahindra Mutual Fund',
    description: 'Part of Kotak Mahindra Group offering diversified investment solutions.',
    website: 'https://www.kotakmf.com',
    fundTypes: ['Equity', 'Debt', 'Hybrid', 'ETF'],
    minInvestment: 1000,
    aum: 2900,
    established: 1998,
    rating: 4.3
  },
  {
    id: 'dsp',
    name: 'DSP Mutual Fund',
    description: 'Investment manager with strong research capabilities and disciplined investment processes.',
    website: 'https://www.dspim.com',
    fundTypes: ['Equity', 'Debt', 'Hybrid', 'Liquid'],
    minInvestment: 500,
    aum: 1400,
    established: 1996,
    rating: 4.2
  },
  {
    id: 'aditya',
    name: 'Aditya Birla Sun Life Mutual Fund',
    description: 'Joint venture between Aditya Birla Group and Sun Life Financial Inc.',
    website: 'https://www.mutualfund.adityabirlacapital.com',
    fundTypes: ['Equity', 'Debt', 'Hybrid', 'Liquid', 'ETF'],
    minInvestment: 1000,
    aum: 2800,
    established: 1994,
    rating: 4.3
  },
  {
    id: 'uti',
    name: 'UTI Mutual Fund',
    description: 'One of India\'s oldest mutual fund companies with a trusted legacy.',
    website: 'https://www.utimf.com',
    fundTypes: ['Equity', 'Debt', 'Hybrid', 'Liquid'],
    minInvestment: 500,
    aum: 2200,
    established: 1963,
    rating: 4.0
  },
  {
    id: 'parag',
    name: 'Parag Parikh Financial Advisory Services (PPFAS)',
    description: 'Known for value investing approach with a focus on long-term wealth creation.',
    website: 'https://www.ppfas.com',
    fundTypes: ['Equity', 'Hybrid', 'Tax Saving'],
    minInvestment: 1000,
    aum: 420,
    established: 2013,
    rating: 4.5
  },
  {
    id: 'tata',
    name: 'Tata Mutual Fund',
    description: 'Subsidiary of the Tata Group, offering a range of investment solutions.',
    website: 'https://www.tatamutualfund.com',
    fundTypes: ['Equity', 'Debt', 'Hybrid', 'Index'],
    minInvestment: 500,
    aum: 900,
    established: 1995,
    rating: 4.1
  }
];

// Sample investment funds from these companies
export const investmentFunds: InvestmentFund[] = [
  {
    id: 'hdfc-1',
    companyId: 'hdfc',
    name: 'HDFC Mid-Cap Opportunities Fund',
    type: 'equity',
    category: 'Mid Cap',
    risk: 'high',
    returns: {
      oneYear: 22.5,
      threeYear: 18.3,
      fiveYear: 16.2
    },
    minInvestment: 5000,
    expenseRatio: 1.8,
    description: 'Seeks to generate long-term capital appreciation from a portfolio of equity and equity related securities of mid-cap companies.',
    tags: ['midcap', 'growth']
  },
  {
    id: 'sbi-1',
    companyId: 'sbi',
    name: 'SBI Bluechip Fund',
    type: 'equity',
    category: 'Large Cap',
    risk: 'medium',
    returns: {
      oneYear: 18.3,
      threeYear: 15.7,
      fiveYear: 13.8
    },
    minInvestment: 5000,
    expenseRatio: 1.65,
    description: 'Invests in large-cap companies with stable growth prospects and strong market positions.',
    tags: ['largecap', 'bluechip']
  },
  {
    id: 'icici-1',
    companyId: 'icici',
    name: 'ICICI Prudential Balanced Advantage Fund',
    type: 'hybrid',
    category: 'Dynamic Asset Allocation',
    risk: 'medium',
    returns: {
      oneYear: 16.2,
      threeYear: 13.6,
      fiveYear: 12.4
    },
    minInvestment: 5000,
    expenseRatio: 1.7,
    description: 'A dynamic asset allocation fund that adjusts equity and debt exposure based on market conditions.',
    tags: ['dynamic', 'balanced']
  },
  {
    id: 'parag-1',
    companyId: 'parag',
    name: 'PPFAS Flexi Cap Fund',
    type: 'equity',
    category: 'Flexi Cap',
    risk: 'medium',
    returns: {
      oneYear: 24.8,
      threeYear: 19.6,
      fiveYear: 17.3
    },
    minInvestment: 1000,
    expenseRatio: 1.4,
    description: 'Value-oriented fund with investments across market caps and including international equities.',
    tags: ['flexicap', 'value']
  },
  {
    id: 'axis-1',
    companyId: 'axis',
    name: 'Axis Small Cap Fund',
    type: 'equity',
    category: 'Small Cap',
    risk: 'high',
    returns: {
      oneYear: 26.5,
      threeYear: 22.8,
      fiveYear: 18.9
    },
    minInvestment: 5000,
    expenseRatio: 1.95,
    description: 'Focused on small-cap companies with high growth potential and long-term value creation.',
    tags: ['smallcap', 'growth']
  },
  {
    id: 'mirae-1',
    companyId: 'mirae',
    name: 'Mirae Asset Large Cap Fund',
    type: 'equity',
    category: 'Large Cap',
    risk: 'medium',
    returns: {
      oneYear: 19.2,
      threeYear: 16.5,
      fiveYear: 14.3
    },
    minInvestment: 5000,
    expenseRatio: 1.6,
    description: 'Invests in large, established companies with strong fundamentals and growth prospects.',
    tags: ['largecap', 'growth']
  },
  {
    id: 'kotak-1',
    companyId: 'kotak',
    name: 'Kotak Corporate Bond Fund',
    type: 'debt',
    category: 'Corporate Bond',
    risk: 'low',
    returns: {
      oneYear: 7.8,
      threeYear: 7.2,
      fiveYear: 7.5
    },
    minInvestment: 5000,
    expenseRatio: 0.45,
    description: 'Invests in high-quality corporate bonds, aiming for regular income with capital preservation.',
    tags: ['debt', 'income']
  },
  {
    id: 'hdfc-2',
    companyId: 'hdfc',
    name: 'HDFC Liquid Fund',
    type: 'liquid',
    category: 'Liquid',
    risk: 'low',
    returns: {
      oneYear: 6.2,
      threeYear: 5.8,
      fiveYear: 6.1
    },
    minInvestment: 5000,
    expenseRatio: 0.18,
    description: 'Invests in very short-term debt instruments with high liquidity and capital preservation.',
    tags: ['liquid', 'safe']
  },
  {
    id: 'sbi-2',
    companyId: 'sbi',
    name: 'SBI Small Cap Fund',
    type: 'equity',
    category: 'Small Cap',
    risk: 'high',
    returns: {
      oneYear: 27.3,
      threeYear: 23.1,
      fiveYear: 19.2
    },
    minInvestment: 5000,
    expenseRatio: 1.9,
    description: 'Focuses on identifying small-cap companies with growth potential at reasonable valuations.',
    tags: ['smallcap', 'growth']
  },
  {
    id: 'nippon-1',
    companyId: 'nippon',
    name: 'Nippon India Tax Saver Fund',
    type: 'tax-saving',
    category: 'ELSS',
    risk: 'high',
    returns: {
      oneYear: 21.4,
      threeYear: 17.8,
      fiveYear: 15.2
    },
    minInvestment: 500,
    expenseRatio: 1.85,
    description: 'ELSS fund offering tax benefits under Section 80C with a 3-year lock-in period.',
    tags: ['tax-saving', 'elss']
  },
  {
    id: 'aditya-1',
    companyId: 'aditya',
    name: 'Aditya Birla Sun Life Corporate Bond Fund',
    type: 'debt',
    category: 'Corporate Bond',
    risk: 'low',
    returns: {
      oneYear: 7.5,
      threeYear: 6.9,
      fiveYear: 7.3
    },
    minInvestment: 1000,
    expenseRatio: 0.55,
    description: 'Invests predominantly in AA+ and above rated corporate bonds with a focus on generating steady returns.',
    tags: ['debt', 'income']
  },
  {
    id: 'dsp-1',
    companyId: 'dsp',
    name: 'DSP Equity & Bond Fund',
    type: 'hybrid',
    category: 'Aggressive Hybrid',
    risk: 'medium',
    returns: {
      oneYear: 17.8,
      threeYear: 14.2,
      fiveYear: 12.9
    },
    minInvestment: 1000,
    expenseRatio: 1.75,
    description: 'Balanced fund with 65-80% allocation to equity and the rest to debt instruments.',
    tags: ['hybrid', 'balanced']
  }
];

// Investment strategies for different risk profiles
export const investmentStrategies: InvestmentStrategy[] = [
  {
    name: 'Conservative Income',
    description: 'Focus on capital preservation with steady income generation.',
    riskLevel: 'low',
    suitableFor: ['Retirees', 'Short-term goals (1-3 years)', 'Very risk-averse investors'],
    timeHorizon: '1-3 years',
    expectedReturns: '6-8% per annum',
    allocation: [
      { type: 'Liquid Funds', percentage: 30, description: 'For emergency funds and short-term needs' },
      { type: 'Corporate Bond Funds', percentage: 40, description: 'For regular income with minimal volatility' },
      { type: 'Government Securities', percentage: 20, description: 'For safety and inflation protection' },
      { type: 'Large Cap Equity', percentage: 10, description: 'For minimal growth exposure' }
    ],
    icon: Shield
  },
  {
    name: 'Moderate Balanced',
    description: 'Balancing growth and stability for medium-term wealth creation.',
    riskLevel: 'medium',
    suitableFor: ['Middle-aged investors', 'Medium-term goals (3-7 years)', 'Balanced risk tolerance'],
    timeHorizon: '3-7 years',
    expectedReturns: '10-12% per annum',
    allocation: [
      { type: 'Large Cap Equity', percentage: 35, description: 'Core equity allocation for stability' },
      { type: 'Mid Cap Equity', percentage: 20, description: 'For growth with moderate risk' },
      { type: 'Corporate Bonds', percentage: 25, description: 'For income generation' },
      { type: 'Gold ETFs', percentage: 10, description: 'For inflation hedging and diversification' },
      { type: 'Liquid Funds', percentage: 10, description: 'For emergency needs and flexibility' }
    ],
    icon: BarChart2
  },
  {
    name: 'Aggressive Growth',
    description: 'Maximizing growth potential for long-term wealth accumulation.',
    riskLevel: 'high',
    suitableFor: ['Young investors', 'Long-term goals (7+ years)', 'High risk tolerance'],
    timeHorizon: '7+ years',
    expectedReturns: '14-18% per annum',
    allocation: [
      { type: 'Mid Cap Equity', percentage: 30, description: 'For substantial growth potential' },
      { type: 'Small Cap Equity', percentage: 25, description: 'For maximum growth potential' },
      { type: 'Large Cap Equity', percentage: 20, description: 'For relative stability' },
      { type: 'International Equity', percentage: 15, description: 'For geographical diversification' },
      { type: 'Corporate Bonds', percentage: 10, description: 'For minimal income stabilization' }
    ],
    icon: TrendingUp
  },
  {
    name: 'Tax-Efficient Growth',
    description: 'Optimizing for tax efficiency while focusing on long-term growth.',
    riskLevel: 'medium',
    suitableFor: ['Tax-conscious investors', 'Long-term goals with tax benefits', 'Medium to high income earners'],
    timeHorizon: '3+ years',
    expectedReturns: '12-15% per annum',
    allocation: [
      { type: 'ELSS Funds', percentage: 40, description: 'For tax benefits under Section 80C with growth' },
      { type: 'Arbitrage Funds', percentage: 20, description: 'For tax-efficient returns similar to debt' },
      { type: 'Multi-Cap Equity', percentage: 25, description: 'For diversified equity exposure' },
      { type: 'Debt Funds (3+ year holding)', percentage: 15, description: 'For long-term capital gains benefits' }
    ],
    icon: LineChart
  }
];

// Get investment recommendations based on user profile
export const getInvestmentRecommendations = (
  monthlySavings: number,
  age: number = 30,
  riskTolerance: 'low' | 'medium' | 'high' = 'medium',
  investmentGoals: string[] = ['wealth-creation']
) => {
  // Filter funds based on risk tolerance
  let recommendedFunds = investmentFunds.filter(fund => fund.risk === riskTolerance);
  
  // If insufficient funds match exact risk, add some from adjacent risk categories
  if (recommendedFunds.length < 5) {
    if (riskTolerance === 'low') {
      recommendedFunds = [
        ...recommendedFunds,
        ...investmentFunds.filter(fund => fund.risk === 'medium').slice(0, 3)
      ];
    } else if (riskTolerance === 'high') {
      recommendedFunds = [
        ...recommendedFunds,
        ...investmentFunds.filter(fund => fund.risk === 'medium').slice(0, 3)
      ];
    } else {
      recommendedFunds = [
        ...recommendedFunds,
        ...investmentFunds.filter(fund => fund.risk === 'low').slice(0, 2),
        ...investmentFunds.filter(fund => fund.risk === 'high').slice(0, 2)
      ];
    }
  }
  
  // Sort by returns (prioritizing 3-year returns if available)
  recommendedFunds.sort((a, b) => {
    const aReturn = a.returns.threeYear || a.returns.oneYear || 0;
    const bReturn = b.returns.threeYear || b.returns.oneYear || 0;
    return bReturn - aReturn;
  });
  
  // Get appropriate strategy based on risk tolerance
  const recommendedStrategy = investmentStrategies.find(
    strategy => strategy.riskLevel === riskTolerance
  ) || investmentStrategies[1]; // Default to moderate if no match
  
  // Calculate suggested monthly investment amount
  const suggestedMonthlyInvestment = monthlySavings * 0.7; // 70% of savings
  
  // Generate specific allocations
  const specificAllocation = recommendedStrategy.allocation.map(item => {
    const allocation = (item.percentage / 100) * suggestedMonthlyInvestment;
    return {
      ...item,
      monthlyAmount: Math.round(allocation),
      annualAmount: Math.round(allocation * 12)
    };
  });
  
  // Add tax saving recommendations if needed
  const includesTaxSaving = investmentGoals.includes('tax-saving');
  let taxSavingRecommendation = null;
  
  if (includesTaxSaving) {
    const elssOptions = investmentFunds.filter(fund => fund.type === 'tax-saving');
    if (elssOptions.length > 0) {
      taxSavingRecommendation = {
        ...elssOptions[0],
        suggestedMonthlyInvestment: Math.min(12500, suggestedMonthlyInvestment * 0.25), // Rs. 1.5L per year max for 80C
        annualTaxSaving: Math.min(46800, 150000 * 0.312) // 31.2% tax saving on max 1.5L (assuming highest tax bracket)
      };
    }
  }
  
  return {
    recommendedFunds: recommendedFunds.slice(0, 5), // Top 5 funds
    recommendedStrategy,
    suggestedMonthlyInvestment,
    specificAllocation,
    taxSavingRecommendation,
    ageBasedAdvice: getAgeBasedAdvice(age, riskTolerance)
  };
};

// Get age-specific investment advice
const getAgeBasedAdvice = (age: number, riskTolerance: string) => {
  if (age < 30) {
    return {
      message: "You have a long investment horizon. Focus on building wealth through equity investments.",
      equitySuggestion: riskTolerance === 'low' ? 60 : riskTolerance === 'medium' ? 75 : 85,
      debtSuggestion: riskTolerance === 'low' ? 30 : riskTolerance === 'medium' ? 20 : 10,
      otherSuggestion: riskTolerance === 'low' ? 10 : riskTolerance === 'medium' ? 5 : 5
    };
  } else if (age < 45) {
    return {
      message: "Balance growth with some stability as you approach your peak earning years.",
      equitySuggestion: riskTolerance === 'low' ? 50 : riskTolerance === 'medium' ? 65 : 75,
      debtSuggestion: riskTolerance === 'low' ? 40 : riskTolerance === 'medium' ? 25 : 15,
      otherSuggestion: riskTolerance === 'low' ? 10 : riskTolerance === 'medium' ? 10 : 10
    };
  } else if (age < 60) {
    return {
      message: "Begin transitioning to more conservative investments as retirement approaches.",
      equitySuggestion: riskTolerance === 'low' ? 30 : riskTolerance === 'medium' ? 45 : 60,
      debtSuggestion: riskTolerance === 'low' ? 60 : riskTolerance === 'medium' ? 45 : 30,
      otherSuggestion: riskTolerance === 'low' ? 10 : riskTolerance === 'medium' ? 10 : 10
    };
  } else {
    return {
      message: "Focus on income generation and capital preservation in retirement.",
      equitySuggestion: riskTolerance === 'low' ? 20 : riskTolerance === 'medium' ? 30 : 40,
      debtSuggestion: riskTolerance === 'low' ? 70 : riskTolerance === 'medium' ? 60 : 50,
      otherSuggestion: riskTolerance === 'low' ? 10 : riskTolerance === 'medium' ? 10 : 10
    };
  }
};
