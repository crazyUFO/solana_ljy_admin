import { Tag } from 'ant-design-vue';
import type { TableColumn } from '@/components/core/dynamic-table';
import { formatToDateTime } from '@/utils/dateUtil';

export const columns: TableColumn[] = [
  {
    title: '交易签名',
    dataIndex: 'transactionSignature',
  },
  {
    title: '代币地址',
    dataIndex: 'ca',
  },
  {
    title: '钱包地址',
    dataIndex: 'walletAddress',
  },
  {
    title: '购买金额(SOL)',
    dataIndex: 'purchaseAmount',
    searchField: 'minPurchaseAmount',
  },
  {
    title: '代币市值',
    dataIndex: 'tokenMarketValue',
    searchField: 'minTokenMarketValue',
  },
  {
    title: '最高市值',
    dataIndex: 'tokenMarketValueHeight',
    hideInTable: true,
    hideInSearch: true,
    searchField: 'minTokenMarketValueHeight',
  },
  {
    title: '黑盘比例',
    dataIndex: 'blackMarketRatio',
    customRender: ({ text }) => {
      return `${text * 100}%`;
    },
  },
  {
    title: '播报类型',
    dataIndex: 'type',
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
  },
  {
    title: '发送交易',
    dataIndex: 'isSentToExchange',
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
    searchField: 'minProfit',
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    hideInSearch: true,
    customRender({ text }) {
      return text ? formatToDateTime(text) : '-';
    },
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    hideInSearch: true,
    customRender({ text }) {
      return text ? formatToDateTime(text) : '-';
    },
  },
];
