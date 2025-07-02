import React from 'react';
import { cn } from '../../lib/utils';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error';
  children: React.ReactNode;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'info', children, ...props }, ref) => {
    const baseStyles = 'relative w-full rounded-lg border p-4';
    
    const variants = {
      info: 'border-primary-200 bg-primary-50 text-primary-800',
      success: 'border-green-200 bg-green-50 text-green-800',
      warning: 'border-yellow-200 bg-yellow-50 text-yellow-800',
      error: 'border-red-200 bg-red-50 text-red-800'
    };
    
    return (
      <div
        className={cn(baseStyles, variants[variant], className)}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export const AlertTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn('mb-1 font-medium leading-none tracking-tight', className)}
      {...props}
    />
  )
);

AlertTitle.displayName = 'AlertTitle';

export const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('text-sm [&_p]:leading-relaxed', className)}
      {...props}
    />
  )
);

AlertDescription.displayName = 'AlertDescription';
