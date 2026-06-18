import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { ELogout } from '~/shared/enums';
import { useToken } from '~/shared/hooks';
import { useToast } from '~/shared/hooks/useToast';
import { useUserLogged } from '~/shared/hooks/useUserLogged';

interface CustomAxiosRequestHeaders extends AxiosRequestHeaders {
  refresh_token: string;
  Authorization: string;
  'Accept-Language': string;
}

export default function Interceptor(api: AxiosInstance) {
  const { customToast } = useToast();
  const onResponse = (response: AxiosResponse) => {
    if (response.headers.accesstoken && response.headers.refreshtoken) {
      useToken.setState(rest => ({
        ...rest,
        accessToken: response.headers.accesstoken,
        refreshToken: response.headers.refreshtoken,
      }));
    }
    return response;
  };

  const onResponseError = async (error: AxiosError) => {
    if (!error.response) {
      customToast('No connection with server', {
        type: 'error',
        id: 'NO_CONNECTION',
      });
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      useUserLogged.getState().logout(ELogout.UNAUTHORIZED);
      return null;
    }

    if (error.response?.status === 500) {
      console.log(error, error.response);
      customToast('Internal server error', {
        type: 'error',
        id: 'status_code_500',
      });
    }

    return Promise.reject(error);
  };

  api.interceptors.response.use(onResponse, onResponseError);

  const onRequest = (
    config: InternalAxiosRequestConfig<CustomAxiosRequestHeaders>,
  ) => {
    const { accessToken, refreshToken } = useToken.getState();
    const { headers } = config;
    config.headers = {
      ...headers,
      refresh_token: `${refreshToken}`,
      Authorization: `Bearer ${accessToken}`,
      'Accept-Language': 'pt-BR',
    } as CustomAxiosRequestHeaders;

    return config;
  };

  const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    console.error(`[request error] [${JSON.stringify(error)}]`);
    return Promise.reject(error);
  };

  api.interceptors.request.use(e => onRequest(e), onRequestError);
}
