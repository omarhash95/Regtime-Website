const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

type FetchOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
};

async function supabaseFetch(endpoint: string, options: FetchOptions = {}) {
  const url = `${SUPABASE_URL}/rest/v1/${endpoint}`;
  const headers = {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation',
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Supabase error: ${error}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export const supabase = {
  from: (table: string) => ({
    select: async (columns = '*', filters: Record<string, any> = {}) => {
      const params = new URLSearchParams();
      params.set('select', columns);

      Object.entries(filters).forEach(([key, value]) => {
        params.set(key, `eq.${value}`);
      });

      return supabaseFetch(`${table}?${params.toString()}`);
    },

    insert: async (data: any) => {
      return supabaseFetch(table, {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },

    update: async (data: any, filters: Record<string, any>) => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        params.set(key, `eq.${value}`);
      });

      return supabaseFetch(`${table}?${params.toString()}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      });
    },

    delete: async (filters: Record<string, any>) => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        params.set(key, `eq.${value}`);
      });

      return supabaseFetch(`${table}?${params.toString()}`, {
        method: 'DELETE',
      });
    },
  }),

  auth: {
    signUp: async (email: string, password: string) => {
      const response = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      return response.json();
    },

    signIn: async (email: string, password: string) => {
      const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      return response.json();
    },

    signOut: async (token: string) => {
      const response = await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${token}`,
        },
      });

      return response.ok;
    },

    getUser: async (token: string) => {
      const response = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) return null;
      return response.json();
    },
  },
};
