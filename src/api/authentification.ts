import type { ResponseSuccessModel, ResponseErrorModel } from '@/models/Response'
import axios from 'axios'
import ApiUrl from './apiConfig'

export type LoginModel = {
  email: string
  password: string
}

export type LoginResponseModel = {
  accessToken: string
  refreshToken: string
  tokenType: string
  expiresIn: number
}

const AuthLogin = async (
  loginModel: LoginModel,
): Promise<ResponseSuccessModel<LoginResponseModel> | ResponseErrorModel> => {

  try {
    const response = await axios.post<ResponseSuccessModel<LoginResponseModel>>(
      ApiUrl + 'auth/login',
      loginModel,
    )

    const data: LoginResponseModel = {
      accessToken: response.data.original.data.accessToken,
      refreshToken: response.data.original.data.refreshToken,
      tokenType: response.data.original.data.tokenType,
      expiresIn: response.data.original.data.expiresIn,
    }

    return {
      headers: response.headers,
      original: {
        status: response.data.original.status,
        code: response.data.original.code,
        message: response.data.original.message,
        data: data,
        timestamp: response.data.original.timestamp,
      },
      exception: null,
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        status: false,
        code: 500,
        message: 'Internal Server Error',
        errors: {},
        timestamp: new Date().toISOString(),
      }
    }
    throw error
  }
}

// exports all functions
export { AuthLogin }
