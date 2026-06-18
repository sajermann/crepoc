import { create } from 'zustand';
import { ELogout } from '~/shared/enums';
import type { TUser } from '~/shared/types';
import { type TTypeOptions, useToast } from '../useToast';
import { useToken } from '../useToken';

const LOGOUT_TYPE = {
  [ELogout.UNAUTHORIZED]: {
    message: 'YOUR_CREDENTIALS_EXPIRED',
    toastType: 'error' as TTypeOptions,
    id: 'jwt_expired',
  },
  [ELogout.HANDLE_BY_USER]: {
    message: 'SUCCESS_LOGOUT',
    toastType: 'success' as TTypeOptions,
    id: 'logout_by_user',
  },
};

type TProps = {
  userLogged: TUser | null;
  setUserLogged: (data: TUser | null) => void;
  logout: (type: ELogout) => void;
};

export const useUserLogged = create<TProps>()(set => ({
  userLogged: null,
  setUserLogged: data => set(state => ({ ...state, userLogged: data })),
  logout: (type: ELogout) => {
    useToken.getState().clear();
    set(state => ({ ...state, userLogged: null }));
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { customToast } = useToast();

    customToast(LOGOUT_TYPE[type].message, {
      type: LOGOUT_TYPE[type].toastType,
      id: LOGOUT_TYPE[type].id,
    });
  },
}));

async function initializeUserLoggedData() {
  const result = await useToken.getState().extractUserInfoFromJwt();
  useUserLogged.setState(data => ({ ...data, userLogged: result }));
}

initializeUserLoggedData();
