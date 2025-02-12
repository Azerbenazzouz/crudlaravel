export interface User {
  id: number
  name: string
  email: string
  avatar?: string | null
  birthday?: string
  age?: number
  email_verified_at?: string | null
  roles?: Role[]
  created_at?: string
  updated_at?: string
}

export interface Role {
  id: number
  name: string
  slug: string
  permissions?: string[]
}
