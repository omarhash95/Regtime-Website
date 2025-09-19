'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type Props = {
  portalId?: string;  // optional override; otherwise reads from env
  formId?: string;    // optional override; otherwise reads from env
  region?: string;    // defaults to 'na1'
  className?: string;
  showSkeleton?: boolean;
};

declare global {
  interface Window {
    hbspt?: {
      forms: { create: (opts: Record<string, any>) => void };
    };
  }
}

// Simple validators (no secrets logged)
const isValidPortalId = (v: string) => /^\d+$/.test(v);
const isValidFormId = (v: string) => /^[a-f0-9-]{24,}$/i.test(v); // HubSpot form IDs are GUID-like
const isValidRegion = (v: string) => /^[a-z0-9-]{2,}$/i.test(v);

export default function HubSpotEmbed({
  portalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID || '',
  formId = process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID || '',
  region = process.env.NEXT_PUBLIC_HUBSPOT_REGION || 'na1',
  className = '',
  showSkeleton = false,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const createdRef = useRef(false);
  const [status, setStatus] = useState<'idle'|'loading'|'ready'|'error'>('idle');
  const [errorKey, setErrorKey] = useState<null | 'portalId' | 'formId' | 'region'>(null);

  // Trim accidental whitespace; do NOT mutate originals
  const cfg = useMemo(() => {
    const p = (portalId ?? '').toString().trim();
    const f = (formId ?? '').toString().trim();
    const r = (region ?? 'na1').toString().trim().toLowerCase();
    return { p, f, r };
  }, [portalId, formId, region]);

  useEffect(() => {
    let cancelled = false;

    // Validate early (don't hit HubSpot with bad inputs)
    if (!cfg.p || !isValidPortalId(cfg.p)) {
      setErrorKey('portalId');
      setStatus('error');
      return;
    }
    if (!cfg.f || !isValidFormId(cfg.f)) {
      setErrorKey('formId');
      setStatus('error');
      return;
    }
    if (!cfg.r || !isValidRegion(cfg.r)) {
      setErrorKey('region');
      setStatus('error');
      return;
    }

    async function ensureScript(): Promise<void> {
      setStatus('loading');

      if (typeof window !== 'undefined' && window.hbspt?.forms?.create) return;

      await new Promise<void>((resolve, reject) => {
        if (typeof document === 'undefined') return resolve();

        const existing = document.getElementById('hubspot-forms-v2-js') as HTMLScriptElement | null;
        if (existing) {
          if (window.hbspt?.forms?.create) return resolve();
          existing.addEventListener('load', () => resolve(), { once: true });
          existing.addEventListener('error', () => reject(new Error('HubSpot script failed to load')), { once: true });
          return;
        }

        const s = document.createElement('script');
        s.id = 'hubspot-forms-v2-js';
        s.src = 'https://js.hsforms.net/forms/v2.js';
        s.async = true;
        s.defer = true;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error('HubSpot script failed to load'));
        document.body.appendChild(s);
      });

      // Allow microtask so window.hbspt can attach
      await Promise.resolve();

      // brief spin-wait up to 2s if needed
      const start = Date.now();
      while (!window.hbspt?.forms?.create && Date.now() - start < 2000) {
        await new Promise(r => setTimeout(r, 50));
      }
    }

    async function createForm() {
      try {
        await ensureScript();
        if (cancelled) return;

        const target = containerRef.current;
        if (!target) {
          setStatus('error');
          return;
        }

        if (createdRef.current) {
          // Strict Mode/double render guard
          return;
        }

        // Clear target before creation (avoid duplicate embeds)
        target.innerHTML = '';

        window.hbspt?.forms?.create({
          portalId: cfg.p,
          formId: cfg.f,
          region: cfg.r,
          target,
        });

        createdRef.current = true;
        if (!cancelled) setStatus('ready');
      } catch (err) {
        // Don't log secrets; just a generic error line
        console.error('[HubSpot] Failed to create form'); // eslint-disable-line no-console
        if (!cancelled) setStatus('error');
      }
    }

    createdRef.current = false;
    createForm();

    return () => {
      cancelled = true;
      if (containerRef.current) containerRef.current.innerHTML = '';
      createdRef.current = false;
    };
  }, [cfg.p, cfg.f, cfg.r]);

  // Minimal, non-secret UX for issues
  return (
    <div className={className}>
      {showSkeleton && status === 'loading' && (
        <div aria-hidden className="w-full animate-pulse">
          <div className="h-4 w-1/3 bg-[hsl(var(--muted))] rounded mb-3" />
          <div className="h-10 w-full bg-[hsl(var(--muted))] rounded mb-2" />
          <div className="h-10 w-full bg-[hsl(var(--muted))] rounded mb-2" />
          <div className="h-10 w-full bg-[hsl(var(--muted))] rounded" />
        </div>
      )}

      {status === 'error' && (
        <div role="status" className="text-sm text-[hsl(var(--foreground))]/80 bg-[hsl(var(--card))] ring-1 ring-[hsl(var(--border))] p-3 rounded-lg">
          We couldn&apos;t load the contact form.
          {process.env.NODE_ENV !== 'production' && errorKey && (
            <span className="ml-2">
              (Check <code className="px-1 py-0.5 bg-[hsl(var(--muted))] rounded">{errorKey}</code> in your env or props)
            </span>
          )}
        </div>
      )}

      <div ref={containerRef} />

      <noscript>
        <p className="mt-4 text-sm">
          JavaScript is required to load the contact form. Email <a href="mailto:hello@regtime.com">hello@regtime.com</a>.
        </p>
      </noscript>
    </div>
  );
}