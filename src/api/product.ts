import type { PaginatedResponseModel, ResponseModel } from '@/models/Response'
import axios from 'axios'
import ApiUrl from './apiConfig'
import type { Product } from '@/models/Product'
import { useAuthStore } from '@/stores/useAuth'

const AddProduct = async ( product: Product ): Promise<ResponseModel<Product> | ResponseModel<null>> => {
  const formData = new FormData()
  formData.append('name', product.name)
  formData.append('description', product.description)
  formData.append('price', product.price.toString())
  if (product.image && product.image instanceof File) {
    formData.append('image', product.image)
  }

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${ApiUrl}products`,
    data: formData,
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`,
      'Content-Type': 'multipart/form-data',
    },
  }

  return await axios
    .request<ResponseModel<Product>>(config)
    .then((response) => {
      return {
        status: response.data.status,
        code: response.data.code,
        message: response.data.message,
        data: response.data.data as Product,
        timestamp: response.data.timestamp,
      } as ResponseModel<Product>
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

const GetProducts = async (): Promise<ResponseModel<Product[]> | ResponseModel<null>> => {
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${ApiUrl}products`,
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`,
    },
  }

  return await axios
    .request<ResponseModel<PaginatedResponseModel<Product[]>>>(config)
    .then((response) => {
      // console.log(response)
      const data = response?.data?.data?.data.data ?? []
      console.log(data)
      return {
        status: response.data.status,
        code: response.data.code,
        message: response.data.message,
        data: (data as unknown as Product[][]).flat(),
        timestamp: response.data.timestamp,
      } as ResponseModel<Product[]>
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

export { AddProduct, GetProducts }
