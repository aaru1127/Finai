import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  CreditCard, 
  PlusCircle, 
  ShoppingCart, 
  Home, 
  Car, 
  Utensils, 
  Film, 
  Wifi, 
  Bookmark,
  Settings,
  Plus,
  Minus,
  DollarSign
} from 'lucide-react';
import { useFinance } from '@/hooks/useFinance';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const iconMap: Record<string, React.ReactNode> = {
  Home: <Home className="h-5 w-5" />,
  Utensils: <Utensils className="h-5 w-5" />,
  Car: <Car className="h-5 w-5" />,
  Film: <Film className="h-5 w-5" />,
  ShoppingCart: <ShoppingCart className="h-5 w-5" />,
  Wifi: <Wifi className="h-5 w-5" />,
};

const BudgetTracker = () => {
  const [activeTab, setActiveTab] = useState('current');
  const { categories, savings, income, addExpense, updateCategoryLimit, getSavingsRate } = useFinance();
  const { toast } = useToast();
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [isAdjustBudgetOpen, setIsAdjustBudgetOpen] = useState(false);
  const [newExpense, setNewExpense] = useState({
    category: '',
    amount: 0,
    description: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [budgetAdjustment, setBudgetAdjustment] = useState({
    category: '',
    limit: 0
  });

  const totalSpent = categories.reduce((sum, category) => sum + category.amount, 0);
  const totalBudget = categories.reduce((sum, category) => sum + category.limit, 0);
  const remaining = totalBudget - totalSpent;
  const budgetUsedPercentage = (totalSpent / totalBudget) * 100;
  const savingsRate = getSavingsRate();

  const handleExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newExpense.category && newExpense.amount > 0) {
      addExpense({
        category: newExpense.category,
        amount: newExpense.amount,
        description: newExpense.description,
        date: newExpense.date
      });
      setNewExpense({
        category: '',
        amount: 0,
        description: '',
        date: new Date().toISOString().split('T')[0]
      });
      setIsAddExpenseOpen(false);
    }
  };

  const handleBudgetAdjustment = (e: React.FormEvent) => {
    e.preventDefault();
    if (budgetAdjustment.category && budgetAdjustment.limit > 0) {
      updateCategoryLimit(budgetAdjustment.category, budgetAdjustment.limit);
      setBudgetAdjustment({
        category: '',
        limit: 0
      });
      setIsAdjustBudgetOpen(false);
    }
  };

  return (
    <section id="budget" className="section-padding bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Smart Budget Tracker</h2>
            <p className="text-lg text-gray-600">
              Your personalized budget plan adapts to your spending habits and financial goals
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-on-scroll">
            <div className="col-span-1">
              <Card className="p-6 shadow-card h-full">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Monthly Overview</h3>
                    <p className="text-sm text-gray-500">{new Date().toLocaleString('default', { month: 'long' })} {new Date().getFullYear()}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-500">Total Budget</span>
                      <span className="text-sm font-bold text-gray-900">₹{totalBudget.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-500">Total Spent</span>
                      <span className="text-sm font-bold text-finance-600">₹{totalSpent.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-500">Remaining</span>
                      <span className="text-sm font-bold text-green-600">₹{remaining.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-gray-500">Budget used</span>
                      <span className="text-xs font-medium text-gray-900">{budgetUsedPercentage.toFixed(1)}%</span>
                    </div>
                    <Progress value={budgetUsedPercentage} className="h-2" />
                  </div>

                  <div className="pt-4 space-y-2">
                    <h4 className="text-sm font-semibold text-gray-900">Budget Health</h4>
                    {savingsRate > 15 ? (
                      <div className="p-3 bg-green-50 border border-green-100 rounded-lg">
                        <p className="text-sm text-green-700">
                          You're saving {savingsRate.toFixed(1)}% of your income. Great job!
                        </p>
                      </div>
                    ) : savingsRate > 5 ? (
                      <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
                        <p className="text-sm text-amber-700">
                          You're saving {savingsRate.toFixed(1)}% of your income. Try to increase your savings rate.
                        </p>
                      </div>
                    ) : (
                      <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                        <p className="text-sm text-red-700">
                          You're only saving {savingsRate.toFixed(1)}% of your income. Consider reducing expenses.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <Dialog open={isAdjustBudgetOpen} onOpenChange={setIsAdjustBudgetOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="flex-1 text-xs">
                          <Settings className="mr-1 h-3.5 w-3.5" /> Adjust Budget
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Adjust Budget Limits</DialogTitle>
                          <DialogDescription>
                            Set new budget limits for your spending categories.
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleBudgetAdjustment}>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="category">Category</Label>
                              <Select 
                                onValueChange={(value) => setBudgetAdjustment({...budgetAdjustment, category: value})}
                                value={budgetAdjustment.category}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                  {categories.map((category) => (
                                    <SelectItem key={category.name} value={category.name}>
                                      {category.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="limit">New Budget Limit (₹)</Label>
                              <Input
                                id="limit"
                                type="number"
                                value={budgetAdjustment.limit || ''}
                                onChange={(e) => setBudgetAdjustment({...budgetAdjustment, limit: parseFloat(e.target.value)})}
                                min="0"
                                step="100"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit">Save Changes</Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>

                    <Dialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm" className="flex-1 text-xs bg-finance-600 hover:bg-finance-700 text-white">
                          <PlusCircle className="mr-1 h-3.5 w-3.5" /> Add Expense
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New Expense</DialogTitle>
                          <DialogDescription>
                            Record a new expense to track your spending.
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleExpenseSubmit}>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="category">Category</Label>
                              <Select 
                                onValueChange={(value) => setNewExpense({...newExpense, category: value})}
                                value={newExpense.category}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                  {categories.map((category) => (
                                    <SelectItem key={category.name} value={category.name}>
                                      {category.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="amount">Amount (₹)</Label>
                              <Input
                                id="amount"
                                type="number"
                                value={newExpense.amount || ''}
                                onChange={(e) => setNewExpense({...newExpense, amount: parseFloat(e.target.value)})}
                                min="0"
                                step="10"
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="description">Description</Label>
                              <Input
                                id="description"
                                value={newExpense.description}
                                onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                                placeholder="What was this expense for?"
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="date">Date</Label>
                              <Input
                                id="date"
                                type="date"
                                value={newExpense.date}
                                onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit">Add Expense</Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </Card>
            </div>

            <div className="col-span-1 lg:col-span-2">
              <Card className="shadow-card h-full">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-gray-900">Budget by Category</h3>
                    <div className="flex bg-gray-100 rounded-md p-0.5">
                      <button
                        onClick={() => setActiveTab('current')}
                        className={`px-3 py-1 text-xs font-medium rounded ${
                          activeTab === 'current'
                            ? 'bg-white shadow-sm text-gray-900'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        Current
                      </button>
                      <button
                        onClick={() => setActiveTab('history')}
                        className={`px-3 py-1 text-xs font-medium rounded ${
                          activeTab === 'history'
                            ? 'bg-white shadow-sm text-gray-900'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        History
                      </button>
                      <button
                        onClick={() => setActiveTab('planning')}
                        className={`px-3 py-1 text-xs font-medium rounded ${
                          activeTab === 'planning'
                            ? 'bg-white shadow-sm text-gray-900'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        Planning
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-6">
                    {categories.map((category, index) => (
                      <BudgetCategoryItem key={index} category={category} />
                    ))}

                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="flex items-center justify-center w-full py-3 border border-dashed border-gray-200 rounded-lg text-gray-500 hover:text-finance-600 hover:border-finance-200 transition-colors">
                          <Plus className="h-4 w-4 mr-2" />
                          <span className="text-sm font-medium">Add New Category</span>
                        </button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Category Feature</DialogTitle>
                          <DialogDescription>
                            Custom category creation is coming soon. For now, you can use the existing categories.
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-on-scroll">
            <SmartTipCard
              title="Reduce Restaurant Spending"
              description="Eating out less could save you approximately ₹2,000 this month based on your current habits."
              action="See Details"
              color="text-amber-600"
              bgColor="bg-amber-50"
              icon={<Utensils className="h-5 w-5" />}
            />
            <SmartTipCard
              title="Subscription Savings"
              description="You have 3 unused subscriptions costing ₹599/month. Consider cancelling them."
              action="Review Subs"
              color="text-red-600"
              bgColor="bg-red-50"
              icon={<Bookmark className="h-5 w-5" />}
            />
            <SmartTipCard
              title="Save on Groceries"
              description="Shopping at local markets could save you up to 15% on your monthly grocery bill."
              action="Learn How"
              color="text-green-600"
              bgColor="bg-green-50"
              icon={<ShoppingCart className="h-5 w-5" />}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const BudgetCategoryItem = ({ category }: { category: any }) => {
  const { addToCategory } = useFinance();
  const { toast } = useToast();
  const [expenseAmount, setExpenseAmount] = useState<number>(10);
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  const handleAddExpense = () => {
    if (expenseAmount > 0) {
      addToCategory(category.name, expenseAmount);
      toast({
        title: "Quick Expense Added",
        description: `Added ₹${expenseAmount} to ${category.name}.`
      });
      setExpenseAmount(10);
      setShowQuickAdd(false);
    }
  };

  return (
    <motion.div 
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="p-4 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div className={`rounded-full p-2 mr-3 ${category.color} bg-opacity-10`}>
            <div className={`text-white ${category.color}`}>
              {iconMap[category.icon]}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900">{category.name}</h4>
            <p className="text-xs text-gray-500">
              ₹{category.amount.toLocaleString()} of ₹{category.limit.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex space-x-1">
          <button 
            className="p-1 text-gray-400 hover:text-finance-600 rounded-full hover:bg-finance-50 transition-colors"
            onClick={() => setShowQuickAdd(!showQuickAdd)}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {showQuickAdd && (
        <div className="mb-3 p-2 bg-gray-50 rounded-md flex items-center space-x-2">
          <DollarSign className="h-4 w-4 text-gray-400" />
          <Input
            type="number"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(Number(e.target.value))}
            className="h-7 text-sm w-20"
            min="0"
            step="100"
          />
          <Button size="sm" className="h-7 text-xs" onClick={handleAddExpense}>Add</Button>
        </div>
      )}
      
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">{category.percentage.toFixed(1)}%</span>
          <span className="text-xs text-gray-500">
            ₹{(category.limit - category.amount).toLocaleString()} left
          </span>
        </div>
        <Progress value={category.percentage} className="h-1.5" />
      </div>
    </motion.div>
  );
};

const SmartTipCard = ({ 
  title, 
  description, 
  action, 
  color, 
  bgColor, 
  icon 
}: { 
  title: string; 
  description: string; 
  action: string; 
  color: string; 
  bgColor: string; 
  icon: React.ReactNode;
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="p-5 shadow-card h-full">
        <div className="flex flex-col h-full">
          <div className="flex items-start mb-3">
            <div className={`rounded-full p-2 mr-3 ${bgColor}`}>
              <div className={color}>
                {icon}
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          <p className="text-sm text-gray-600 flex-grow mb-3">{description}</p>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="link" className={`text-sm p-0 justify-start ${color}`}>
                {action}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>
                  Detailed information and recommendations will be available soon.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </Card>
    </motion.div>
  );
};

export default BudgetTracker;
