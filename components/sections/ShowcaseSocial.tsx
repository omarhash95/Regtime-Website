'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import PosterTile from '@/components/brand/PosterTile';
import SkylineBars from '@/components/brand/icons/SkylineBars';
import SkylineAngles from '@/components/brand/icons/SkylineAngles';
import SkylineBlocks from '@/components/brand/icons/SkylineBlocks';
import Reveal from '@/components/ui/Reveal';

interface ShowcaseSocialProps {
  className?: string;
}

export default function ShowcaseSocial({ className = '' }: ShowcaseSocialProps) {
  const { shouldReduceMotion } = useReducedMotion();

  const tiles = [
    {
      id: 1,
      variant: 'image' as const,
      image: '/brand/interior-workspace.jpg',
      title: 'Modern Workspaces',
      logo: true
    },
    {
      id: 2,
      variant: 'image' as const,
      image: '/brand/geometric-buildings.jpg',
      title: 'Urban Architecture',
      logo: true
    },
    {
      id: 3,
      variant: 'headline-baby-blue' as const,
      title: 'Builder, Marketer, and Manager',
      caption: 'your full housing toolkit.',
      icon: <SkylineBars className="w-12 h-6 text-white/80" />
    },
    {
      id: 4,
      variant: 'headline-baby-blue' as const,
      title: 'Redefining regulated housing through iconic simplicity',
      icon: <SkylineAngles className="w-16 h-8 text-white/60" />
    },
    {
      id: 5,
      variant: 'dark-copy-block' as const,
      title: 'A Platform That Never Sleeps',
      caption: 'At Regtime, compliance isn\'t just a checkbox, it\'s the foundation. Every feature is grounded in real legal frameworks, ensuring 100% regulatory adherence for housing solutions.'
    },
    {
      id: 6,
      variant: 'image-caption' as const,
      image: '/brand/hero-cityscape.jpg',
      title: 'Three Products. One Mission.',
      caption: 'Affordable Housing. Smarter Than Ever',
      logo: true
    },
    {
      id: 7,
      variant: 'headline-slate' as const,
      title: 'Transform Your Business',
      caption: 'with intelligent time management',
      icon: <SkylineBlocks className="w-14 h-7 text-white/70" />
    },
    {
      id: 8,
      variant: 'image' as const,
      image: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Smart Solutions',
      logo: true
    }
  ];

  return (
    <section className={`py-24 sm:py-32 bg-muted/30 ${className}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-brand-primary">Social Presence</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Consistent Brand Storytelling
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Our social media content combines strong, clear messages with simple graphics to showcase 
              product benefits and real-life use cases.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiles.map((tile, index) => (
            <motion.div
              key={tile.id}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: shouldReduceMotion ? 0 : index * 0.1,
                ease: "easeOut" 
              }}
              viewport={{ once: true }}
            >
              <PosterTile
                variant={tile.variant}
                title={tile.title}
                caption={tile.caption}
                image={tile.image}
                icon={tile.icon}
                logo={tile.logo}
                className="h-full"
              />
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <Reveal>
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-6">
              Follow our journey as we transform the housing industry
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-brand-primary text-white hover:bg-brand-primary/90 transition-colors"
              >
                Follow on LinkedIn
              </a>
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors"
              >
                View All Posts
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}