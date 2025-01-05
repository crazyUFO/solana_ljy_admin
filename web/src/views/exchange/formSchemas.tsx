import type { FormSchema } from '@/components/core/schema-form/';

export const WalletSchemas: FormSchema[] = [
  {
    field: 'walletAddress',
    component: 'Input',
    label: '地址',
    rules: [{ required: true }],
  },
  {
    field: 'label',
    component: 'Input',
    label: '备注',
  },
];
