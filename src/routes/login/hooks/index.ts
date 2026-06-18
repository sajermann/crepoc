import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { useMemo } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
// import { useNavigate } from "react-router";
import { z } from 'zod';
import { create } from 'zustand';
import { CONSTANTS } from '~/shared/constants';
import { useToken } from '~/shared/hooks';
import { useAxios } from '~/shared/hooks/useAxios';
import { useUserLogged } from '~/shared/hooks/useUserLogged';
import { delay } from '~/shared/utils/delay';

type TUseLoginInternalProps = {
  isLoading: boolean;
  setIsLoading: (data: boolean) => void;
};

const useContainersInternal = create<TUseLoginInternalProps>()(set => ({
  isLoading: false,
  setIsLoading: (data: boolean) =>
    set(state => ({
      ...state,
      isLoading: data,
    })),
}));

export function useLogin() {
  const { fetchData } = useAxios();
  const { isLoading, setIsLoading } = useContainersInternal();
  const navigate = useNavigate();
  const { setAccessToken, setRefreshToken, extractUserInfoFromJwt } =
    useToken();
  const { setUserLogged } = useUserLogged();

  const formSchema = z.object({
    username: z.string().nonempty('Field is required'),
    password: z.string().nonempty('Field is required'),
  });

  type FormData = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSuccessLogin = async (data: {
    access_token: string;
    refresh_token: string;
  }) => {
    setAccessToken(data.access_token);
    setRefreshToken(data.refresh_token);
    setUserLogged(await extractUserInfoFromJwt());
    setIsLoading(false);
    navigate({ to: CONSTANTS.URL.DASHBOARD });
  };

  const onErrorLogin = () => {
    setIsLoading(false);
  };

  const handleLogin: SubmitHandler<FormData> = async data => {
    formSchema.parse({ ...data });
    setIsLoading(true);
    try {
      await delay(1000);
      const isLoginValid =
        data.username === import.meta.env.VITE_USERNAME &&
        data.password === import.meta.env.VITE_PASSWORD;
      if (!isLoginValid) {
        return;
      }
      await onSuccessLogin({
        access_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwidXNlcm5hbWUiOiJhZG1pbiIsIm5hbWUiOiJCcnVubyBTYWplcm1hbm4iLCJlbWFpbCI6IiIsInJvbGVzIjpbImFkbWluIl19.jZP8NdZX7lFjXBUIc4xDwuEuVPGQJ6GhLrbAOVURLGA',
        refresh_token: '',
      });
      // const result = await fetchData({
      //   method: 'post',
      //   url: 'v1/auth',
      //   data: {
      //     username: data.username,
      //     password: data.password,
      //   },
      // });

      // if (result?.status === 201) {
      //   await onSuccessLogin(result.data);
      //   return;
      // }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      onErrorLogin();
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginWithGithub = async (code: string) => {
    setIsLoading(true);
    const result = await fetchData({
      method: 'post',
      url: 'v1/auth/login-with-github',
      data: {
        code,
      },
    });
    if (result?.status === 201) {
      await onSuccessLogin(result.data);
      return;
    }
    onErrorLogin();
  };

  return useMemo(
    () => ({
      isLoading,
      handleSubmit: handleSubmit(handleLogin),
      register,
      errors,
      setValue,
      getValues,
      reset,
      handleLoginWithGithub,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLoading, errors],
  );
}
