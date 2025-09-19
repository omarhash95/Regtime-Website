'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import Billboard from '@/components/brand/Billboard';
import SkylineBars from '@/components/brand/icons/SkylineBars';
import SkylineAngles from '@/components/brand/icons/SkylineAngles';
import SkylineBlocks from '@/components/brand/icons/SkylineBlocks';

interface ShowcaseBillboardsProps {
  className?: string;
}

export default function ShowcaseBillboards({ className = '' }: ShowcaseBillboardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { shouldReduceMotion } = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Create scroll-linked transforms for each billboard
  const billboard1Y = useTransform(scrollYProgress, [0, 0.25], [0, -50]);
  const billboard2Y = useTransform(scrollYProgress, [0.25, 0.5], [50, -50]);
  const billboard3Y = useTransform(scrollYProgress, [0.5, 0.75], [50, -50]);
  const billboard4Y = useTransform(scrollYProgress, [0.75, 1], [50, 0]);

  const billboards = [
    {
      id: 1,
      mode: 'light' as const,
      align: 'image-left' as const,
      title: 'Transform Your Business Operations',
      subtitle: 'Smart Solutions',
      description: 'Streamline your workflow with intelligent time management tools designed for modern businesses. Our platform adapts to your needs and scales with your growth.',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
      imageAlt: 'Modern office collaboration',
      frameType: 'chevron' as const,
      cta: {
        text: 'Learn More',
        href: '/services'
      },
      y: billboard1Y
    },
    {
      id: 2,
      mode: 'dark' as const,
      align: 'image-right' as const,
      title: 'Built for Scale',
      subtitle: 'Enterprise Ready',
      description: 'From startups to Fortune 500 companies, our platform handles millions of hours of time data with enterprise-grade security and reliability.',
      image: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=800',
      imageAlt: 'City skyline at night',
      frameType: 'stacked' as const,
      watermarkIcon: <SkylineAngles className="w-full h-full" />,
      cta: {
        text: 'View Enterprise Features',
        href: '/services'
      },
      y: billboard2Y
    },
    {
      id: 3,
      mode: 'alice-blue' as const,
      align: 'image-left' as const,
      title: 'Intelligent Analytics',
      subtitle: 'Data-Driven Insights',
      description: 'Turn your time data into actionable insights. Our AI-powered analytics help you identify bottlenecks, optimize workflows, and boost productivity.',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      imageAlt: 'Data visualization dashboard',
      frameType: 'chevron' as const,
      watermarkIcon: <SkylineBlocks className="w-full h-full" />,
      cta: {
        text: 'See Analytics Demo',
        href: '/contact'
      },
      y: billboard3Y
    },
    {
      id: 4,
      mode: 'light' as const,
      align: 'image-right' as const,
      title: 'Ready to Get Started?',
      subtitle: 'Join Thousands of Teams',
      description: 'Transform your business today with Regtime\'s comprehensive time management platform. Start your free trial and see results in minutes.',
      image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800',
      imageAlt: 'Team collaboration',
      frameType: 'none' as const,
      watermarkIcon: <SkylineBars className="w-full h-full" />,
      cta: {
        text: 'Start Free Trial',
        href: '/contact'
      },
      y: billboard4Y
    }
  ];

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {billboards.map((billboard, index) => (
        <motion.div
          key={billboard.id}
          style={shouldReduceMotion ? {} : { y: billboard.y }}
          className="relative"
        >
          <Billboard
            mode={billboard.mode}
            align={billboard.align}
            title={billboard.title}
            subtitle={billboard.subtitle}
            description={billboard.description}
            image={billboard.image}
            imageAlt={billboard.imageAlt}
            frameType={billboard.frameType}
            watermarkIcon={billboard.watermarkIcon}
            cta={billboard.cta}
          />
          
          {/* Separator line between billboards */}
          {index < billboards.length - 1 && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-px bg-border" />
          )}
        </motion.div>
      ))}

      {/* Progress indicator */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-20 hidden lg:block">
        <div className="flex flex-col space-y-2">
          {billboards.map((_, index) => (
            <motion.div
              key={index}
              className="w-1 h-8 bg-border rounded-full overflow-hidden"
            >
              <motion.div
                className="w-full bg-brand-primary rounded-full origin-top"
                style={shouldReduceMotion ? {} : {
                  scaleY: useTransform(
                    scrollYProgress,
                    [index * 0.25, (index + 1) * 0.25],
                    [0, 1]
                  )
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}