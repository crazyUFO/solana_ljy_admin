import { Tag } from 'ant-design-vue';
import type { TableColumn } from '@/components/core/dynamic-table';
import { formatToDateTime } from '@/utils/dateUtil';

export const transactionColumns: TableColumn[] = [
  {
    title: '交易签名',
    dataIndex: 'transactionSignature',
    ellipsis: true,
  },
  {
    title: '代币地址',
    dataIndex: 'ca',
    ellipsis: true,
  },
  {
    title: '钱包地址',
    dataIndex: 'walletAddress',
    ellipsis: true,
  },
  {
    title: '购买金额(SOL)',
    dataIndex: 'purchaseAmount',
    width: 100,
  },
  {
    title: '代币市值',
    dataIndex: 'tokenMarketValue',
    width: 150,
  },
  {
    title: '最高市值',
    dataIndex: 'tokenMarketValueHeight',
    width: 150,
    hideInTable: true,
    hideInSearch: true,
  },
  {
    title: '黑盘比例',
    dataIndex: 'blackMarketRatio',
    width: 100,
    customRender: ({ text }) => {
      return `${(text * 100).toFixed(2)}%`;
    },
    formItemProps: {
      componentProps: {
        placeholder: '输入比例,如:0.1 0.2 0.3 向上匹配查找',
      },
    },
  },
  {
    title: '播报类型',
    dataIndex: 'type',
    width: 150,
    customRender: ({ text }) => {
      switch (text) {
        case 1:
          return <Tag color="blue">老鲸鱼钱包</Tag>;
        case 2:
          return <Tag color="blue">老鲸鱼暴击</Tag>;
        case 3:
          return <Tag color="blue">老钱包买单</Tag>;
        case 4:
          return <Tag color="blue">老鲸鱼转账</Tag>;
        default:
          break;
      }
    },
    formItemProps: {
      component: 'Select',
      componentProps: {
        options: [
          {
            label: '全部',
            value: '',
          },
          {
            label: '老鲸鱼钱包',
            value: 1,
          },
          {
            label: '老鲸鱼暴击',
            value: 2,
          },
          {
            label: '老钱包买单',
            value: 3,
          },
          {
            label: '老鲸鱼转账',
            value: 4,
          },
        ],
      },
    },
  },
  {
    title: '代币符号',
    dataIndex: 'tokenSymbol',
    width: 100,
  },
  {
    title: '发送交易',
    dataIndex: 'isSentToExchange',
    width: 100,
    customRender: ({ text }) => {
      if (text == 0) {
        return <Tag color="red">否</Tag>;
      } else {
        return <Tag color="green">是</Tag>;
      }
    },
    formItemProps: {
      component: 'Select',
      componentProps: {
        options: [
          {
            label: '全部',
            value: '',
          },
          {
            label: '是',
            value: '1',
          },
          {
            label: '否',
            value: '0',
          },
        ],
      },
    },
  },
  {
    title: '盈利金额',
    dataIndex: 'profit',
    width: 100,
    customRender: ({ text }) => {
      if (text != null) {
        if (text == 0) {
          return <span>{text}</span>;
        }
        if (text > 0) {
          return <span style="color:green;">{text}</span>;
        }
        if (text < 0) {
          return <span style="color:red;">{text}</span>;
        }
      } else {
        return <span>--</span>;
      }
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    hideInSearch: true,
    customRender({ text }) {
      return text ? formatToDateTime(text) : '-';
    },
    hideInTable: true,
  },
  {
    title: '更新时间',
    width: 150,
    dataIndex: 'updatedAt',
    hideInSearch: true,
    customRender({ text }) {
      return text ? formatToDateTime(text) : '-';
    },
  },
];
