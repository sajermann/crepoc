import type { ClassValue } from 'clsx';
import clsx from 'clsx';

export function managerClassNames(...inputs: ClassValue[]): string {
  return clsx(...inputs);
}
