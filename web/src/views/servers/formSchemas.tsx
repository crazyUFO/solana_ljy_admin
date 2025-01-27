import type { FormSchema } from '@/components/core/schema-form/';
import { hasPermission } from '@/permission';
export const serversettingSchemas: FormSchema[] = [
  // 全局设置
  {
    field: 'divider-basic',
    component: 'Divider',
    label: '公共配置',
    componentProps: {
      orientation: 'center',
    },
  },
  {
    field: 'name',
    component: 'Input',
    label: '名称',
    rules: [{ required: true }],
  },
  {
    field: 'solscan_token',
    component: 'Input',
    label: 'solsanToken',
    rules: [{ required: true }],
  },
  {
    field: 'helius_api_key',
    component: 'Input',
    label: 'heliusToken',
    rules: [{ required: true }],
  },
  {
    field: 'purchase_amount',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '单笔购买',
    rules: [{ required: true, type: 'number' }],
  },
  {
    field: 'day_interval',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '天数限制',
    helpMessage: '只针对type1,type2,除开单独设置时候的天数',
    rules: [{ required: true, type: 'number' }],
  },
  {
    field: 'min_market_cap',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '最低市值',
    rules: [{ required: true, type: 'number' }],
  },
  {
    field: 'max_market_cap',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '最高市值',
    rules: [{ required: true, type: 'number' }],
  },
  {
    field: 'dev_team_sol_with_sub',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    helpMessage: '当dev存在小号时，sol的上限的限制',
    label: 'dev有小号sol限制',
    rules: [{ required: true, type: 'number' }],
    labelWidth: 150,
  },
  {
    field: 'dev_team_sol_without_sub',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    helpMessage: '当dev不存在小号时，sol的上限的限制',
    label: 'dev没小号sol限制',
    rules: [{ required: true, type: 'number' }],
    labelWidth: 150,
  },
  {
    field: 'blacklist_ratio',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '黑盘比例',
    helpMessage: '筛选黑盘的比例0-1',
    rules: [{ required: true, type: 'number' }],
  },
  {
    field: 'profit_7d',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '7天盈利',
    helpMessage: '7天盈利的金额',
    rules: [{ required: true, type: 'number' }],
  },
  {
    field: 'win_rate_7d',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '七天胜率',
    helpMessage: '7天的胜负率0-1',
    rules: [{ required: true, type: 'number' }],
  },
  {
    field: 'buy_frequency',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '七天买入频率',
    helpMessage: '七天内买入的单数',
    rules: [{ required: true, type: 'number' }],
    labelWidth: 150,
  },
  {
    field: 'remove_duplicates_by_name',
    component: 'Switch',
    colProps: {
      span: 12,
    },
    helpMessage: '发送到交易,同名的symbol过滤',
    label: '交易过滤同名',
    componentProps: {
      value: false,
    },
    labelWidth: 150,
  },
  {
    field: 'remove_chinese_by_name',
    component: 'Switch',
    colProps: {
      span: 12,
    },
    helpMessage: '发送到交易,中文symbol过滤',
    label: '交易过滤中文',
    componentProps: {
      value: false,
    },
    labelWidth: 150,
  },
  {
    field: 'subscription_cycle',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    helpMessage: '单位是分钟，决定一个token的释放时间',
    label: '订阅活跃度',
    rules: [{ required: true, type: 'number' }],
  },
  {
    field: 'transaction_address_group',
    component: 'InputTextArea',
    label: '回调地址',
    helpMessage: '通知交易端的回调地址',
    rules: [{ type: 'string' }],
    vShow: () => hasPermission('system:role:create'),
  },
  {
    field: 'divider-basic',
    component: 'Divider',
    label: '公共配置-跨度检测设置',
    componentProps: {
      orientation: 'center',
    },
  },
  // 跨度设置
  {
    field: 'spread_detection_settings_enabled',
    component: 'Switch',
    label: '检测开关',
    componentProps: ({ formInstance }) => ({
      onChange(e) {
        console.log('开关状态:', e);
        requestAnimationFrame(() => {
          e ? formInstance?.validateFields() : formInstance?.clearValidate();
        });
      },
    }),
  },
  {
    field: 'spread_detection_settings_spread',
    component: 'InputNumber',
    label: '跨度',
    colProps: {
      span: 12,
    },
    dynamicRules: ({ formModel }) => {
      return formModel.spread_detection_settings_enabled
        ? [{ required: true, message: '请填写跨度' }]
        : [];
    },
  },
  {
    field: 'spread_detection_settings_amount_range',
    component: 'Input',
    colProps: {
      span: 12,
    },
    label: 'sol范围',
    helpMessage: 'sol的范围0-n',
    dynamicRules: ({ formModel }) => {
      return formModel.spread_detection_settings_enabled
        ? [
            { required: true, message: '请输入sol范围，用“-”隔开' },
            {
              pattern: /^(0|[1-9]\d*)(\.\d+)?-(0|[1-9]\d*)(\.\d+)?$/, // 正则：匹配范围
              message: '请输入正确的范围，例如：0-0.3',
            },
          ]
        : [];
    },
  },
  {
    field: 'spread_detection_settings_allowed_occurrences',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '允许出现的次数',
    rules: [{ type: 'number' }],
    helpMessage: '范围内允许出现的次数，满足允许的次数计次会+1',
    labelWidth: 150,
    dynamicRules: ({ formModel }) => {
      return formModel.spread_detection_settings_enabled
        ? [{ required: true, message: '请填写允许出现的次数' }]
        : [];
    },
  },
  {
    field: 'spread_detection_settings_max_count',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '允许的次数计次',
    rules: [{ type: 'number' }],
    helpMessage: '对允许次数进行计次，触发之后就排除',
    labelWidth: 150,
    dynamicRules: ({ formModel }) => {
      return formModel.spread_detection_settings_enabled
        ? [{ required: true, message: '请填写允许的次数计次' }]
        : [];
    },
  },
  // 类型1设置
  {
    field: 'divider-basic',
    component: 'Divider',
    label: '类型一设置',
    componentProps: {
      orientation: 'center',
    },
  },
  {
    field: 'type1_settings_transaction_enabled',
    component: 'Switch',
    label: '交易发送',
    helpMessage: '打开之后，开启会发送到交易',
  },
  {
    field: 'type1_settings_purchase_amount',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '单笔购买',
    helpMessage: '单独设置,购买的金额',
    rules: [{ type: 'number' }],
  },
  {
    field: 'type1_settings_day_interval',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '天数间隔',
    helpMessage: '单独设置,天数间隔',
    rules: [{ required: true, type: 'number' }],
  },
  {
    field: 'type1_settings_market_cap_limit',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '最小市值',
    helpMessage: '单独设置,最小市值',
    rules: [{ required: true, type: 'number' }],
  },
  {
    field: 'type1_settings_sol_limit',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: 'sol余额',
    helpMessage: '检测符合sol余额的钱包',
    rules: [{ required: true, type: 'number' }],
  },
  {
    field: 'type1_settings_token_balance',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '代币余额',
    helpMessage: '检测符合tokens余额的钱包',
    rules: [{ required: true, type: 'number' }],
  },
  // 类型2设置
  {
    field: 'divider-basic',
    component: 'Divider',
    label: '类型二设置',
    componentProps: {
      orientation: 'center',
      plain: true,
    },
  },
  {
    field: 'type2_settings_transaction_enabled',
    component: 'Switch',
    label: '交易发送',
    helpMessage: '打开之后，开启会发送到交易',
  },
  {
    field: 'type2_settings_purchase_amount',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '单笔购买',
    helpMessage: '单独设置,购买的金额',
    rules: [{ type: 'number' }],
  },
  {
    field: 'type2_settings_day_interval',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '天数间隔',
    helpMessage: '单独设置,天数间隔',
    rules: [{ required: true, type: 'number' }],
  },
  {
    field: 'type2_settings_market_cap_limit',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '最小市值',
    helpMessage: '单独设置,最小市值',
    rules: [{ required: true, type: 'number' }],
  },
  {
    field: 'type2_settings_profit_per_token',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '单币盈利',
    helpMessage: '某个钱包，盈利最高的数额',
    rules: [{ required: true, type: 'number' }],
  },
  {
    field: 'type2_settings_profit_rate_per_token',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '单币盈利率',
    helpMessage: '单币盈利最高的倍数',
    rules: [{ required: true, type: 'number' }],
  },
  // 类型3设置
  {
    field: 'divider-basic',
    component: 'Divider',
    label: '类型三设置',
    componentProps: {
      orientation: 'center',
      plain: true,
    },
  },
  {
    field: 'type3_settings_transaction_enabled',
    component: 'Switch',
    label: '交易发送',
    helpMessage: '打开之后，开启会发送到交易',
  },
  {
    field: 'type3_settings_purchase_amount',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '单笔购买',
    helpMessage: '单独设置,购买的金额',
    rules: [{ type: 'number' }],
  },
  {
    field: 'type3_settings_day_interval',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '天数间隔',
    helpMessage: '单独设置,天数间隔',
    rules: [{ required: true, type: 'number' }],
  },
  // 类型4设置
  {
    field: 'divider-basic',
    component: 'Divider',
    label: '类型四设置',
    componentProps: {
      orientation: 'center',
      plain: true,
    },
  },
  {
    field: 'type4_settings_transaction_enabled',
    component: 'Switch',
    label: '交易发送',
    helpMessage: '打开之后，开启会发送到交易',
  },
  {
    field: 'type4_settings_purchase_amount',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '单笔购买',
    helpMessage: '单独设置,购买的金额',
    rules: [{ type: 'number' }],
  },
  {
    field: 'type4_settings_parent_wallet_transaction_range',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '转账记录范围',
    helpMessage: '扫描设置时间内的转账',
    rules: [{ required: true, type: 'number' }],
  },
  {
    field: 'type4_settings_day_interval',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '天数间隔',
    helpMessage: '扫描设置时间内的转账',
    rules: [{ required: true, type: 'number' }],
  },
  {
    field: 'type4_settings_parent_wallet_transfer_sol',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '父钱包转账sol',
    helpMessage: '父钱包转账sol的额度',
    rules: [{ required: true, type: 'number' }],
  },
  {
    field: 'type4_settings_token_quantity',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '代币账户数',
    helpMessage: '父钱包的代币账户数',
    rules: [{ required: true, type: 'number' }],
  },
  {
    field: 'type4_settings_token_balance',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '代币余额',
    helpMessage: '父钱包的代币余额数量',
    rules: [{ required: true, type: 'number' }],
  },
];
