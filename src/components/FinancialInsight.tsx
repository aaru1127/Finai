import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Target,
  AlertCircle,
  ArrowRight,
  CheckCircle,
  Lightbulb,
} from "lucide-react";

const FinancialInsight = () => {
  return (
    <section id="insights" className="section-padding bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Financial Insights
            </h2>
            <p className="text-lg text-gray-600">
              Personalized recommendations and tips to optimize your financial
              health
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-on-scroll">
            <div className="space-y-6">
              <InsightCard
                title="Emergency Fund Status"
                status="warning"
                message="Your emergency fund covers 2.5 months of expenses. We recommend building it to cover 6 months."
                action="Build Emergency Fund"
              />
              <InsightCard
                title="Retirement Savings"
                status="success"
                message="You're on track to meet your retirement goal of $1.5M by age 65. Keep up the good work!"
                action="Review Retirement Plan"
              />
              <InsightCard
                title="Debt Reduction"
                status="info"
                message="You could save $5,280 in interest by paying off your credit card debt before your car loan."
                action="See Debt Payoff Strategy"
              />
              <InsightCard
                title="Tax Optimization"
                status="warning"
                message="You may be able to reduce your tax liability by contributing more to your 401(k) plan."
                action="Explore Tax Strategies"
              />
            </div>

            <div className="space-y-6">
              <Card className="p-6 shadow-card h-full">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="bg-amber-50 text-amber-600 rounded-full p-2">
                      <Lightbulb className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Financial Health Score
                    </h3>
                  </div>

                  <div className="flex items-center justify-center py-8">
                    <div className="relative">
                      <svg viewBox="0 0 100 100" className="w-40 h-40">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#e5eefa"
                          strokeWidth="10"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#3283cb"
                          strokeWidth="10"
                          strokeDasharray="282.7"
                          strokeDashoffset="70.675"
                          transform="rotate(-90 50 50)"
                        />
                        <text
                          x="50"
                          y="50"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="text-3xl font-bold"
                          fill="#1a1a1a"
                        >
                          75
                        </text>
                        <text
                          x="50"
                          y="65"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="text-xs"
                          fill="#6b7280"
                        >
                          Good
                        </text>
                      </svg>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <h4 className="text-sm font-semibold text-gray-900">
                      Improvement Areas
                    </h4>
                    <ul className="space-y-2">
                      <ImprovementItem text="Increase emergency savings by $3,500" />
                      <ImprovementItem text="Pay off high-interest credit card debt" />
                      <ImprovementItem text="Diversify your investment portfolio" />
                    </ul>
                  </div>

                  <div className="bg-finance-50 p-4 rounded-lg space-y-3">
                    <h4 className="text-sm font-semibold text-gray-900">
                      Strengths
                    </h4>
                    <ul className="space-y-2">
                      <StrengthItem text="Consistent retirement contributions" />
                      <StrengthItem text="Low housing cost ratio to income" />
                      <StrengthItem text="Regular monthly budget adherence" />
                    </ul>
                  </div>

                  <Button className="w-full bg-finance-600 hover:bg-finance-700 text-white">
                    Get Full Financial Health Report
                  </Button>
                </div>
              </Card>
            </div>
          </div>

          <div className="bg-gradient-to-r from-finance-600 to-finance-700 rounded-xl shadow-lg overflow-hidden animate-on-scroll">
            <div className="py-10 px-8 md:px-12 flex flex-col md:flex-row items-center">
              <div className="flex-1 text-white space-y-4 mb-6 md:mb-0">
                <h3 className="text-2xl md:text-3xl font-bold">
                  Ready to transform your finances?
                </h3>
                <p className="text-finance-100">
                  Create your personalized financial plan and start your journey
                  to financial freedom today.
                </p>
              </div>
              <div className="md:ml-8">
                <Button
                  size="lg"
                  className="bg-white text-finance-700 hover:bg-finance-50 rounded-full px-8 shadow-md group"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const InsightCard = ({
  title,
  status,
  message,
  action,
}: {
  title: string;
  status: "success" | "warning" | "info";
  message: string;
  action: string;
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-amber-600" />;
      case "info":
        return <Target className="h-5 w-5 text-finance-600" />;
      default:
        return <TrendingUp className="h-5 w-5 text-finance-600" />;
    }
  };

  const getStatusBg = () => {
    switch (status) {
      case "success":
        return "bg-green-50";
      case "warning":
        return "bg-amber-50";
      case "info":
        return "bg-finance-50";
      default:
        return "bg-finance-50";
    }
  };

  const getActionColor = () => {
    switch (status) {
      case "success":
        return "text-green-600 hover:text-green-700";
      case "warning":
        return "text-amber-600 hover:text-amber-700";
      case "info":
        return "text-finance-600 hover:text-finance-700";
      default:
        return "text-finance-600 hover:text-finance-700";
    }
  };

  return (
    <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
      <Card className="p-5 shadow-card">
        <div className="flex flex-col h-full">
          <div className="flex items-center space-x-3 mb-3">
            <div className={`rounded-full p-2 ${getStatusBg()}`}>
              {getStatusIcon()}
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">{message}</p>
          <div className="mt-auto">
            <Button
              variant="link"
              className={`p-0 h-auto text-sm font-medium ${getActionColor()}`}
            >
              {action}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

const ImprovementItem = ({ text }: { text: string }) => {
  return (
    <li className="flex items-center text-sm text-gray-700">
      <div className="bg-amber-100 text-amber-600 rounded-full p-1 mr-2 flex-shrink-0">
        <AlertCircle className="h-3.5 w-3.5" />
      </div>
      {text}
    </li>
  );
};

const StrengthItem = ({ text }: { text: string }) => {
  return (
    <li className="flex items-center text-sm text-gray-700">
      <div className="bg-green-100 text-green-600 rounded-full p-1 mr-2 flex-shrink-0">
        <CheckCircle className="h-3.5 w-3.5" />
      </div>
      {text}
    </li>
  );
};

export default FinancialInsight;
