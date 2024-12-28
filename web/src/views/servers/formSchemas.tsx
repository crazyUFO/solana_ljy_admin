import type { FormSchema } from '@/components/core/schema-form/';

export const serversettingSchemas: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '名称',
    rules: [{ required: true }],
  },
  // {
  //   field: 'ip',
  //   component: 'Input',
  //   label: 'ip地址',
  //   rules: [{ required: true }],
  // },
  // {
  //   field: 'port',
  //   component: 'Input',
  //   colProps: {
  //     span: 12,
  //   },
  //   label: '端口',
  //   rules: [{ required: true }],
  // },
  // {
  //   field: 'password',
  //   component: 'Input',
  //   colProps: {
  //     span: 12,
  //   },
  //   label: '密码',
  //   rules: [{ required: true }],
  // },
  {
    field: 'SOLSCAN_TOKEN',
    component: 'Input',
    label: 'solsanToken',
    rules: [{ required: true }],
  },
  {
    field: 'HELIUS_API_KEY',
    component: 'Input',
    label: 'heliusToken',
    rules: [{ required: true }],
  },
  {
    field: 'SINGLE_SOL',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '单笔购买>=',
    rules: [{ required: true, type: 'number' }],
  },
  {
    field: 'DAY_NUM',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '天数限制>=',
    rules: [{ required: true, type: 'number' }],
  },
  {
    field: 'BLANCE',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: 'SOL余额>=',
    rules: [{ required: true, type: 'number' }],
  },
  {
    field: 'TOKEN_BALANCE',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: 'tokens余额>=',
    rules: [{ required: true, type: 'number' }],
  },
  {
    field: 'MIN_TOKEN_CAP',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: 'token市值>=',
    rules: [{ required: true, type: 'number' }],
  },
  {
    field: 'MAX_TOKEN_CAP',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: 'token市值<',
    rules: [{ required: true, type: 'number' }],
  },
  {
    field: 'TOTAL_PROFIT',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '单币盈利>=',
    helpMessage: '老鲸鱼暴击限制，单币的盈利限制值',
    rules: [{ required: true, type: 'number' }],
  },
  {
    field: 'TOKEN_EXPIRY',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    helpMessage: '单位是分钟，决定一个token的释放时间',
    label: '订阅活跃度',
    rules: [{ required: true, type: 'number' }],
  },
  {
    field: 'CALL_BACK_URL',
    component: 'Input',
    label: '回调地址',
    helpMessage: '通知交易端的回调地址',
    rules: [{ type: 'string' }],
  },
];
