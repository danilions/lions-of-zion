import React from 'react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const TrustIndicators: React.FC = () => {
  const indicators = [
    { metric: '99.7%', label: 'Detection Accuracy', icon: '🎯' },
    { metric: '50+', label: 'Countries Monitored', icon: '🌍' },
    { metric: '24/7', label: 'Real-time Monitoring', icon: '⚡' },
    { metric: '2.3M+', label: 'Sources Analyzed', icon: '📊' }
  ];

  return (
    <section className="section bg-neutral-50/50">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center space-y-12">
          {/* Trust Statement */}
          <div className="space-y-6">
            <Badge variant="primary" size="lg" className="mx-auto">
              Trusted by Leading Organizations
            </Badge>
            <h2 className="heading-2">
              Intelligence You Can 
              <span className="text-primary-600"> Trust</span>
            </h2>
            <p className="body-large max-w-2xl mx-auto">
              Our AI-powered platform processes millions of data points daily, 
              delivering unprecedented accuracy in misinformation detection
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {indicators.map((item, index) => (
              <div key={index} className="text-center space-y-3">
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="text-3xl md:text-4xl font-bold font-display text-neutral-900">
                  {item.metric}
                </div>
                <div className="text-sm text-neutral-600 font-medium">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="pt-8">
            <Button size="lg" className="px-8">
              Experience the Power
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
