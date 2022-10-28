import { apiServices, urlApiServices } from 'config/configuration';
import { createApiInstance } from 'shared/api';
import { ResponseApi } from 'shared/api/types';

const ApiBaseService = createApiInstance(apiServices.API_MERCHANT as string);
const MERCHANT_URL = `${urlApiServices.API_MERCHANT}/v1/admin/merchant`;

export const requestGetMerchant = (payload: object): Promise<ResponseApi<any>> => {
  return ApiBaseService.get(MERCHANT_URL, { params: payload });
};
export const requestCreateMerchant = (payload: object): Promise<ResponseApi<any>> => {
  return ApiBaseService.post(MERCHANT_URL, payload);
};
export const requestUpdateConfigMerchant = (
  id: number | string,
  payload: object
): Promise<ResponseApi<any>> => {
  return ApiBaseService.put(`${MERCHANT_URL}/${id}/config`, payload);
};
export const requestDetailMerchant = (id = ''): Promise<ResponseApi<any>> => {
  return ApiBaseService.get(`${MERCHANT_URL}/${id}`);
};

export const requestAccountsMerchant = (payload: any): Promise<ResponseApi<any>> => {
  return ApiBaseService.get(`${MERCHANT_URL}/${payload.merchantId}/account`, { params: payload });
};
export const requestCreateAccountMerchant = (
  id = '',
  payload: object
): Promise<ResponseApi<any>> => {
  return ApiBaseService.post(`${MERCHANT_URL}/${id}/account`, payload);
};
