import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Privacy() {
  return (
    <div className="bg-background">
      <Header />
      
      <div className="px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-base leading-7 text-muted-foreground">
          <p className="text-base font-semibold leading-7 text-brand-primary">Legal</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-6 text-xl leading-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          <div className="mt-10 max-w-2xl">
            <h2 className="mt-16 text-2xl font-bold tracking-tight text-foreground">Information We Collect</h2>
            <p className="mt-6">
              We collect information you provide directly to us, such as when you create an account, 
              use our services, or contact us for support. This may include:
            </p>
            <ul role="list" className="mt-8 max-w-xl space-y-2 text-muted-foreground">
              <li className="flex gap-x-3">
                <span className="mt-1 h-1.5 w-1.5 flex-none bg-border rounded-full" />
                Name, email address, and contact information
              </li>
              <li className="flex gap-x-3">
                <span className="mt-1 h-1.5 w-1.5 flex-none bg-border rounded-full" />
                Account credentials and profile information
              </li>
              <li className="flex gap-x-3">
                <span className="mt-1 h-1.5 w-1.5 flex-none bg-border rounded-full" />
                Time tracking data and project information
              </li>
              <li className="flex gap-x-3">
                <span className="mt-1 h-1.5 w-1.5 flex-none bg-border rounded-full" />
                Usage data and analytics information
              </li>
            </ul>

            <h2 className="mt-16 text-2xl font-bold tracking-tight text-foreground">How We Use Your Information</h2>
            <p className="mt-6">
              We use the information we collect to provide, maintain, and improve our services, including:
            </p>
            <ul role="list" className="mt-8 max-w-xl space-y-2 text-muted-foreground">
              <li className="flex gap-x-3">
                <span className="mt-1 h-1.5 w-1.5 flex-none bg-border rounded-full" />
                Processing and fulfilling your requests
              </li>
              <li className="flex gap-x-3">
                <span className="mt-1 h-1.5 w-1.5 flex-none bg-border rounded-full" />
                Providing customer support and technical assistance
              </li>
              <li className="flex gap-x-3">
                <span className="mt-1 h-1.5 w-1.5 flex-none bg-border rounded-full" />
                Improving our products and developing new features
              </li>
              <li className="flex gap-x-3">
                <span className="mt-1 h-1.5 w-1.5 flex-none bg-border rounded-full" />
                Sending important updates and security notifications
              </li>
            </ul>

            <h2 className="mt-16 text-2xl font-bold tracking-tight text-foreground">Data Security</h2>
            <p className="mt-6">
              We implement appropriate technical and organizational measures to protect your personal 
              information against unauthorized access, alteration, disclosure, or destruction. Our 
              security measures include:
            </p>
            <ul role="list" className="mt-8 max-w-xl space-y-2 text-muted-foreground">
              <li className="flex gap-x-3">
                <span className="mt-1 h-1.5 w-1.5 flex-none bg-border rounded-full" />
                Encryption of data in transit and at rest
              </li>
              <li className="flex gap-x-3">
                <span className="mt-1 h-1.5 w-1.5 flex-none bg-border rounded-full" />
                Regular security audits and penetration testing
              </li>
              <li className="flex gap-x-3">
                <span className="mt-1 h-1.5 w-1.5 flex-none bg-border rounded-full" />
                SOC 2 Type II compliance
              </li>
              <li className="flex gap-x-3">
                <span className="mt-1 h-1.5 w-1.5 flex-none bg-border rounded-full" />
                Access controls and employee training
              </li>
            </ul>

            <h2 className="mt-16 text-2xl font-bold tracking-tight text-foreground">Information Sharing</h2>
            <p className="mt-6">
              We do not sell, trade, or otherwise transfer your personal information to third parties 
              without your consent, except in the following circumstances:
            </p>
            <ul role="list" className="mt-8 max-w-xl space-y-2 text-muted-foreground">
              <li className="flex gap-x-3">
                <span className="mt-1 h-1.5 w-1.5 flex-none bg-border rounded-full" />
                With service providers who assist in our operations
              </li>
              <li className="flex gap-x-3">
                <span className="mt-1 h-1.5 w-1.5 flex-none bg-border rounded-full" />
                When required by law or to protect our rights
              </li>
              <li className="flex gap-x-3">
                <span className="mt-1 h-1.5 w-1.5 flex-none bg-border rounded-full" />
                In connection with a business transfer or acquisition
              </li>
            </ul>

            <h2 className="mt-16 text-2xl font-bold tracking-tight text-foreground">Your Rights</h2>
            <p className="mt-6">
              You have certain rights regarding your personal information, including:
            </p>
            <ul role="list" className="mt-8 max-w-xl space-y-2 text-muted-foreground">
              <li className="flex gap-x-3">
                <span className="mt-1 h-1.5 w-1.5 flex-none bg-border rounded-full" />
                Access to your personal information
              </li>
              <li className="flex gap-x-3">
                <span className="mt-1 h-1.5 w-1.5 flex-none bg-border rounded-full" />
                Correction of inaccurate information
              </li>
              <li className="flex gap-x-3">
                <span className="mt-1 h-1.5 w-1.5 flex-none bg-border rounded-full" />
                Deletion of your personal information
              </li>
              <li className="flex gap-x-3">
                <span className="mt-1 h-1.5 w-1.5 flex-none bg-border rounded-full" />
                Portability of your data
              </li>
            </ul>

            <h2 className="mt-16 text-2xl font-bold tracking-tight text-foreground">Cookies and Tracking</h2>
            <p className="mt-6">
              We use cookies and similar tracking technologies to enhance your experience on our 
              website and services. You can control cookie settings through your browser preferences.
            </p>

            <h2 className="mt-16 text-2xl font-bold tracking-tight text-foreground">Changes to This Policy</h2>
            <p className="mt-6">
              We may update this Privacy Policy from time to time. We will notify you of any material 
              changes by posting the new policy on our website and updating the "Last updated" date.
            </p>

            <h2 className="mt-16 text-2xl font-bold tracking-tight text-foreground">Contact Us</h2>
            <p className="mt-6">
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <div className="mt-6 p-6 bg-muted rounded-lg">
              <p className="font-semibold text-foreground">Regtime Privacy Team</p>
              <p>Email: privacy@regtime.com</p>
              <p>Address: 123 Business Ave, San Francisco, CA 94105</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}