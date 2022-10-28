import { apiServices } from 'config/configuration';
import { createApiInstance } from 'shared/api';
import { ResponseApi } from 'shared/api/types';

const ApiBaseService = createApiInstance(apiServices.API_WP as string);

export const requestGetEvents = (payload: object): Promise<ResponseApi<any>> => {
  return ApiBaseService.get("/event", { params: payload });
};
