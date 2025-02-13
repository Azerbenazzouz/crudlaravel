import type { ResponseModel } from '@/models/Response'
import axios from 'axios'
import ApiUrl from './apiConfig'
import { useAuthStore } from '@/stores/useAuth'

export type GenerateRequestModel = {
  product_id: number
  additional_information: string
}

export type GenerateResponseModel = {
  content: string
}


// social-media-post
const GenerateSocialMediaPost = async (data: GenerateRequestModel): Promise<ResponseModel<GenerateResponseModel> | ResponseModel<null> > => {
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${ApiUrl}generate/social-media-post`,
    data : data,
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`,
      'Content-Type': 'multipart/form-data',
    }
  };

  return await axios.request(config)
  .then((response) => {
    return {
      status: response.data.status,
      code: response.data.code,
      message: response.data.message,
      data: response.data.data as GenerateResponseModel,
      timestamp: response.data.timestamp,
    } as ResponseModel<GenerateResponseModel>
  })
  .catch((error) => {
    return {
      status: error.response?.data?.status ?? false,
      code: error.response?.data?.code ?? 500,
      message: error.response?.data?.message ?? 'Internal Server Error',
      errors: error.response?.data?.errors ?? {},
      timestamp: new Date().toISOString(),
    } as ResponseModel<null>
  });
}

// seo-content
const GenerateSEOContent = async (data: GenerateRequestModel): Promise<ResponseModel<GenerateResponseModel> | ResponseModel<null> > => {
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${ApiUrl}generate/seo-content`,
    data : data,
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`,
      'Content-Type': 'multipart/form-data',
    }
  };

  return await axios.request(config)
  .then((response) => {
    return {
      status: response.data.status,
      code: response.data.code,
      message: response.data.message,
      data: response.data.data as GenerateResponseModel,
      timestamp: response.data.timestamp,
    } as ResponseModel<GenerateResponseModel>
  })
  .catch((error) => {
    return {
      status: error.response?.data?.status ?? false,
      code: error.response?.data?.code ?? 500,
      message: error.response?.data?.message ?? 'Internal Server Error',
      errors: error.response?.data?.errors ?? {},
      timestamp: new Date().toISOString(),
    } as ResponseModel<null>
  });
}

// product-description
const GenerateProductDescription = async (data: GenerateRequestModel): Promise<ResponseModel<GenerateResponseModel> | ResponseModel<null> > => {
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${ApiUrl}generate/product-description`,
    data : data,
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`,
      'Content-Type': 'multipart/form-data',
    }
  };

  return await axios.request(config)
  .then((response) => {
    return {
      status: response.data.status,
      code: response.data.code,
      message: response.data.message,
      data: response.data.data as GenerateResponseModel,
      timestamp: response.data.timestamp,
    } as ResponseModel<GenerateResponseModel>
  })
  .catch((error) => {
    return {
      status: error.response?.data?.status ?? false,
      code: error.response?.data?.code ?? 500,
      message: error.response?.data?.message ?? 'Internal Server Error',
      errors: error.response?.data?.errors ?? {},
      timestamp: new Date().toISOString(),
    } as ResponseModel<null>
  });
}

export { GenerateSocialMediaPost, GenerateSEOContent, GenerateProductDescription }
