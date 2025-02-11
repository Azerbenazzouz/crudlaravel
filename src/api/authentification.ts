import type { ResponseModel } from '@/models/Response'
import axios from 'axios'
import ApiUrl from './apiConfig'
import type { User } from '@/models/User'

export type LoginModel = {
  email: string
  password: string
}

export type RegisterModel = {
  name: string
  email: string
  birthday: string
  password: string
}

export type LoginResponseModel = {
  accessToken: string
  refreshToken: string
  tokenType: string
  expiresIn: number
}

const AuthLogin = async ( loginModel: LoginModel ): Promise<ResponseModel<LoginResponseModel> | ResponseModel<null>> => {
  return await axios
    .post<ResponseModel<LoginResponseModel>>(ApiUrl + 'auth/login', loginModel)
    .then((response) => {
      return {
        status: response.data.status,
        code: response.data.code,
        message: response.data.message,
        data: response.data.data as LoginResponseModel,
        timestamp: response.data.timestamp,
      } as ResponseModel<LoginResponseModel>
    })
    .catch((error) => {
      return {
        status: error.response?.data?.status ?? false,
        code: error.response?.data?.code ?? 500,
        message: error.response?.data?.message ?? 'Internal Server Error',
        errors: error.response?.data?.errors ?? {},
        timestamp: new Date().toISOString(),
      } as ResponseModel<null>
    })
}

const AuthRegister = async ( registerModel: RegisterModel ): Promise<ResponseModel<User> | ResponseModel<null>> => {
  return await axios
    .post<ResponseModel<User>>(ApiUrl + 'auth/register', registerModel)
    .then((response) => {
      return {
        status: response.data.status,
        code: response.data.code,
        message: response.data.message,
        data: response.data.data as User,
        timestamp: response.data.timestamp,
      } as ResponseModel<User>
    })
    .catch((error) => {
      return {
        status: error.response?.data?.status ?? false,
        code: error.response?.data?.code ?? 500,
        message: error.response?.data?.message ?? 'Internal Server Error',
        errors: error.response?.data?.errors ?? {},
        timestamp: new Date().toISOString(),
      } as ResponseModel<null>
    })
}

// exports all functions
export { AuthLogin, AuthRegister }
