/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext } from 'react';
import { Context } from '../../components/ContextProvider';

type TUseTableMegaProps = object;

export function useTableMega(_?: TUseTableMegaProps) {
  const { ...rest } = useContext(Context);

  return {
    ...rest,
  };
}
