'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code, Database, Zap, Users, ArrowRight, Check } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import Reveal from '@/components/ui/Reveal';
import TiltCard from '@/components/ui/TiltCard';
import MagneticButton from '@/components/ui/MagneticButton';
import StatCounter from '@/components/ui/StatCounter';

const codeSnippets = {
  setup: `// Quick setup
npm install @regtime/sdk

import { Regtime } from '@regtime/sdk';

const regtime = new Regtime({
  apiKey: process.env.REGTIME_API_KEY
});`,
  
  tracking: `// Start tracking time
const session = await regtime.startSession({
  project: 'website-redesign',
  task: 'hero-section',
  team: 'design'
});

// Auto-categorization
session.addTags(['frontend', 'ui']);`,

  analytics: `// Get insights
const insights = await regtime.getInsights({
  timeframe: '30d',
  groupBy: 'project'
});

console.log(insights.productivity); // +40%
console.log(insights.efficiency);   // +25%`
};

const architectureNodes = [
  { id: 'client', label: 'Client Apps', x: 20, y: 50, icon: Users },
  { id: 'api', label: 'API Gateway', x: 50, y: 30, icon: Zap },
  { id: 'analytics', label: 'Analytics Engine', x: 50, y: 70, icon: Code },
  { id: 'database', label: 'Time Database', x: 80, y: 50, icon: Database }
];

const connections = [
  { from: 'client', to: 'api' },
  { from: 'api', to: 'analytics' },
  { from: 'api', to: 'database' },
  { from: 'analytics', to: 'database' }
];

interface ScrollStoryProps {
  className?: string;
}

export default function ScrollStory({ className = '' }: ScrollStoryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCode, setActiveCode] = useState<keyof typeof codeSnippets>('setup');
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const { shouldReduceMotion } = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Transform scroll progress to different stages
  const stage1Progress = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  const stage2Progress = useTransform(scrollYProgress, [0.25, 0.5], [0, 1]);
  const stage3Progress = useTransform(scrollYProgress, [0.5, 0.75], [0, 1]);
  const stage4Progress = useTransform(scrollYProgress, [0.75, 1], [0, 1]);

  // Create discrete visibility based on scroll progress
  const getStageOpacity = (stageIndex: number, progress: number) => {
    const stageSize = 1 / 2; // 2 main stages
    const stageStart = stageIndex * stageSize;
    const stageEnd = (stageIndex + 1) * stageSize;
    
    if (progress < stageStart) return 0;
    if (progress > stageEnd) return 0;
    
    // Fade in during first 20% of stage
    if (progress < stageStart + stageSize * 0.2) {
      return (progress - stageStart) / (stageSize * 0.2);
    }
    
    // Fade out during last 20% of stage
    if (progress > stageEnd - stageSize * 0.2) {
      return (stageEnd - progress) / (stageSize * 0.2);
    }
    
    // Fully visible in the middle 60% of stage
    return 1;
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Background grid */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      </div>

      <div className="relative z-10">
        {/* Stage 1: Value Proposition */}
        <motion.section 
          className="min-h-screen flex items-center justify-center"
          style={{
            opacity: shouldReduceMotion ? 1 : useTransform(scrollYProgress, (latest) => getStageOpacity(0, latest))
          }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <h2 className="text-4xl sm:text-6xl font-bold text-foreground mb-8">
                Time is your most{' '}
                <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                  valuable asset
                </span>
              </h2>
              <p className="text-xl text-white mb-12 max-w-2xl mx-auto">
                Stop guessing where your time goes. Regtime provides intelligent insights 
                that help you optimize productivity and drive real business results.
              </p>
            </Reveal>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {[
                { icon: Zap, title: 'Instant Setup', desc: 'Get started in under 5 minutes' },
                { icon: Code, title: 'Smart Analytics', desc: 'AI-powered productivity insights' },
                { icon: Users, title: 'Team Focused', desc: 'Built for collaborative workflows' }
              ].map((feature, index) => (
                <TiltCard key={index} className="p-6 bg-card rounded-lg border">
                  <feature.icon className="h-12 w-12 text-brand-primary mb-4 mx-auto" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-white">{feature.desc}</p>
                </TiltCard>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Stage 2: Interactive Architecture Diagram */}
        {/* Stage 2: Code & Results */}
        <motion.section 
          className="min-h-screen flex items-center justify-center"
          style={{
            opacity: shouldReduceMotion ? 1 : useTransform(scrollYProgress, (latest) => getStageOpacity(1, latest))
          }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Developer Experience First
              </h2>
              <p className="text-lg text-white">
                Simple APIs, powerful results
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Interactive Demo */}
              <div className="bg-card rounded-lg border overflow-hidden">
                <div className="bg-muted px-4 py-3 border-b flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-sm text-white">Regtime Dashboard</span>
                </div>
                
                <div className="p-6 space-y-4">
                  {/* Mock Dashboard Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-foreground">Time Tracking Dashboard</h3>
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-sm text-white">Live</span>
                    </div>
                  </div>
                  
                  {/* Active Session */}
                  <div className="border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-white">Website Redesign</p>
                        <p className="text-sm text-white">Frontend Development</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-white">
                          <StatCounter end={2} suffix="h " duration={1000} />
                          <StatCounter end={34} suffix="m" duration={1000} />
                        </p>
                        <p className="text-sm text-white">Active</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Recent Sessions */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-white">Recent Sessions</h4>
                    {[
                      { project: 'API Integration', time: '1h 45m', status: 'completed' },
                      { project: 'Database Optimization', time: '3h 12m', status: 'completed' },
                      { project: 'User Testing', time: '2h 8m', status: 'completed' }
                    ].map((session, index) => (
                      <div key={index} className="flex items-center justify-between py-2 px-3 bg-muted/50 rounded">
                        <span className="text-sm text-foreground">{session.project}</span>
                        <span className="text-sm text-white">{session.time}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="flex space-x-2 pt-4">
                    <button className="flex-1 bg-brand-primary text-white py-2 px-3 rounded text-sm font-medium hover:bg-brand-primary/90 transition-colors">
                      Start New Session
                    </button>
                    <button className="px-3 py-2 border border-border rounded text-sm hover:bg-muted transition-colors">
                      Reports
                    </button>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="space-y-6">
                <TiltCard className="p-6 bg-card rounded-lg border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">Productivity Boost</h3>
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="text-3xl font-bold text-brand-primary mb-2">+40%</div>
                  <p className="text-white">Average productivity increase</p>
                </TiltCard>

                <TiltCard className="p-6 bg-card rounded-lg border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">Time Saved</h3>
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="text-3xl font-bold text-brand-secondary mb-2">8.5h</div>
                  <p className="text-white">Per week per team member</p>
                </TiltCard>

                <TiltCard className="p-6 bg-card rounded-lg border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">ROI</h3>
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="text-3xl font-bold text-brand-accent mb-2">320%</div>
                  <p className="text-white">Return on investment</p>
                </TiltCard>
                
                {/* API Integration Preview */}
                <TiltCard className="p-6 bg-card rounded-lg border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">Easy Integration</h3>
                    <Code className="h-5 w-5 text-brand-primary" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium text-green-800">SDK Installed</span>
                      </div>
                      <span className="text-xs text-green-600">v2.1.0</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm font-medium text-blue-800">API Connected</span>
                      </div>
                      <span className="text-xs text-blue-600">Ready</span>
                    </div>
                    <div className="text-center pt-2">
                      <span className="text-xs text-white">Setup completed in 30 seconds</span>
                    </div>
                  </div>
                </TiltCard>
              </div>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}