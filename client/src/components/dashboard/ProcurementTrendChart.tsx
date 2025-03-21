import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  TooltipProps
} from "recharts";
import { formatCurrency } from "@/lib/utils";
import { ProcurementTrend } from "@/types";

interface CustomTooltipProps extends TooltipProps<number, string> {}

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-800 p-3 border border-slate-200 dark:border-slate-700 rounded-md shadow-sm">
        <p className="font-medium text-sm">{label}</p>
        <div className="mt-1">
          <p className="text-sm text-emerald-600 dark:text-emerald-400">
            Spend: {formatCurrency(payload[0].value as number)}
          </p>
          <p className="text-sm text-amber-600 dark:text-amber-400">
            Savings: {formatCurrency(payload[1].value as number)}
          </p>
        </div>
      </div>
    );
  }
  return null;
};

interface ProcurementTrendChartProps {
  data: ProcurementTrend[];
  className?: string;
}

export function ProcurementTrendChart({ data, className }: ProcurementTrendChartProps) {
  const [timeRange, setTimeRange] = useState("6m");

  return (
    <Card className={className}>
      <CardHeader className="px-5 pb-0 pt-5">
        <div className="flex items-center justify-between mb-6">
          <CardTitle className="text-lg font-semibold">Procurement Trend</CardTitle>
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px] h-8 text-sm">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6m">Last 6 Months</SelectItem>
              <SelectItem value="12m">Last 12 Months</SelectItem>
              <SelectItem value="ytd">Year to Date</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="h-80 px-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12 }} 
              tickLine={false} 
              axisLine={{ stroke: '#CBD5E1', strokeWidth: 1 }}
              className="text-slate-600 dark:text-slate-400"
            />
            <YAxis 
              tickFormatter={(value) => `$${(value/1000)}k`}
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: '#CBD5E1', strokeWidth: 1 }}
              className="text-slate-600 dark:text-slate-400"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="top" 
              height={36} 
              wrapperStyle={{ paddingTop: '10px' }}
            />
            <Line
              type="monotone"
              dataKey="spend"
              name="Spend"
              stroke="#059669"
              strokeWidth={2}
              activeDot={{ r: 6 }}
              dot={{ r: 4 }}
              fill="url(#colorSpend)"
            />
            <Line
              type="monotone"
              dataKey="savings"
              name="Savings"
              stroke="#f59e0b"
              strokeWidth={2}
              activeDot={{ r: 6 }}
              dot={{ r: 4 }}
              fill="url(#colorSavings)"
            />
            <defs>
              <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#059669" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
