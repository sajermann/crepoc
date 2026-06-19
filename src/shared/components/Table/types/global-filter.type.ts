import type { FilterFnOption } from '@tanstack/react-table';
import type {
  DetailedHTMLProps,
  Dispatch,
  InputHTMLAttributes,
  SetStateAction,
} from 'react';

export type TGlobalFilter<T, U> = {
  controlled?: {
    filter: U;
    setFilter: Dispatch<SetStateAction<U>>;
    globalFilterFn?: FilterFnOption<T>;
  };

  showInput?: boolean;
  inputProps?: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
};
