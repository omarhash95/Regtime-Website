import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { HelpCircle, Book, FileQuestion, MessageCircle } from 'lucide-react'

const helpTopics = [
  {
    title: 'Getting Started',
    icon: Book,
    description: 'Learn the basics of using Regtime',
  },
  {
    title: 'Project Management',
    icon: FileQuestion,
    description: 'How to create and manage projects',
  },
  {
    title: 'Property Search',
    icon: HelpCircle,
    description: 'Search and analyze NYC properties',
  },
  {
    title: 'Contact Support',
    icon: MessageCircle,
    description: 'Get help from our support team',
  },
]

export default function HelpPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Help Center</h1>
        <p className="text-muted-foreground mt-1">
          Find answers and get support
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {helpTopics.map((topic) => (
          <Card key={topic.title} className="hover:border-primary transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <topic.icon className="h-5 w-5 text-primary" />
                {topic.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{topic.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
