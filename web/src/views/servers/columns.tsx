// import { Tag, Image } from 'ant-design-vue';
import type { TableColumn } from '@/components/core/dynamic-table';

export const serversettingColumns: TableColumn[] = [
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: 'ip地址',
    dataIndex: 'ip',
  },
];
