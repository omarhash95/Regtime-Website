const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

interface FetchOptions {
  method?: string
  body?: any
  headers?: Record<string, string>
}

async function supabaseFetch(endpoint: string, options: FetchOptions = {}) {
  const url = `${SUPABASE_URL}/rest/v1/${endpoint}`

  const headers: Record<string, string> = {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation',
    ...options.headers,
  }

  const config: RequestInit = {
    method: options.method || 'GET',
    headers,
    cache: 'no-store',
  }

  if (options.body) {
    config.body = JSON.stringify(options.body)
  }

  const response = await fetch(url, config)

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Database error: ${error}`)
  }

  const data = await response.json()
  return data
}

export const db = {
  from: (table: string) => ({
    select: async (columns = '*', filters: Record<string, any> = {}) => {
      let endpoint = `${table}?select=${columns}`

      Object.entries(filters).forEach(([key, value]) => {
        endpoint += `&${key}=eq.${value}`
      })

      return supabaseFetch(endpoint)
    },

    insert: async (data: any) => {
      return supabaseFetch(table, {
        method: 'POST',
        body: Array.isArray(data) ? data : [data],
      })
    },

    update: async (data: any, filters: Record<string, any>) => {
      let endpoint = table
      const filterParams = new URLSearchParams()

      Object.entries(filters).forEach(([key, value]) => {
        filterParams.append(key, `eq.${value}`)
      })

      endpoint += `?${filterParams.toString()}`

      return supabaseFetch(endpoint, {
        method: 'PATCH',
        body: data,
      })
    },

    delete: async (filters: Record<string, any>) => {
      let endpoint = table
      const filterParams = new URLSearchParams()

      Object.entries(filters).forEach(([key, value]) => {
        filterParams.append(key, `eq.${value}`)
      })

      endpoint += `?${filterParams.toString()}`

      return supabaseFetch(endpoint, {
        method: 'DELETE',
      })
    },
  }),
}
