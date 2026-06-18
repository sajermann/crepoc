import type { ChangeEvent } from 'react';
import type { TCep } from '../TCep';
import type { TCnpj } from '../TCnpj';
import type { TCpf } from '../TCpf';
import type { TCurrency } from '../TCurrency';

export type TBeforeChange = {
  removeNumber?: boolean;
  removeUpperCase?: boolean;
  removeLowerCase?: boolean;
  removeSpecialCharacter?: boolean;
  regexForReplace?: RegExp;
  fn?: (e: ChangeEvent<HTMLInputElement>) => ChangeEvent<HTMLInputElement>;
  applyMask?: TCurrency | TCnpj | TCpf | TCep;
};
