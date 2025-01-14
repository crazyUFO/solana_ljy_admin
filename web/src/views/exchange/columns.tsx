import { Tag } from 'ant-design-vue';
import type { TableColumn } from '@/components/core/dynamic-table';

export const walletColumns: TableColumn[] = [
  {
    title: '地址',
    dataIndex: 'walletAddress',
  },
  {
    title: '类型',
    dataIndex: 'type',
    customRender: ({ text }) => {
      switch (text) {
        case 1:
          return <Tag color="blue">交易所地址</Tag>;
        case 2:
          return <Tag color="blue">钱包地址</Tag>;
        default:
          break;
      }
    },
  },
  {
    title: '备注',
    dataIndex: 'label',
  },
];
