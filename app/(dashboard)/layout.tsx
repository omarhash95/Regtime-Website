import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/login')
  }

  const { data: userData } = await supabase
    .from('users')
    .select('name, email')
    .eq('id', user.id)
    .maybeSingle()

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader user={userData || { email: user.email }} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
