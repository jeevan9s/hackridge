import { Line, LineChart as RechartsLineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { xAxisConfig, yAxisConfig, tooltipConfig } from '@/lib/chart-config';

export function LineChart() {
  const [dataPoints, setDataPoints] = useState([
    { month: 'Jan', value: 400 },
    { month: 'Feb', value: 300 },
    { month: 'Mar', value: 500 },
    { month: 'Apr', value: 280 },
    { month: 'May', value: 590 },
  ]);

  const [newValue, setNewValue] = useState('');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const addDataPoint = () => {
    if (newValue && dataPoints.length < 12) {
      setDataPoints([...dataPoints, {
        month: months[dataPoints.length],
        value: parseInt(newValue)
      }]);
      setNewValue('');
    }
  };

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Revenue Growth</CardTitle>
        <div className="flex gap-2">
          <Input
            type="number"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder="Add value..."
            className="max-w-[150px]"
          />
          <Button onClick={addDataPoint} size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart data={dataPoints} margin={{ top: 16, right: 16, bottom: 0, left: 0 }}>
              <XAxis {...xAxisConfig} dataKey="month" />
              <YAxis {...yAxisConfig} />
              <Tooltip {...tooltipConfig} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ strokeWidth: 2, fill: 'hsl(var(--background))' }}
                activeDot={{ strokeWidth: 2, r: 6, fill: 'hsl(var(--primary))' }}
                animationDuration={1500}
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}