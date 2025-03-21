import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { PieChart, Pie, ResponsiveContainer, Cell, Legend, Tooltip, TooltipProps } from "recharts";
import { SpendByCategory } from "@/types";

interface CustomTooltipProps extends TooltipProps<number, string> {}

// Custom tooltip component
const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-800 p-3 border border-slate-200 dark:border-slate-700 rounded-md shadow-sm">
        <p className="font-medium text-sm">{payload[0].name}</p>
        <p className="text-sm mt-1">
          <span className="font-medium">{payload[0].value}%</span> of total spend
        </p>
      </div>
    );
  }
  return null;
};

interface SpendByCategoryChartProps {
  data: SpendByCategory[];
  className?: string;
}

export function SpendByCategoryChart({ data, className }: SpendByCategoryChartProps) {
  return (
    <Card className={className}>
      <CardHeader className="px-5 pt-5 pb-0">
        <div className="flex items-center justify-between mb-6">
          <CardTitle className="text-lg font-semibold">Spend by Category</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5 text-slate-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Export Data</DropdownMenuItem>
              <DropdownMenuItem>Print Chart</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              nameKey="category"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              layout="vertical" 
              verticalAlign="middle" 
              align="right"
              iconType="circle"
              formatter={(value) => {
                return <span className="text-sm text-slate-700 dark:text-slate-300">{value}</span>;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
