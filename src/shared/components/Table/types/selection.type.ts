import type { OnChangeFn, RowSelectionState } from '@tanstack/react-table';

export type TSelection = {
  type: 'multi' | 'single';
  rowSelection: { [index: number]: boolean };
  setRowSelection: OnChangeFn<RowSelectionState>;
};
