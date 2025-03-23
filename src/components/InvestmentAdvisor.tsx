
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from '@/hooks/useAuth';
import { useFinance } from '@/hooks/useFinance';
import { useToast } from '@/hooks/use-toast';
import { 
  getInvestmentRecommendations, 
  investmentStrategies, 
  investmentCompanies 
} from '@/utils/investmentData';
import { 
  TrendingUp, 
  ChevronRight, 
  IndianRupee, 
  Shield, 
  AlertTriangle, 
  Zap,
  LineChart,
  Info,
  CheckCircle2,
  PieChart,
  Percent,
  Clock,
  Target,
  User
} from 'lucide-react';

const InvestmentAdvisor = () => {
  const { isSignedIn } = useAuth();
  const { savings, investSavings } = useFinance();
  const { toast } = useToast();
  const [age, setAge] = useState(30);
  const [riskTolerance, setRiskTolerance] = useState<'low' | 'medium' | 'high'>('medium');
  const [investmentGoals, setInvestmentGoals] = useState<string[]>(['wealth-creation']);
  const [investmentAmount, setInvestmentAmount] = useState<number>(
    Math.min(Math.max(5000, Math.round(savings * 0.3 / 1000) * 1000), 50000)
  );
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState<any>(null);

  // Update recommended amount when savings changes
  useEffect(() => {
    setInvestmentAmount(
      Math.min(Math.max(5000, Math.round(savings * 0.3 / 1000) * 1000), 50000)
    );
  }, [savings]);

  // Generate recommendations when form is submitted
  const handleGenerateRecommendations = () => {
    const recommendations = getInvestmentRecommendations(
      investmentAmount,
      age,
      riskTolerance,
      investmentGoals
    );
    
    setRecommendations(recommendations);
    setShowResults(true);
  };

  // Handle investment
  const handleInvest = (amount: number, type: 'low' | 'medium' | 'high') => {
    if (!isSignedIn) {
      toast({
        title: "Sign in required",
        description: "Please sign in to make investments.",
        variant: "destructive"
      });
      return;
    }

    if (amount > savings) {
      toast({
        title: "Insufficient funds",
        description: "You don't have enough savings for this investment.",
        variant: "destructive"
      });
      return;
    }

    investSavings(amount, type);
    toast({
      title: "Investment successful",
      description: `You've invested ₹${amount.toLocaleString()} in a ${type} risk investment.`,
    });
  };

  // Reset the form
  const handleReset = () => {
    setShowResults(false);
    setRecommendations(null);
    setAge(30);
    setRiskTolerance('medium');
    setInvestmentGoals(['wealth-creation']);
    setInvestmentAmount(
      Math.min(Math.max(5000, Math.round(savings * 0.3 / 1000) * 1000), 50000)
    );
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Smart Investment Advisor
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get tailored investment recommendations based on your financial goals, risk tolerance, and market conditions.
          </p>
        </motion.div>

        {!showResults ? (
          <Card className="p-6 shadow-lg">
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-finance-600 mb-2">
                <User className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Your Investment Profile</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label className="mb-2 block">Your Age</Label>
                  <div className="flex items-center space-x-4">
                    <Input 
                      type="number" 
                      value={age} 
                      onChange={(e) => setAge(Number(e.target.value))}
                      min={18}
                      max={90}
                      className="w-24"
                    />
                    <div className="flex-1">
                      <Slider 
                        value={[age]} 
                        min={18} 
                        max={90} 
                        step={1}
                        onValueChange={(value) => setAge(value[0])}
                        className="mt-2"
                      />
                      <div className="flex justify-between mt-1 text-xs text-gray-500">
                        <span>18</span>
                        <span>45</span>
                        <span>65</span>
                        <span>90</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="mb-2 block">Risk Tolerance</Label>
                  <RadioGroup 
                    value={riskTolerance}
                    onValueChange={(value) => setRiskTolerance(value as 'low' | 'medium' | 'high')}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    <div className={`relative rounded-lg border p-4 flex flex-col ${
                      riskTolerance === 'low' 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-white border-gray-200 hover:bg-gray-50'
                    }`}>
                      <RadioGroupItem value="low" id="risk-low" className="sr-only" />
                      <Label htmlFor="risk-low" className="flex items-center cursor-pointer">
                        <Shield className="h-5 w-5 text-green-600 mr-2" />
                        <span className="font-medium">Conservative</span>
                      </Label>
                      <p className="mt-2 text-sm text-gray-600">
                        Prioritize safety with stable but modest returns (6-8% p.a.)
                      </p>
                    </div>

                    <div className={`relative rounded-lg border p-4 flex flex-col ${
                      riskTolerance === 'medium' 
                        ? 'bg-amber-50 border-amber-200' 
                        : 'bg-white border-gray-200 hover:bg-gray-50'
                    }`}>
                      <RadioGroupItem value="medium" id="risk-medium" className="sr-only" />
                      <Label htmlFor="risk-medium" className="flex items-center cursor-pointer">
                        <AlertTriangle className="h-5 w-5 text-amber-600 mr-2" />
                        <span className="font-medium">Moderate</span>
                      </Label>
                      <p className="mt-2 text-sm text-gray-600">
                        Balance growth and stability for medium-term (10-12% p.a.)
                      </p>
                    </div>

                    <div className={`relative rounded-lg border p-4 flex flex-col ${
                      riskTolerance === 'high' 
                        ? 'bg-red-50 border-red-200' 
                        : 'bg-white border-gray-200 hover:bg-gray-50'
                    }`}>
                      <RadioGroupItem value="high" id="risk-high" className="sr-only" />
                      <Label htmlFor="risk-high" className="flex items-center cursor-pointer">
                        <Zap className="h-5 w-5 text-red-600 mr-2" />
                        <span className="font-medium">Aggressive</span>
                      </Label>
                      <p className="mt-2 text-sm text-gray-600">
                        Maximize returns with higher volatility (14-18% p.a.)
                      </p>
                    </div>
                  </RadioGroup>
                </div>
              
                <div>
                  <Label className="mb-2 block">Investment Goals (Select all that apply)</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: 'wealth-creation', name: 'Wealth Creation', icon: <TrendingUp className="h-4 w-4" /> },
                      { id: 'tax-saving', name: 'Tax Saving', icon: <IndianRupee className="h-4 w-4" /> },
                      { id: 'retirement', name: 'Retirement', icon: <Clock className="h-4 w-4" /> },
                      { id: 'short-term', name: 'Short-term Goals', icon: <Target className="h-4 w-4" /> }
                    ].map((goal) => (
                      <div
                        key={goal.id}
                        onClick={() => {
                          if (investmentGoals.includes(goal.id)) {
                            setInvestmentGoals(investmentGoals.filter(g => g !== goal.id));
                          } else {
                            setInvestmentGoals([...investmentGoals, goal.id]);
                          }
                        }}
                        className={`flex items-center p-3 rounded-md cursor-pointer ${
                          investmentGoals.includes(goal.id)
                            ? 'bg-finance-100 border border-finance-200 text-finance-700'
                            : 'bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <div className="mr-2">{goal.icon}</div>
                        <span className="text-sm font-medium">{goal.name}</span>
                        {investmentGoals.includes(goal.id) && (
                          <CheckCircle2 className="ml-auto h-4 w-4 text-finance-600" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="mb-2 block">Monthly Investment Amount (₹)</Label>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Input 
                        type="number" 
                        value={investmentAmount} 
                        onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                        min={500}
                        step={500}
                        className="pl-10 w-36"
                      />
                    </div>
                    <div className="flex-1">
                      <Slider 
                        value={[investmentAmount]} 
                        min={500} 
                        max={Math.max(50000, savings)} 
                        step={500}
                        onValueChange={(value) => setInvestmentAmount(value[0])}
                        className="mt-2"
                      />
                      <div className="flex justify-between mt-1 text-xs text-gray-500">
                        <span>₹500</span>
                        <span>₹10,000</span>
                        <span>₹25,000</span>
                        <span>₹50,000+</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Available savings: ₹{savings.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button 
                  onClick={handleGenerateRecommendations}
                  className="bg-finance-600 hover:bg-finance-700 text-white"
                >
                  Generate Recommendations
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">
                Your Investment Recommendations
              </h3>
              <Button variant="outline" size="sm" onClick={handleReset}>
                New Analysis
              </Button>
            </div>
            
            <Card className="p-6 shadow-lg">
              <Tabs defaultValue="strategy" className="w-full">
                <TabsList className="grid grid-cols-4 mb-6">
                  <TabsTrigger value="strategy">Strategy</TabsTrigger>
                  <TabsTrigger value="allocation">Allocation</TabsTrigger>
                  <TabsTrigger value="funds">Top Funds</TabsTrigger>
                  <TabsTrigger value="companies">Companies</TabsTrigger>
                </TabsList>
                
                <TabsContent value="strategy" className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="md:w-2/3 space-y-4">
                      <div className="flex items-center">
                        <div className="p-2.5 rounded-full bg-finance-100 text-finance-700 mr-4">
                          {React.createElement(recommendations.recommendedStrategy.icon, { className: "h-6 w-6" })}
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900">
                          {recommendations.recommendedStrategy.name}
                        </h4>
                      </div>
                      
                      <p className="text-gray-700">
                        {recommendations.recommendedStrategy.description}
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div className="flex items-start space-x-3">
                          <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
                          <div>
                            <h5 className="text-sm font-medium text-gray-900">Time Horizon</h5>
                            <p className="text-sm text-gray-600">{recommendations.recommendedStrategy.timeHorizon}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <Percent className="h-5 w-5 text-gray-500 mt-0.5" />
                          <div>
                            <h5 className="text-sm font-medium text-gray-900">Expected Returns</h5>
                            <p className="text-sm text-gray-600">{recommendations.recommendedStrategy.expectedReturns}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <Target className="h-5 w-5 text-gray-500 mt-0.5" />
                          <div>
                            <h5 className="text-sm font-medium text-gray-900">Best For</h5>
                            <p className="text-sm text-gray-600">
                              {recommendations.recommendedStrategy.suitableFor.join(', ')}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <AlertTriangle className="h-5 w-5 text-gray-500 mt-0.5" />
                          <div>
                            <h5 className="text-sm font-medium text-gray-900">Risk Level</h5>
                            <p className="text-sm text-gray-600 capitalize">{recommendations.recommendedStrategy.riskLevel}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-finance-50 p-4 rounded-lg mt-2">
                        <div className="flex items-start space-x-3">
                          <User className="h-5 w-5 text-finance-600 mt-0.5" />
                          <div>
                            <h5 className="text-sm font-medium text-gray-900">Age-Based Advice</h5>
                            <p className="text-sm text-gray-600 mt-1">{recommendations.ageBasedAdvice.message}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:w-1/3 bg-gray-50 p-4 rounded-lg">
                      <h5 className="text-sm font-medium text-gray-900 mb-4">Projected Value (10 Years)</h5>
                      
                      <div className="space-y-5">
                        <div className="bg-white p-4 rounded-lg border border-gray-100">
                          <div className="text-xs text-gray-500 mb-1">Monthly Investment</div>
                          <div className="text-lg font-semibold text-gray-900">
                            ₹{recommendations.suggestedMonthlyInvestment.toLocaleString()}
                          </div>
                        </div>
                        
                        <div className="bg-white p-4 rounded-lg border border-gray-100">
                          <div className="text-xs text-gray-500 mb-1">Total Investment (10 yrs)</div>
                          <div className="text-lg font-semibold text-gray-900">
                            ₹{(recommendations.suggestedMonthlyInvestment * 12 * 10).toLocaleString()}
                          </div>
                        </div>
                        
                        <div className="bg-finance-50 p-4 rounded-lg border border-finance-100">
                          <div className="text-xs text-gray-500 mb-1">Projected Value</div>
                          <div className="text-lg font-semibold text-finance-700">
                            {(() => {
                              const monthlyAmt = recommendations.suggestedMonthlyInvestment;
                              const years = 10;
                              let returnRate = 0;
                              
                              switch(riskTolerance) {
                                case 'low': returnRate = 0.07; break;
                                case 'medium': returnRate = 0.11; break;
                                case 'high': returnRate = 0.15; break;
                              }
                              
                              // Simple compound interest formula for regular investments
                              const months = years * 12;
                              const monthlyRate = returnRate / 12;
                              const futureValue = monthlyAmt * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
                              
                              return `₹${Math.round(futureValue).toLocaleString()}`;
                            })()}
                          </div>
                          <div className="text-xs text-finance-600 mt-1">
                            Assuming {riskTolerance === 'low' ? '7%' : riskTolerance === 'medium' ? '11%' : '15%'} annualized returns
                          </div>
                        </div>
                        
                        <Button 
                          className="w-full bg-finance-600 hover:bg-finance-700 text-white mt-2"
                          onClick={() => handleInvest(
                            recommendations.suggestedMonthlyInvestment,
                            riskTolerance
                          )}
                        >
                          Invest Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="allocation" className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-2/3 space-y-5">
                      <h4 className="text-lg font-semibold text-gray-900">
                        Recommended Monthly Allocation
                      </h4>
                      
                      <div className="space-y-4">
                        {recommendations.specificAllocation.map((item: any, index: number) => (
                          <div key={index}>
                            <div className="flex justify-between items-center mb-1">
                              <div className="flex items-center">
                                <span className="text-sm font-medium text-gray-900">{item.type}</span>
                                <div className="ml-2 px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-600">
                                  {item.percentage}%
                                </div>
                              </div>
                              <span className="text-sm font-medium text-gray-900">
                                ₹{item.monthlyAmount.toLocaleString()}
                              </span>
                            </div>
                            <div className="relative pt-1">
                              <div className="flex mb-1">
                                <div className="text-xs text-gray-500">{item.description}</div>
                                <div className="ml-auto text-xs text-gray-500">
                                  ₹{item.annualAmount.toLocaleString()}/year
                                </div>
                              </div>
                              <Progress value={item.percentage} className="h-2" />
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {recommendations.taxSavingRecommendation && (
                        <div className="bg-finance-50 p-4 rounded-lg mt-4 border border-finance-100">
                          <h5 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                            <IndianRupee className="mr-1.5 h-4 w-4 text-finance-700" />
                            Tax-Saving Recommendation
                          </h5>
                          <p className="text-sm text-gray-600 mb-3">
                            Consider investing in {recommendations.taxSavingRecommendation.name} (ELSS) to save taxes under Section 80C.
                          </p>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <div className="text-xs text-gray-500">Suggested Monthly</div>
                              <div className="font-medium">
                                ₹{Math.round(recommendations.taxSavingRecommendation.suggestedMonthlyInvestment).toLocaleString()}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500">Annual Tax Saving</div>
                              <div className="font-medium text-finance-700">
                                ₹{Math.round(recommendations.taxSavingRecommendation.annualTaxSaving).toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="md:w-1/3">
                      <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                        <h5 className="text-sm font-medium text-gray-900 mb-4">Asset Allocation Visualization</h5>
                        
                        <div className="aspect-square relative rounded-full overflow-hidden mb-4">
                          {recommendations.specificAllocation.map((item: any, i: number) => {
                            const colors = [
                              'bg-finance-600', 'bg-finance-400', 'bg-amber-400', 
                              'bg-red-400', 'bg-blue-400', 'bg-green-400'
                            ];
                            const previousPercentages = recommendations.specificAllocation
                              .slice(0, i)
                              .reduce((sum: number, curr: any) => sum + curr.percentage, 0);
                            
                            return (
                              <div 
                                key={i}
                                className={`absolute inset-0 ${colors[i % colors.length]}`}
                                style={{ 
                                  clipPath: `polygon(0 0, 100% 0, 100% 100%, 0% 100%)`,
                                  opacity: 1,
                                  backgroundColor: 'transparent',
                                  background: `conic-gradient(transparent ${previousPercentages}%, currentColor ${previousPercentages}%, currentColor ${previousPercentages + item.percentage}%, transparent ${previousPercentages + item.percentage}%)`
                                }}
                              />
                            );
                          })}
                          <div className="absolute inset-0 rounded-full m-[15%] bg-white shadow-inner flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-xs text-gray-500">Total</div>
                              <div className="text-lg font-semibold text-gray-900">
                                ₹{recommendations.suggestedMonthlyInvestment.toLocaleString()}
                              </div>
                              <div className="text-xs text-gray-500">per month</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-1 mt-4">
                          {recommendations.specificAllocation.map((item: any, i: number) => {
                            const colors = [
                              'bg-finance-600', 'bg-finance-400', 'bg-amber-400', 
                              'bg-red-400', 'bg-blue-400', 'bg-green-400'
                            ];
                            
                            return (
                              <div key={i} className="flex items-center text-xs">
                                <div className={`w-3 h-3 rounded-sm mr-2 ${colors[i % colors.length]}`}></div>
                                <span className="text-gray-600">{item.type}</span>
                                <span className="ml-auto font-medium">{item.percentage}%</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="funds" className="space-y-6">
                  <div className="space-y-5">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Top Recommended Funds
                    </h4>
                    
                    <div className="grid grid-cols-1 gap-4">
                      {recommendations.recommendedFunds.map((fund: any, index: number) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="space-y-2">
                              <div>
                                <h5 className="text-base font-medium text-gray-900">{fund.name}</h5>
                                <div className="flex items-center mt-1 space-x-3">
                                  <span className="text-xs font-medium text-gray-500">
                                    {investmentCompanies.find(c => c.id === fund.companyId)?.name}
                                  </span>
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                    {fund.category}
                                  </span>
                                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                    fund.risk === 'low' 
                                      ? 'bg-green-100 text-green-800' 
                                      : fund.risk === 'medium'
                                        ? 'bg-amber-100 text-amber-800'
                                        : 'bg-red-100 text-red-800'
                                  }`}>
                                    {fund.risk === 'low' 
                                      ? <Shield className="mr-1 h-3 w-3" /> 
                                      : fund.risk === 'medium'
                                        ? <AlertTriangle className="mr-1 h-3 w-3" />
                                        : <Zap className="mr-1 h-3 w-3" />
                                    }
                                    {fund.risk.charAt(0).toUpperCase() + fund.risk.slice(1)} Risk
                                  </span>
                                </div>
                              </div>
                              
                              <p className="text-sm text-gray-600">
                                {fund.description}
                              </p>
                              
                              <div className="flex flex-wrap gap-4 mt-2">
                                <div>
                                  <div className="text-xs text-gray-500">Min. Investment</div>
                                  <div className="text-sm font-medium">₹{fund.minInvestment.toLocaleString()}</div>
                                </div>
                                <div>
                                  <div className="text-xs text-gray-500">Expense Ratio</div>
                                  <div className="text-sm font-medium">{fund.expenseRatio}%</div>
                                </div>
                                {fund.returns.oneYear && (
                                  <div>
                                    <div className="text-xs text-gray-500">1 Year Return</div>
                                    <div className="text-sm font-medium text-finance-700">{fund.returns.oneYear}%</div>
                                  </div>
                                )}
                                {fund.returns.threeYear && (
                                  <div>
                                    <div className="text-xs text-gray-500">3 Year Return</div>
                                    <div className="text-sm font-medium text-finance-700">{fund.returns.threeYear}%</div>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex md:flex-col items-center gap-3 md:min-w-[120px]">
                              <Button 
                                size="sm" 
                                className="bg-finance-600 hover:bg-finance-700 text-white"
                                onClick={() => handleInvest(fund.minInvestment, fund.risk)}
                              >
                                Invest Now
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-xs"
                                onClick={() => {
                                  const company = investmentCompanies.find(c => c.id === fund.companyId);
                                  window.open(company?.website, '_blank');
                                }}
                              >
                                Learn More
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="companies" className="space-y-6">
                  <div className="space-y-5">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Top Investment Companies in India
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {investmentCompanies.slice(0, 8).map((company) => (
                        <div key={company.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex justify-between">
                            <div>
                              <h5 className="text-base font-medium text-gray-900">{company.name}</h5>
                              <p className="text-sm text-gray-600 mt-1">
                                {company.description}
                              </p>
                              
                              <div className="flex flex-wrap gap-2 mt-3">
                                {company.fundTypes.map((type, i) => (
                                  <span 
                                    key={i} 
                                    className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                                  >
                                    {type}
                                  </span>
                                ))}
                              </div>
                              
                              <div className="flex gap-4 mt-3">
                                <div>
                                  <div className="text-xs text-gray-500">Min. Investment</div>
                                  <div className="text-sm font-medium">₹{company.minInvestment}</div>
                                </div>
                                {company.established && (
                                  <div>
                                    <div className="text-xs text-gray-500">Established</div>
                                    <div className="text-sm font-medium">{company.established}</div>
                                  </div>
                                )}
                                {company.aum && (
                                  <div>
                                    <div className="text-xs text-gray-500">AUM</div>
                                    <div className="text-sm font-medium">₹{company.aum} Cr</div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4 pt-3 border-t border-gray-100">
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="text-xs"
                              onClick={() => window.open(company.website, '_blank')}
                            >
                              Visit Website
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestmentAdvisor;
