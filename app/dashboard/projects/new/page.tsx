'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewProjectPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    project_type: 'affordable_housing',
    budget: '',
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('supabase_token') : null;

      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          project_type: formData.project_type,
          budget: formData.budget ? parseFloat(formData.budget) : null,
          status: 'active',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create project');
      }

      router.push('/dashboard/projects');
    } catch (error) {
      alert('Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/projects" className="p-2 hover:bg-gray-100 rounded-lg transition">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">New Project</h1>
          <p className="text-muted-foreground mt-1">
            Create a new affordable housing project
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-border">
        <h2 className="text-xl font-semibold mb-6">Project Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium">
              Project Name *
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="e.g., Brooklyn Affordable Housing"
              disabled={loading}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide details about this project..."
              disabled={loading}
              rows={4}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="budget" className="block text-sm font-medium">
              Budget
            </label>
            <input
              id="budget"
              type="number"
              step="0.01"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              placeholder="0.00"
              disabled={loading}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-[hsl(var(--primary))] text-primary-foreground rounded-lg hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Project'}
            </button>
            <Link
              href="/dashboard/projects"
              className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
