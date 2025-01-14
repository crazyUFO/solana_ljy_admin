import type { FormSchema } from '@/components/core/schema-form/';

export const WalletSchemas: FormSchema[] = [
  {
    field: 'walletAddress',
    component: 'Input',
    label: '地址',
    rules: [{ required: true }],
  },
  {
    field: 'type',
    component: 'Select',
    defaultValue: 1,
    componentProps: {
      options: [
        {
          label: '交易所地址',
          value: 1,
        },
        {
          label: '钱包地址',
          value: 2,
        },
      ],
    },
    label: '类型',
  },
  {
    field: 'label',
    component: 'Input',
    label: '备注',
  },
];
