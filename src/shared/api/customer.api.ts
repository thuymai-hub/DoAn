import { apiServices, urlApiServices } from 'config/configuration';
import { createApiInstance } from 'shared/api';
import { ResponseApi } from 'shared/api/types';

const ApiBaseService = createApiInstance(apiServices.API_IDP as string);
const ACCOUNT_URL = `${urlApiServices.API_IDP}/v1/amdin/account`;

export const requestGetAccounts = (payload: object): Promise<ResponseApi<any>> => {
  return ApiBaseService.get(ACCOUNT_URL, { params: payload });
};

export const requestGetDetailAccount = (id: string): Promise<ResponseApi<any>> => {
  return ApiBaseService.get(`${ACCOUNT_URL}/${id}`);
};
