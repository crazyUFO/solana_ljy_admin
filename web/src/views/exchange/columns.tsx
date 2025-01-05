import type { TableColumn } from '@/components/core/dynamic-table';

export const walletColumns: TableColumn[] = [
  {
    title: '地址',
    dataIndex: 'walletAddress',
  },
  {
    title: '备注',
    dataIndex: 'label',
  },
];
