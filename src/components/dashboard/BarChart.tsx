import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { xAxisConfig, yAxisConfig, tooltipConfig } from '@/lib/chart-config';

export function BarChart() {
  const [dataPoints, setDataPoints] = useState([
    { category: 'Product A', sales: 120 },
    { category: 'Product B', sales: 230 },
    { category: 'Product C', sales: 180 },
  ]);

  const [newValue, setNewValue] = useState('');
  const [newCategory, setNewCategory] = useState('');

  const addDataPoint = () => {
    if (newValue && newCategory) {
      setDataPoints([...dataPoints, {
        category: newCategory,
        sales: parseInt(newValue)
      }]);
      setNewValue('');
      setNewCategory('');
    }
  };

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Sales by Product</CardTitle>
        <div className="flex gap-2">
          <Input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Category..."
            className="max-w-[120px]"
          />
          <Input
            type="number"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder="Value..."
            className="max-w-[100px]"
          />
          <Button onClick={addDataPoint} size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart data={dataPoints} margin={{ top: 16, right: 16, bottom: 0, left: 0 }}>
              <XAxis {...xAxisConfig} dataKey="category" />
              <YAxis {...yAxisConfig} />
              <Tooltip {...tooltipConfig} />
              <Bar
                dataKey="sales"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}