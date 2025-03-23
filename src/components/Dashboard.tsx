import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  PieChart,
  TrendingUp,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  BarChart,
  Wallet,
  Calendar,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts";

const areaChartData = [
  { name: "Jan", Income: 4000, Expenses: 2400 },
  { name: "Feb", Income: 3500, Expenses: 2800 },
  { name: "Mar", Income: 5500, Expenses: 3000 },
  { name: "Apr", Income: 5700, Expenses: 2780 },
  { name: "May", Income: 6200, Expenses: 3200 },
  { name: "Jun", Income: 5800, Expenses: 3500 },
  { name: "Jul", Income: 6700, Expenses: 3700 },
];

const pieChartData = [
  { name: "Housing", value: 30, color: "#3283cb" },
  { name: "Food", value: 20, color: "#56a0e0" },
  { name: "Transport", value: 15, color: "#91c0ed" },
  { name: "Entertainment", value: 10, color: "#c5dcf5" },
  { name: "Other", value: 25, color: "#e5eefa" },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-100 shadow-sm rounded-md">
        <p className="text-sm font-medium">{`${payload[0].name}: $${payload[0].value}`}</p>
        {payload[1] && (
          <p className="text-sm font-medium">{`${payload[1].name}: $${payload[1].value}`}</p>
        )}
      </div>
    );
  }
  return null;
};

const Dashboard = () => {
  const [timeFrame, setTimeFrame] = useState("month");

  return (
    <section id="dashboard" className="section-padding bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Financial Dashboard
            </h2>
            <p className="text-lg text-gray-600">
              Get a comprehensive view of your finances with real-time insights
              and trend analysis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-on-scroll">
            <StatCard
              title="Total Balance"
              value="₹24,562.80"
              change={+12.5}
              icon={<Wallet className="h-5 w-5" />}
            />
            <StatCard
              title="Income"
              value="₹6,748.50"
              change={+8.2}
              icon={<TrendingUp className="h-5 w-5" />}
            />
            <StatCard
              title="Expenses"
              value="₹3,892.20"
              change={-2.4}
              icon={<TrendingDown className="h-5 w-5" />}
            />
            <StatCard
              title="Investments"
              value="₹12,580.75"
              change={+15.3}
              icon={<BarChart className="h-5 w-5" />}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-on-scroll">
            <Card className="col-span-1 lg:col-span-2 p-6 shadow-card">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Income vs Expenses
                    </h3>
                    <p className="text-sm text-gray-500">
                      Track your monthly cashflow
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <TimeFrameButton
                      active={timeFrame === "week"}
                      onClick={() => setTimeFrame("week")}
                    >
                      Week
                    </TimeFrameButton>
                    <TimeFrameButton
                      active={timeFrame === "month"}
                      onClick={() => setTimeFrame("month")}
                    >
                      Month
                    </TimeFrameButton>
                    <TimeFrameButton
                      active={timeFrame === "year"}
                      onClick={() => setTimeFrame("year")}
                    >
                      Year
                    </TimeFrameButton>
                  </div>
                </div>

                <div className="flex-grow">
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={areaChartData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                      >
                        <defs>
                          <linearGradient
                            id="colorIncome"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#3283cb"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="#3283cb"
                              stopOpacity={0}
                            />
                          </linearGradient>
                          <linearGradient
                            id="colorExpenses"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#91c0ed"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="#91c0ed"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                        <XAxis
                          dataKey="name"
                          tick={{ fontSize: 12 }}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis
                          tickFormatter={(value) => `₹${value}`}
                          tick={{ fontSize: 12 }}
                          tickLine={false}
                          axisLine={false}
                          width={60}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                          type="monotone"
                          dataKey="Income"
                          stroke="#3283cb"
                          fillOpacity={1}
                          fill="url(#colorIncome)"
                          strokeWidth={2}
                        />
                        <Area
                          type="monotone"
                          dataKey="Expenses"
                          stroke="#91c0ed"
                          fillOpacity={1}
                          fill="url(#colorExpenses)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-card">
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Expense Breakdown
                  </h3>
                  <p className="text-sm text-gray-500">
                    How your money is spent
                  </p>
                </div>

                <div className="flex-grow flex items-center justify-center">
                  <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={pieChartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value: any) => [
                            `${value}%`,
                            "Percentage",
                          ]}
                        />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  {pieChartData.map((entry, index) => (
                    <div key={index} className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: entry.color }}
                      ></div>
                      <span className="text-xs">
                        {entry.name} ({entry.value}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          <div className="animate-on-scroll">
            <Card className="shadow-card overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Recent Transactions
                    </h3>
                    <p className="text-sm text-gray-500">
                      Your latest financial activities
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs">
                    View All
                  </Button>
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                <TransactionItem
                  name="Grocery Store"
                  date="Jul 15, 2023"
                  amount="-₹85.20"
                  status="expense"
                />
                <TransactionItem
                  name="Salary Deposit"
                  date="Jul 10, 2023"
                  amount="+₹3,250.00"
                  status="income"
                />
                <TransactionItem
                  name="Electric Bill"
                  date="Jul 8, 2023"
                  amount="-₹124.50"
                  status="expense"
                />
                <TransactionItem
                  name="Freelance Payment"
                  date="Jul 5, 2023"
                  amount="+₹650.00"
                  status="income"
                />
                <TransactionItem
                  name="Restaurant"
                  date="Jul 2, 2023"
                  amount="-₹78.30"
                  status="expense"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

const StatCard = ({
  title,
  value,
  change,
  icon,
}: {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}) => {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Card className="p-6 shadow-card">
        <div className="flex justify-between items-start mb-2">
          <div className="rounded-full bg-finance-50 p-2">{icon}</div>
          <div
            className={`text-xs font-medium rounded-full px-2 py-1 flex items-center ${
              change > 0
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {change > 0 ? (
              <ArrowUp className="mr-1 h-3 w-3" />
            ) : (
              <ArrowDown className="mr-1 h-3 w-3" />
            )}
            {Math.abs(change)}%
          </div>
        </div>
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      </Card>
    </motion.div>
  );
};

const TimeFrameButton = ({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button
      onClick={onClick}
      className={`text-xs px-3 py-1 rounded-full transition-colors ${
        active
          ? "bg-finance-100 text-finance-700"
          : "text-gray-500 hover:text-finance-600"
      }`}
    >
      {children}
    </button>
  );
};

const TransactionItem = ({
  name,
  date,
  amount,
  status,
}: {
  name: string;
  date: string;
  amount: string;
  status: "income" | "expense";
}) => {
  return (
    <div className="p-4 flex items-center justify-between hover:bg-gray-50">
      <div className="flex items-center">
        <div
          className={`rounded-full p-2 mr-4 ${
            status === "income"
              ? "bg-green-50 text-green-600"
              : "bg-red-50 text-red-600"
          }`}
        >
          {status === "income" ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">{name}</p>
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="h-3 w-3 mr-1" />
            {date}
          </div>
        </div>
      </div>
      <p
        className={`text-sm font-semibold ${
          status === "income" ? "text-green-600" : "text-red-600"
        }`}
      >
        {amount}
      </p>
    </div>
  );
};

export default Dashboard;
