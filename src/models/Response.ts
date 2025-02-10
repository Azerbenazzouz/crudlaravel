export type ResponseSuccessModel<T> = {
  headers: unknown
  original: {
    status: boolean
    code: number
    message: string
    data: T
    timestamp: string
  }
  exception: unknown | null
}

export type ResponseErrorModel = {
  status: boolean
  code: number
  message: string
  errors: Record<string, string[]>
  timestamp: string
}
