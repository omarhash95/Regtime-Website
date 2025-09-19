'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface HubSpotFormProps {
  portalId?: string;
  formId?: string;
  region?: string;
  className?: string;
}

export default function HubSpotForm({ 
  portalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID,
  formId = process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID,
  region = process.env.NEXT_PUBLIC_HUBSPOT_REGION,
  className = ''
}: HubSpotFormProps) {
  const formRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    if (!portalId || !formId) {
      setIsLoading(false);
      setHasError(true);
      return;
    }

    // Load HubSpot form script
    const script = document.createElement('script');
    script.src = '//js.hsforms.net/forms/v2.js';
    script.async = true;
    script.onload = () => {
      if (window.hbspt && formRef.current) {
        window.hbspt.forms.create({
          portalId: portalId,
          formId: formId,
          region: region,
          target: formRef.current,
          onFormReady: () => {
            setIsLoading(false);
          },
          onFormSubmit: () => {
            console.log('Form submitted successfully');
          },
          css: `
            .hs-form-field label {
              font-weight: 500;
              color: var(--brand-night);
              margin-bottom: 0.5rem;
              display: block;
            }
            .hs-form-field input,
            .hs-form-field textarea,
            .hs-form-field select {
              width: 100%;
              padding: 0.75rem;
              border: 1px solid #e5e7eb;
              border-radius: 0.375rem;
              font-size: 0.875rem;
              transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
              background-color: white;
              color: var(--brand-night);
              font-family: var(--font-aspekta), sans-serif;
            }
            .hs-form-field input:focus,
            .hs-form-field textarea:focus,
            .hs-form-field select:focus {
              outline: none;
              box-shadow: 0 0 0 3px rgba(120, 199, 234, 0.1);
            }
            .hs-button {
              background-color: var(--brand-baby);
              color: white;
              padding: 0.75rem 1.5rem;
              border: none;
              border-radius: 0.375rem;
              font-weight: 600;
              cursor: pointer;
              transition: background-color 0.15s ease-in-out;
              font-family: var(--font-aspekta), sans-serif;
              width: 100%;
            }
            .hs-button:hover {
              background-color: rgba(120, 199, 234, 0.9);
            }
            .hs-form-field {
              margin-bottom: 1rem;
            }
            .hs-form-field textarea {
              min-height: 100px;
              resize: vertical;
            }
          `
        });
      } else {
        setHasError(true);
        setIsLoading(false);
      }
    };
    script.onerror = () => {
      setHasError(true);
      setIsLoading(false);
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [portalId, formId, region]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // This is a fallback - the actual HubSpot form will handle submissions
    console.log('Fallback form submission:', formData);
  };

  if (!portalId || !formId || hasError) {
    return (
      <div className={`p-6 bg-muted rounded-lg ${className}`}>
        <h3 className="text-lg font-semibold text-foreground mb-4">Contact Us</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstname" className="block text-sm font-medium text-foreground mb-2">
                First Name *
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                required
                value={formData.firstname}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-input rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary bg-background text-foreground"
              />
            </div>
            <div>
              <label htmlFor="lastname" className="block text-sm font-medium text-foreground mb-2">
                Last Name *
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                required
                value={formData.lastname}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-input rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary bg-background text-foreground"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-input rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary bg-background text-foreground"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-input rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary bg-background text-foreground"
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
              Comments
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-input rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary bg-background text-foreground resize-vertical"
              placeholder="Tell us about your project or requirements..."
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-brand-primary text-white py-3 px-6 rounded-md font-semibold hover:bg-brand-primary/90 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className={`hubspot-form-wrapper ${className}`}>
      {isLoading && (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-6 w-6 animate-spin text-brand-primary" />
          <span className="ml-2 text-muted-foreground">Loading form...</span>
        </div>
      )}
      <div ref={formRef} style={{ display: isLoading ? 'none' : 'block' }} />
    </div>
  );
}

// Extend window object for HubSpot
declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (opts: Record<string, any>) => void;
      };
    };
  }
}