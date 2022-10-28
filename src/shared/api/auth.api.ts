import { apiServices, urlApiServices } from 'config/configuration';
import { createApiInstance } from 'shared/api';
import { ResponseApi } from 'shared/api/types';
import { LoginRequest, LoginResponse } from '../../features/auth/types';

const ApiBaseService = createApiInstance(apiServices.API_AUTH as string);
const AUTH_URL = `${urlApiServices.API_IAM}/v1/auth`;

export const requestLogin = (payload: LoginRequest): Promise<ResponseApi<LoginResponse>> => {
  return ApiBaseService.post(`${AUTH_URL}/login`, payload);
};

export const requestLogout = (): Promise<ResponseApi<any>> => {
  return ApiBaseService.delete(`${AUTH_URL}/logout`);
};

export const requestAccessToken = (): Promise<ResponseApi<any>> => {
  return ApiBaseService.post(`${AUTH_URL}/refresh-token`);
};
