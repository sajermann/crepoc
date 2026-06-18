import type { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import type { TBeforeChange } from '../TBeforeChange';

export type TInput = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  iserror?: boolean;
  onBeforeChange?: TBeforeChange;
  debounce?: number;
};
