import { Upload, Download } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function ImportExportPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Import/Export</h1>
        <p className="text-muted-foreground mt-1">
          Import and export project data
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white p-6 rounded-lg border border-border">
          <h2 className="text-xl font-semibold mb-4">Import Data</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Import projects, properties, and units from CSV or Excel files
          </p>
          <button className="inline-flex items-center px-4 py-2 bg-[hsl(var(--primary))] text-primary-foreground rounded-lg hover:opacity-90 transition">
            <Upload className="h-4 w-4 mr-2" />
            Upload File
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg border border-border">
          <h2 className="text-xl font-semibold mb-4">Export Data</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Export your projects and data to CSV or Excel format
          </p>
          <button className="inline-flex items-center px-4 py-2 border border-border rounded-lg hover:bg-muted transition">
            <Download className="h-4 w-4 mr-2" />
            Download Data
          </button>
        </div>
      </div>
    </div>
  );
}
