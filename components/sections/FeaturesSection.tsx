'use client';

'use client';

import { Clock, Users, TrendingUp, Shield, Zap, BarChart3 } from 'lucide-react';
import CapabilityCard from '@/components/ui/CapabilityCard';

const features = [
  {
    name: 'Time Tracking',
    description: 'Accurate time tracking with automated workflows and intelligent categorization.',
    icon: Clock,
    features: ['Automated categorization', 'Smart workflows', 'Real-time sync']
  },
  {
    name: 'Team Management',
    description: 'Coordinate teams effectively with role-based access and collaboration tools.',
    icon: Users,
    features: ['Role-based access', 'Team collaboration', 'Performance insights']
  },
  {
    name: 'Analytics & Insights',
    description: 'Comprehensive reporting and analytics to optimize productivity and performance.',
    icon: BarChart3,
    features: ['Custom reports', 'Performance metrics', 'Trend analysis']
  },
  {
    name: 'Performance Optimization',
    description: 'AI-powered insights to identify bottlenecks and improve efficiency.',
    icon: TrendingUp,
    features: ['Bottleneck detection', 'Efficiency recommendations', 'Workflow optimization']
  },
  {
    name: 'Enterprise Security',
    description: 'Bank-level security with SOC 2 compliance and data encryption.',
    icon: Shield,
    features: ['SOC 2 compliance', 'Data encryption', 'Access controls']
  },
  {
    name: 'Lightning Fast',
    description: 'Optimized performance with real-time updates and instant synchronization.',
    icon: Zap,
    features: ['Real-time updates', 'Instant sync', 'Optimized performance']
  },
];

export default function FeaturesSection() {
  return (
    <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
      {features.map((feature, index) => (
        <CapabilityCard
          key={feature.name}
          icon={feature.icon}
          title={feature.name}
          description={feature.description}
          features={feature.features}
          delay={index * 0.1}
        />
      ))}
    </div>
  );
}