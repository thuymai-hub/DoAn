import { API_STATUS } from 'config/api-status';
import { toastConfig } from 'config/notify';
import { toast } from 'react-toastify';
import { requestAccessToken } from 'shared/api/auth.api';
import { CliCookieService, CLI_COOKIE_KEYS } from 'shared/services/cli-cookie';
import { handleLogout } from 'shared/utils/functionHelper';

type ErrorApiResponse = {
  response: {
    config: { url: string };
    data: {
      code: number;
      message: string;
    };
  };
} & Error;

const URL_REFRESH_TOKEN = '/api/iam/v1/auth/refresh-token';

export async function handleResponseError(error: ErrorApiResponse) {
  const { data, config } = error.response;

  if (data && data.code === API_STATUS.UNAUTHORIZED) {
    try {
      if (config.url === URL_REFRESH_TOKEN) {
        toast.error(data.message, toastConfig);
        handleLogout();
      } else {
        const res = await requestAccessToken();

        CliCookieService.set(CLI_COOKIE_KEYS.ACCESS_TOKEN, res.data.accessToken?.replace(/"/g, ''));
        CliCookieService.set(
          CLI_COOKIE_KEYS.REFRESH_TOKEN,
          res.data.refreshToken?.replace(/"/g, '')
        );
      }
    } catch (error) {
      console.error('Exception ' + error);
    }
  }

  if (
    (data && data.code === API_STATUS.NOTFOUND) ||
    data.code === API_STATUS.FORBIDDEN ||
    data.code === API_STATUS.SERVER
  ) {
    toast.error(data.message, toastConfig);
  }
  return Promise.reject(error);
}
