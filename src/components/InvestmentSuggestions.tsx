import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  ChevronRight, 
  BarChart, 
  Shield, 
  AlertTriangle, 
  Zap,
  LineChart,
  Info,
  CheckCircle2
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useFinance } from '@/hooks/useFinance';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const riskDescriptions = {
  low: {
    title: "Low Risk",
    description: "These investments typically offer lower returns but higher security. They're suitable for short-term goals and investors with low risk tolerance.",
    features: [
      "Capital preservation is the primary goal",
      "Minimal fluctuations in value",
      "Often backed by government guarantees",
      "Better protection against market downturns",
      "Lower returns compared to higher-risk options"
    ],
    examples: [
      "Bank Fixed Deposits",
      "Public Provident Fund (PPF)",
      "Government bonds",
      "Liquid funds"
    ],
    timeframe: "1-3 years"
  },
  medium: {
    title: "Medium Risk",
    description: "Balanced investments that offer moderate growth potential with manageable risk. Good for medium-term goals and diversified portfolios.",
    features: [
      "Balance between growth and income",
      "Moderate price fluctuations",
      "Diversification across asset classes",
      "Some vulnerability to market cycles",
      "Potential for dividend income"
    ],
    examples: [
      "Blue-chip stocks",
      "Corporate bonds",
      "Balanced mutual funds",
      "Nifty 50 index funds"
    ],
    timeframe: "3-7 years"
  },
  high: {
    title: "High Risk",
    description: "These investments offer the highest growth potential but come with significant volatility. Best for long-term goals and investors who can tolerate substantial market fluctuations.",
    features: [
      "Growth is the primary objective",
      "Substantial price volatility",
      "Higher potential for significant gains",
      "Higher potential for significant losses",
      "Requires longer time horizon to manage volatility"
    ],
    examples: [
      "Small-cap stocks",
      "Sector-specific funds",
      "International equity funds",
      "Thematic funds"
    ],
    timeframe: "7+ years"
  }
};

const RiskIndicator = ({ level }: { level: 'low' | 'medium' | 'high' }) => {
  const icon = () => {
    switch (level) {
      case 'low':
        return <Shield className="h-4 w-4" />;
      case 'medium':
        return <AlertTriangle className="h-4 w-4" />;
      case 'high':
        return <Zap className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const color = () => {
    switch (level) {
      case 'low':
        return 'text-green-600 bg-green-50';
      case 'medium':
        return 'text-amber-600 bg-amber-50';
      case 'high':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full ${color()}`}>
      {icon()}
      <span className="text-xs font-medium capitalize">{level} Risk</span>
    </div>
  );
};

const InvestmentSuggestions = () => {
  const { savings, getSuggestedInvestments, investSavings } = useFinance();
  const { isSignedIn } = useAuth();
  const { toast } = useToast();
  const suggestedInvestments = getSuggestedInvestments();
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [investmentAmount, setInvestmentAmount] = useState<number>(500);
  const [isRiskInfoOpen, setIsRiskInfoOpen] = useState(false);
  const [isInvestOpen, setIsInvestOpen] = useState(false);

  const handleInvest = () => {
    if (!isSignedIn) {
      toast({
        title: "Sign in required",
        description: "Please sign in to make investments.",
        variant: "destructive"
      });
      return;
    }

    if (investmentAmount > savings) {
      toast({
        title: "Insufficient funds",
        description: "You don't have enough savings for this investment.",
        variant: "destructive"
      });
      return;
    }

    investSavings(investmentAmount, selectedRiskLevel);
    setIsInvestOpen(false);
  };

  return (
    <section id="investments" className="section-padding bg-finance-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Smart Investment Suggestions</h2>
            <p className="text-lg text-gray-600">
              Personalized investment recommendations based on your financial profile and goals
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-on-scroll">
            <div className="lg:col-span-2 space-y-8">
              <Card className="shadow-card overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Top Investment Recommendations
                    </h3>
                    <div className="flex space-x-2">
                      <Dialog open={isRiskInfoOpen} onOpenChange={setIsRiskInfoOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="text-xs">
                            <Info className="mr-1.5 h-3.5 w-3.5" />
                            Understanding Risk
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Understanding Investment Risk</DialogTitle>
                            <DialogDescription>
                              Each investment carries different levels of risk and potential returns. Here's what you need to know.
                            </DialogDescription>
                          </DialogHeader>
                          <Tabs defaultValue="low">
                            <TabsList className="grid w-full grid-cols-3">
                              <TabsTrigger value="low">Low Risk</TabsTrigger>
                              <TabsTrigger value="medium">Medium Risk</TabsTrigger>
                              <TabsTrigger value="high">High Risk</TabsTrigger>
                            </TabsList>
                            {['low', 'medium', 'high'].map((risk) => (
                              <TabsContent key={risk} value={risk} className="space-y-4 mt-4">
                                <div className="space-y-2">
                                  <h4 className="text-lg font-semibold">{riskDescriptions[risk as keyof typeof riskDescriptions].title}</h4>
                                  <p className="text-gray-600">{riskDescriptions[risk as keyof typeof riskDescriptions].description}</p>
                                </div>
                                
                                <div className="grid md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <h5 className="text-sm font-semibold">Key Features</h5>
                                    <ul className="space-y-1">
                                      {riskDescriptions[risk as keyof typeof riskDescriptions].features.map((feature, index) => (
                                        <li key={index} className="text-sm text-gray-600 flex items-start">
                                          <CheckCircle2 className="h-4 w-4 text-finance-600 mr-2 mt-0.5 flex-shrink-0" />
                                          {feature}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <h5 className="text-sm font-semibold">Examples</h5>
                                    <ul className="space-y-1">
                                      {riskDescriptions[risk as keyof typeof riskDescriptions].examples.map((example, index) => (
                                        <li key={index} className="text-sm text-gray-600 flex items-start">
                                          <ChevronRight className="h-4 w-4 text-finance-600 mr-2 mt-0.5 flex-shrink-0" />
                                          {example}
                                        </li>
                                      ))}
                                    </ul>
                                    
                                    <div className="mt-4 pt-2 border-t border-gray-100">
                                      <h5 className="text-sm font-semibold">Recommended Time Horizon</h5>
                                      <p className="text-sm text-gray-600">{riskDescriptions[risk as keyof typeof riskDescriptions].timeframe}</p>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="bg-finance-50 p-4 rounded-lg mt-4">
                                  <h5 className="text-sm font-semibold mb-2">Risk vs. Return Potential</h5>
                                  <div className="space-y-3">
                                    <div>
                                      <div className="flex justify-between mb-1">
                                        <span className="text-xs text-gray-500">Risk Level</span>
                                        <span className="text-xs font-medium">
                                          {risk === 'low' ? '25%' : risk === 'medium' ? '60%' : '90%'}
                                        </span>
                                      </div>
                                      <Progress 
                                        value={risk === 'low' ? 25 : risk === 'medium' ? 60 : 90} 
                                        className="h-1.5"
                                      />
                                    </div>
                                    <div>
                                      <div className="flex justify-between mb-1">
                                        <span className="text-xs text-gray-500">Return Potential</span>
                                        <span className="text-xs font-medium">
                                          {risk === 'low' ? '30%' : risk === 'medium' ? '65%' : '95%'}
                                        </span>
                                      </div>
                                      <Progress 
                                        value={risk === 'low' ? 30 : risk === 'medium' ? 65 : 95} 
                                        className="h-1.5"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </TabsContent>
                            ))}
                          </Tabs>
                        </DialogContent>
                      </Dialog>
                      
                      <Dialog open={isInvestOpen} onOpenChange={setIsInvestOpen}>
                        <DialogTrigger asChild>
                          <Button size="sm" className="text-xs bg-finance-600 hover:bg-finance-700 text-white">
                            <TrendingUp className="mr-1.5 h-3.5 w-3.5" />
                            Invest Now
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Make an Investment</DialogTitle>
                            <DialogDescription>
                              Choose the risk level and amount you want to invest.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label>Risk Level</Label>
                              <div className="flex flex-wrap gap-2">
                                {['low', 'medium', 'high'].map((risk) => (
                                  <button
                                    key={risk}
                                    type="button"
                                    onClick={() => setSelectedRiskLevel(risk as 'low' | 'medium' | 'high')}
                                    className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm ${
                                      selectedRiskLevel === risk
                                        ? 'bg-finance-100 text-finance-700 border border-finance-200'
                                        : 'bg-gray-50 text-gray-700 border border-gray-100 hover:bg-gray-100'
                                    }`}
                                  >
                                    {risk === 'low' ? (
                                      <Shield className="h-4 w-4 mr-1.5" />
                                    ) : risk === 'medium' ? (
                                      <AlertTriangle className="h-4 w-4 mr-1.5" />
                                    ) : (
                                      <Zap className="h-4 w-4 mr-1.5" />
                                    )}
                                    <span className="capitalize">{risk}</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div className="grid gap-2">
                              <Label>Investment Amount (₹)</Label>
                              <Input
                                type="number"
                                value={investmentAmount}
                                onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                                min="500"
                                step="500"
                              />
                              <p className="text-xs text-gray-500">
                                Available savings: ₹{savings.toLocaleString()}
                              </p>
                            </div>
                            
                            <div className="bg-finance-50 p-3 rounded-md mt-2">
                              <h4 className="text-sm font-medium mb-2">Potential Returns (Annual)</h4>
                              <div className="grid grid-cols-3 gap-2 text-center">
                                <div className="bg-white p-2 rounded border border-gray-100">
                                  <div className="text-xs text-gray-500">Conservative</div>
                                  <div className="font-medium">₹{(investmentAmount * 0.06).toFixed(0)}</div>
                                  <div className="text-xs text-gray-500">6%</div>
                                </div>
                                <div className="bg-white p-2 rounded border border-finance-100">
                                  <div className="text-xs text-gray-500">Average</div>
                                  <div className="font-medium text-finance-700">₹{(investmentAmount * (
                                    selectedRiskLevel === 'low' ? 0.07 : 
                                    selectedRiskLevel === 'medium' ? 0.11 : 0.16
                                  )).toFixed(0)}</div>
                                  <div className="text-xs text-gray-500">
                                    {selectedRiskLevel === 'low' ? '7%' : 
                                     selectedRiskLevel === 'medium' ? '11%' : '16%'}
                                  </div>
                                </div>
                                <div className="bg-white p-2 rounded border border-gray-100">
                                  <div className="text-xs text-gray-500">Optimistic</div>
                                  <div className="font-medium">₹{(investmentAmount * (
                                    selectedRiskLevel === 'low' ? 0.08 : 
                                    selectedRiskLevel === 'medium' ? 0.13 : 0.20
                                  )).toFixed(0)}</div>
                                  <div className="text-xs text-gray-500">
                                    {selectedRiskLevel === 'low' ? '8%' : 
                                     selectedRiskLevel === 'medium' ? '13%' : '20%'}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="button" onClick={handleInvest}>
                              Confirm Investment
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-gray-100">
                  {suggestedInvestments.map((investment, index) => (
                    <div key={index} className="p-5 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start">
                          <div className="mr-4 p-3 bg-finance-50 text-finance-600 rounded-full">
                            <BarChart className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="flex items-center mb-1">
                              <h4 className="text-base font-medium text-gray-900 mr-2">{investment.name}</h4>
                              <RiskIndicator level={investment.risk as 'low' | 'medium' | 'high'} />
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              {investment.description}
                            </p>
                            <div className="flex items-center space-x-6">
                              <div className="flex items-center">
                                <TrendingUp className="h-4 w-4 text-finance-600 mr-1.5" />
                                <span className="text-sm font-medium">Returns: {investment.returnRate}</span>
                              </div>
                              <div className="flex items-center">
                                <LineChart className="h-4 w-4 text-gray-500 mr-1.5" />
                                <span className="text-sm text-gray-500">Min: ₹{investment.minAmount}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="ml-auto">
                          <Button 
                            className="bg-finance-600 hover:bg-finance-700 text-white"
                            onClick={() => {
                              setSelectedRiskLevel(investment.risk as 'low' | 'medium' | 'high');
                              setInvestmentAmount(investment.minAmount);
                              setIsInvestOpen(true);
                            }}
                          >
                            Invest
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="p-6 shadow-card">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Investment Profile</h3>
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-500">Risk Tolerance</span>
                      <span className="text-sm font-medium text-gray-700">Medium</span>
                    </div>
                    <div className="relative">
                      <Progress value={60} className="h-2" />
                      <div className="absolute -top-1 left-1/4 h-4 w-px bg-gray-300"></div>
                      <div className="absolute -top-1 left-1/2 h-4 w-px bg-gray-300"></div>
                      <div className="absolute -top-1 left-3/4 h-4 w-px bg-gray-300"></div>
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>Low</span>
                        <span className="ml-auto">High</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-500">Investment Horizon</span>
                      <span className="text-sm font-medium text-gray-700">5-10 years</span>
                    </div>
                    <div className="relative">
                      <Progress value={75} className="h-2" />
                      <div className="absolute -top-1 left-1/4 h-4 w-px bg-gray-300"></div>
                      <div className="absolute -top-1 left-1/2 h-4 w-px bg-gray-300"></div>
                      <div className="absolute -top-1 left-3/4 h-4 w-px bg-gray-300"></div>
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>Short</span>
                        <span className="ml-auto">Long</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-500">Financial Knowledge</span>
                      <span className="text-sm font-medium text-gray-700">Intermediate</span>
                    </div>
                    <div className="relative">
                      <Progress value={65} className="h-2" />
                      <div className="absolute -top-1 left-1/4 h-4 w-px bg-gray-300"></div>
                      <div className="absolute -top-1 left-1/2 h-4 w-px bg-gray-300"></div>
                      <div className="absolute -top-1 left-3/4 h-4 w-px bg-gray-300"></div>
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>Basic</span>
                        <span className="ml-auto">Expert</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-gray-100">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Suggested Asset Allocation</h4>
                  <div className="space-y-3">
                    <AssetAllocationItem
                      name="Equity"
                      percentage={50}
                      color="bg-finance-600"
                    />
                    <AssetAllocationItem
                      name="Debt"
                      percentage={30}
                      color="bg-finance-400"
                    />
                    <AssetAllocationItem
                      name="Gold"
                      percentage={10}
                      color="bg-amber-400"
                    />
                    <AssetAllocationItem
                      name="Cash"
                      percentage={10}
                      color="bg-gray-300"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setIsRiskInfoOpen(true)}
                  >
                    Update Investment Profile
                  </Button>
                </div>
              </Card>

              <Card className="p-6 shadow-card">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Market Insights</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-finance-600 pl-3 py-1">
                    <h4 className="text-sm font-medium">Nifty Performance</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      Nifty 50 has shown strong positive momentum in the latest quarter.
                    </p>
                  </div>
                  <div className="border-l-4 border-amber-400 pl-3 py-1">
                    <h4 className="text-sm font-medium">RBI Policy</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      Reserve Bank of India signals potential rate changes in the coming months.
                    </p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-3 py-1">
                    <h4 className="text-sm font-medium">ESG Trends</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      Sustainable investments are gaining traction in the Indian market.
                    </p>
                  </div>
                </div>
                <Button
                  variant="link"
                  className="mt-2 text-sm text-finance-600 p-0"
                >
                  View All Insights <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Card>
            </div>
          </div>

          <div className="relative animate-on-scroll">
            <div className="absolute inset-0 bg-gradient-to-r from-finance-600 to-finance-700 rounded-xl opacity-15 bg-investment-pattern bg-investment-pattern"></div>
            <div className="relative p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Ready to grow your wealth?</h2>
                  <p className="text-gray-600">
                    Our personalized investment strategies are designed to match your financial goals and risk tolerance.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-2">
                    <Button 
                      size="lg" 
                      className="bg-finance-600 hover:bg-finance-700 text-white"
                      onClick={() => setIsInvestOpen(true)}
                    >
                      Start Investing <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      onClick={() => setIsRiskInfoOpen(true)}
                    >
                      Learn About Risk
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4 shadow-glass">
                    <div className="flex flex-col items-center text-center">
                      <div className="rounded-full p-3 bg-green-50 text-green-600 mb-3">
                        <Shield className="h-5 w-5" />
                      </div>
                      <h3 className="text-sm font-medium text-gray-900">Safe Options</h3>
                      <p className="text-xs text-gray-500 mt-1">
                        FDs and PPF with stable returns
                      </p>
                    </div>
                  </Card>
                  <Card className="p-4 shadow-glass">
                    <div className="flex flex-col items-center text-center">
                      <div className="rounded-full p-3 bg-amber-50 text-amber-600 mb-3">
                        <BarChart className="h-5 w-5" />
                      </div>
                      <h3 className="text-sm font-medium text-gray-900">Balanced Growth</h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Mix of equity and debt
                      </p>
                    </div>
                  </Card>
                  <Card className="p-4 shadow-glass">
                    <div className="flex flex-col items-center text-center">
                      <div className="rounded-full p-3 bg-blue-50 text-blue-600 mb-3">
                        <LineChart className="h-5 w-5" />
                      </div>
                      <h3 className="text-sm font-medium text-gray-900">Index Tracking</h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Follow Nifty and Sensex
                      </p>
                    </div>
                  </Card>
                  <Card className="p-4 shadow-glass">
                    <div className="flex flex-col items-center text-center">
                      <div className="rounded-full p-3 bg-red-50 text-red-600 mb-3">
                        <Zap className="h-5 w-5" />
                      </div>
                      <h3 className="text-sm font-medium text-gray-900">High Growth</h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Mid and small cap equity
                      </p>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const AssetAllocationItem = ({ 
  name, 
  percentage, 
  color 
}: { 
  name: string; 
  percentage: number; 
  color: string;
}) => {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-700">{name}</span>
        <span className="text-sm font-medium text-gray-900">{percentage}%</span>
      </div>
      <Progress value={percentage} className={`h-1.5 ${color}`} />
    </div>
  );
};

export default InvestmentSuggestions;
