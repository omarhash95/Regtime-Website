import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function PropertiesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Property Search</h1>
        <p className="text-muted-foreground mt-1">
          Search NYC properties by BBL, address, or owner
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Enter BBL, address, or owner name..."
                className="w-full"
              />
            </div>
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Search for NYC properties using Borough-Block-Lot (BBL) numbers or property details
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="py-16 text-center">
          <p className="text-muted-foreground">
            Enter a search query to find properties
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
