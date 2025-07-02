import { useQuery } from '@tanstack/react-query'

export type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  country: string
  company: string
  jobTitle: string
  createdAt: string
  avatar: string
  status: 'active' | 'inactive' | 'pending'
}

export function useUsers() {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('/api/user')
      const json = await res.json()
      if (!res.ok) throw new Error(json.message || 'Failed to fetch users')
      return json.data
    },
  })
}
