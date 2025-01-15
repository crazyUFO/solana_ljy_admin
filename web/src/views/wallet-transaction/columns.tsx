import { Tag } from 'ant-design-vue';
import type { TableColumn } from '@/components/core/dynamic-table';
import { formatToDateTime } from '@/utils/dateUtil';

export const transactionColumns: TableColumn[] = [
  {
    title: '交易签名',
    dataIndex: 'transactionSignature',
    ellipsis: true,
    resizable: true,
    width: 200,
    minWidth: 100,
    maxWidth: 700,
  },
  {
    title: '代币地址',
    dataIndex: 'ca',
    ellipsis: true,
    resizable: true,
    width: 200,
    minWidth: 100,
    maxWidth: 500,
  },
  {
    title: '钱包地址',
    dataIndex: 'walletAddress',
    ellipsis: true,
    resizable: true,
    width: 200,
    minWidth: 100,
    maxWidth: 500,
  },
  {
    title: '购买金额(SOL)',
    dataIndex: 'purchaseAmount',
    width: 100,
    formItemProps: {
      componentProps: {
        placeholder: '输入范围,如0.6-1.1,输入单个数字视为下限',
      },
    },
  },
  {
    title: '代币市值',
    dataIndex: 'tokenMarketValue',
    width: 150,
    formItemProps: {
      componentProps: {
        placeholder: '输入范围,如10000-30000,输入单个数字视为下限',
      },
    },
  },
  {
    title: '最高市值',
    dataIndex: 'tokenMarketValueHeight',
    width: 150,
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
        placeholder: '输入范围,如0.1-0.6,输入单个数字视为下限',
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
    title: '回调消息',
    dataIndex: 'failureReason',
    width: 100,
    hideInSearch: true,
    ellipsis: true,
    resizable: true,
    minWidth: 100,
    maxWidth: 500,
  },
  {
    title: '是否拉黑',
    dataIndex: 'blacklistId',
    hideInSearch: true,
    hideInTable: true,
    width: 100,
    customRender: ({ text }) => {
      if (text) {
        return <Tag color="red">是</Tag>;
      } else {
        return <Tag color="green">否</Tag>;
      }
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
        return <span>-</span>;
      }
    },
    formItemProps: {
      componentProps: {
        placeholder: '输入范围,如400-700,输入单个数字视为下限',
      },
    },
  },
  {
    title: '购买单价(usd)',
    dataIndex: 'buyPrice',
    width: 100,
    customRender: ({ text }) => {
      if (text != null) {
        if (text) {
          return <span>{(text * 1).toFixed(11)}</span>;
        }
      } else {
        return <span>-</span>;
      }
    },
  },
  {
    title: '代币创建',
    dataIndex: 'tokenCreatedAt',
    hideInSearch: true,
    width: 100,
    customRender({ text }) {
      return text ? formatToDateTime(text) : '-';
    },
  },
  {
    title: '订单买入',
    dataIndex: 'buyOderAt',
    width: 100,
    hideInSearch: true,
    customRender({ text }) {
      return text ? formatToDateTime(text) : '-';
    },
  },
  {
    title: '发送交易',
    dataIndex: 'sentToExchangeAt',
    width: 100,
    hideInSearch: true,
    customRender({ text }) {
      return text ? formatToDateTime(text) : '-';
    },
  },
  {
    title: '发送播报',
    dataIndex: 'sentToBroadcastAt',
    width: 100,
    hideInSearch: true,
    customRender({ text }) {
      return text ? formatToDateTime(text) : '-';
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 100,
    hideInSearch: true,
    hideInTable: true,
    customRender({ text }) {
      return text ? formatToDateTime(text) : '-';
    },
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    hideInSearch: true,
    hideInTable: true,
    customRender({ text }) {
      return text ? formatToDateTime(text) : '-';
    },
  },
];
