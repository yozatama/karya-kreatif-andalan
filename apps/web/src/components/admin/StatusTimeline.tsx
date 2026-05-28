import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface TimelineStep {
  label: string;
  date?: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface StatusTimelineProps {
  steps: TimelineStep[];
  className?: string;
}

export function StatusTimeline({ steps, className }: StatusTimelineProps) {
  return (
    <div className={cn('space-y-0', className)}>
      {steps.map((step, index) => (
        <div key={index} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full border-2',
                step.status === 'completed' && 'border-emerald-500 bg-emerald-500 text-white',
                step.status === 'current' && 'border-blue-500 bg-blue-50 text-blue-500',
                step.status === 'upcoming' && 'border-gray-300 bg-gray-50 text-gray-400',
              )}
            >
              {step.status === 'completed' ? (
                <Check className="h-4 w-4" />
              ) : (
                <span className="text-xs font-medium">{index + 1}</span>
              )}
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'w-0.5 h-8',
                  step.status === 'completed' ? 'bg-emerald-500' : 'bg-gray-200',
                )}
              />
            )}
          </div>
          <div className="pb-8">
            <p
              className={cn(
                'text-sm font-medium',
                step.status === 'completed' && 'text-emerald-700',
                step.status === 'current' && 'text-blue-700',
                step.status === 'upcoming' && 'text-gray-400',
              )}
            >
              {step.label}
            </p>
            {step.date && (
              <p className="text-xs text-muted-foreground">{step.date}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
