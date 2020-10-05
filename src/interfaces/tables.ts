import { ReactNode } from 'react';

export interface ColumnsType {
  name: string;
  selector: string;
  sortable?: boolean;
  width?: string;
  cell?: ReactNode;
}

export interface RowsType {}
