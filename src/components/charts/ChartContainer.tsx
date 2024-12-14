// src/components/ui/ChartContainer.tsx

import { type ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ChartContainerProps {
  title: string;
  children: ReactNode;
  inputs: {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    className?: string; // Allow optional custom class for input
  }[];
  onAdd: () => void;
  className?: string;
}

export function ChartContainer({
  title,
  children,
  inputs,
  onAdd,
  className,
}: ChartContainerProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <div className="flex gap-2">
          {inputs.map((input, index) => (
            <Input
              key={index}
              type="number"
              value={input.value}
              onChange={(e) => input.onChange(e.target.value)}
              placeholder={input.placeholder}
              className={input.className || 'max-w-[100px]'} // Use custom class or default
            />
          ))}
          <Button onClick={onAdd} size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">{children}</div>
      </CardContent>
    </Card>
  );
}
