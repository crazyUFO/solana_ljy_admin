import type { FormSchema } from '@/components/core/schema-form/';
import { hasPermission } from '@/permission';
import InputNumberRange from '@/views/demos/form/custom-form/input-number-range.vue';
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
    field: 'purchase_amount_range',
    component: () => InputNumberRange,
    colProps: {
      span: 12,
    },
    label: '金额范围',
    rules: [
      {
        required: true,
        type: 'array',
        trigger: 'change',
        validator(_, value: string[]) {
          const isOk =
            Array.isArray(value) &&
            value.length === 2 &&
            value.every((val) => /^(0|[1-9]\d*)(\.\d+)?$/.test(val));
          return isOk ? Promise.resolve() : Promise.reject('请输入数字范围');
        },
      },
    ],
    // 将多个值映射为多个字段
    transform([minNum, maxNum] = []) {
      console.log(minNum, maxNum);
      return [minNum, maxNum];
    },
  },
  {
    field: 'day_interval',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '天数限制',
    helpMessage: '当四个类型不单独设置天数间隔时,以这个设置为准,单位是(天)',
    rules: [{ required: true, type: 'number' }],
    componentSlots: () => {
      return {
        prefix: () => '≥',
        suffix: () => '天',
      };
    },
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
    helpMessage: '当dev存在小号时,sol的上限的限制,单位是(sol)',
    label: 'dev有小号sol',
    rules: [{ required: true, type: 'number' }],
    labelWidth: 150,
    componentSlots: () => {
      return {
        prefix: () => '<',
        suffix: () => 'sol',
      };
    },
  },
  {
    field: 'dev_team_sol_without_sub',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    helpMessage: '当dev不存在小号时,sol的上限的限制,单位是(sol)',
    label: 'dev没小号sol',
    rules: [{ required: true, type: 'number' }],
    labelWidth: 150,
    componentSlots: () => {
      return {
        prefix: () => '<',
        suffix: () => 'sol',
      };
    },
  },
  {
    field: 'blacklist_ratio',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '黑盘比例',
    helpMessage: '筛选黑盘的比例(0-1),1就代表100%,0.1就是10%',
    rules: [{ required: true, type: 'number' }],
    componentSlots: () => {
      return {
        prefix: () => '<',
      };
    },
  },
  {
    field: 'profit_7d',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '7天盈利额',
    helpMessage: '7天盈利的金额,单位是($)',
    rules: [{ type: 'number' }],
    componentSlots: () => {
      return {
        prefix: () => '≥',
      };
    },
  },
  {
    field: 'win_rate',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '钱包胜率',
    helpMessage: '钱包胜率(0-1),1就代表100%,0.1就是10%',
    rules: [{ type: 'number' }],
    componentSlots: () => {
      return {
        prefix: () => '≥',
      };
    },
  },
  {
    field: 'win_rate_7d',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '七天盈利率',
    helpMessage: '七天盈利率(0-1),1就代表100%,0.1就是10%',
    rules: [{ type: 'number' }],
    componentSlots: () => {
      return {
        prefix: () => '≥',
      };
    },
  },
  {
    field: 'buy_frequency',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '七天买入次数',
    helpMessage: '七天内买入的钱包的买入次数',
    rules: [{ type: 'number' }],
    labelWidth: 150,
    componentSlots: () => {
      return {
        prefix: () => '<',
      };
    },
  },
  {
    field: 'subscription_cycle',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    helpMessage: '单位是分钟，决定一个token的释放时间',
    label: '订阅活跃度',
    rules: [{ type: 'number' }],
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
    label: '持有者检测-公共设置',
    componentProps: {
      orientation: 'center',
    },
  },

  // 持有者检测_公共设置
  {
    field: 'holder_check_enabled',
    component: 'Switch',
    label: '总开关',
    helpMessage: ['持有者检测的总开关'],
    componentProps: ({ formInstance }) => ({
      onChange(e) {
        requestAnimationFrame(() => {
          e ? formInstance?.validateFields() : formInstance?.clearValidate();
        });
      },
    }),
  },
  {
    field: 'holder_check_scope',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '检测范围',
    helpMessage: ['检测数据的范围', '列如取前20条,前30条,前50条', '最大值前100'],
    rules: [{ type: 'number' }],
    componentSlots: () => {
      return {
        prefix: () => '前',
      };
    },
    dynamicRules: ({ formModel }) => {
      return formModel.holder_check_scope_enabled ? [{ required: true, message: '检测范围' }] : [];
    },
  },
  {
    field: 'holder_check_sort',
    component: 'RadioGroup',
    label: '排序设置',
    helpMessage: ['设置按什么排序', '总盈利:总盈利从高到低', '持仓量:持仓量从高到低'],
    colProps: {
      span: 12,
    },
    defaultValue: 'amount_percentage',
    componentProps: {
      optionType: 'button',
      options: [
        {
          label: '持仓量',
          value: 'amount_percentage',
        },
        {
          label: '总盈利',
          value: 'profit',
        },
      ],
    },
  },
  // 持有者检测-持有者
  {
    field: 'divider-basic',
    component: 'Divider',
    label: '持有者检测-持有者过滤',
    helpMessage: ['检测市值 + 持有人数', '市值低于设置的市值 并且 持有人数低于设置的人数'],
    componentProps: {
      orientation: 'center',
    },
  },
  {
    field: 'holder_detection_check_enabled',
    component: 'Switch',
    label: '检测开关',
    componentProps: ({ formInstance }) => ({
      onChange(e) {
        requestAnimationFrame(() => {
          e ? formInstance?.validateFields() : formInstance?.clearValidate();
        });
      },
    }),
  },
  {
    field: 'holder_detection_market_value',
    component: 'InputNumber',
    label: '市值',
    colProps: {
      span: 12,
    },
    helpMessage: ['检测市值', '小于设置值则过滤(需要和持有人数参数一起使用)', '单位($)'],
    dynamicRules: ({ formModel }) => {
      return formModel.holder_detection_check_enabled
        ? [{ required: true, message: '检测市值' }]
        : [];
    },
    componentSlots: () => {
      return {
        prefix: () => '<',
      };
    },
  },
  {
    field: 'holder_detection_holder_count',
    component: 'InputNumber',
    label: '持有人数',
    colProps: {
      span: 12,
    },
    helpMessage: ['持有人数', '小于设置值则过滤(需要和市值参数一起使用)', '单位(人)'],
    dynamicRules: ({ formModel }) => {
      return formModel.holder_detection_check_enabled
        ? [{ required: true, message: '持有人数' }]
        : [];
    },
    componentSlots: () => {
      return {
        prefix: () => '<',
      };
    },
  },
  // 持有者检测-大额检测
  {
    field: 'divider-basic',
    component: 'Divider',
    label: '持有者检测-大额买单过滤',
    componentProps: {
      orientation: 'center',
    },
  },
  {
    field: 'large_txn_check_enabled',
    component: 'Switch',
    label: '检测开关',
    componentProps: ({ formInstance }) => ({
      onChange(e) {
        requestAnimationFrame(() => {
          e ? formInstance?.validateFields() : formInstance?.clearValidate();
        });
      },
    }),
  },
  {
    field: 'large_txn_threshold',
    component: 'InputNumber',
    label: '检测金额',
    colProps: {
      span: 12,
    },
    helpMessage: ['检测金额', '大于设置值则过滤', '单位(sol)'],
    dynamicRules: ({ formModel }) => {
      return formModel.large_txn_check_enabled ? [{ required: true, message: '检测金额' }] : [];
    },
    componentSlots: () => {
      return {
        prefix: () => '>',
      };
    },
  },
  // 持有者检测-购买一致性检测
  {
    field: 'divider-basic',
    component: 'Divider',
    label: '持有者检测-购买一致性过滤',
    componentProps: {
      orientation: 'center',
    },
  },
  {
    field: 'buy_consistency_check_enabled',
    component: 'Switch',
    label: '检测开关',
    componentProps: ({ formInstance }) => ({
      onChange(e) {
        requestAnimationFrame(() => {
          e ? formInstance?.validateFields() : formInstance?.clearValidate();
        });
      },
    }),
  },
  {
    field: 'buy_consistency_time_range',
    component: 'InputNumber',
    label: '检测时间',
    colProps: {
      span: 12,
    },
    helpMessage: ['检测时间', '比如设置1就是1秒内,设置2就是两秒内', '单位(秒)'],
    dynamicRules: ({ formModel }) => {
      return formModel.buy_consistency_check_enabled
        ? [{ required: true, message: '检测时间' }]
        : [];
    },
    componentSlots: () => {
      return {
        prefix: () => '内',
      };
    },
  },
  {
    field: 'buy_consistency_single_txn_amount',
    component: () => InputNumberRange,
    label: '检测金额',
    colProps: {
      span: 12,
    },
    helpMessage: ['金额范围', '检测范围内的金额', '单位(sol)'],
    dynamicRules: ({ formModel }) => {
      return formModel.buy_consistency_check_enabled
        ? [{ required: true, message: '检测金额' }]
        : [];
    },
    rules: [
      {
        required: true,
        type: 'array',
        trigger: 'change',
        validator(_, value: string[]) {
          const isOk =
            Array.isArray(value) &&
            value.length === 2 &&
            value.every((val) => /^(0|[1-9]\d*)(\.\d+)?$/.test(val));
          return isOk ? Promise.resolve() : Promise.reject('请输入金额范围');
        },
      },
    ],
    // 将多个值映射为多个字段
    transform([minNum, maxNum] = []) {
      console.log(minNum, maxNum);
      return [minNum, maxNum];
    },
  },
  {
    field: 'buy_consistency_allowed_times',
    component: 'InputNumber',
    label: '重复单数',
    colProps: {
      span: 12,
    },
    helpMessage: ['重复单数', '大于设置值则过滤', '单位(次)'],
    dynamicRules: ({ formModel }) => {
      return formModel.buy_consistency_check_enabled
        ? [{ required: true, message: '重复单数' }]
        : [];
    },
    componentSlots: () => {
      return {
        prefix: () => '>',
      };
    },
  },
  // 持有者检测-购买一致性检测 低市值持
  {
    field: 'divider-basic',
    component: 'Divider',
    label: '有者检测-低市值-购买一致性过滤',
    helpMessage: [
      '低市值购买一致性检测',
      '此项配置与购买一致性过滤互斥',
      '1.优先判断市值低于设定值,或者持有者低于设置值',
      '2.然后采用本项配置',
      '3.否则使用购买一致性过滤的配置进行过滤',
    ],
    componentProps: {
      orientation: 'center',
    },
  },
  {
    field: 'buy_consistency_low_maket_value_check_enabled',
    component: 'Switch',
    label: '检测开关',
    componentProps: ({ formInstance }) => ({
      onChange(e) {
        requestAnimationFrame(() => {
          e ? formInstance?.validateFields() : formInstance?.clearValidate();
        });
      },
    }),
  },
  {
    field: 'buy_consistency_low_maket_value',
    component: 'InputNumber',
    label: '市值',
    colProps: {
      span: 12,
    },
    helpMessage: ['检测市值', '检测小于设置值', '单位($)'],
    componentSlots: () => {
      return {
        prefix: () => '<',
      };
    },
  },
  {
    field: 'buy_consistency_holder_count',
    component: 'InputNumber',
    label: '持有人数',
    colProps: {
      span: 12,
    },
    helpMessage: ['持有人数', '小于设置值', '单位(人)'],
    componentSlots: () => {
      return {
        prefix: () => '<',
      };
    },
  },
  {
    field: 'buy_consistency_holder_check_scope',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '检测范围',
    helpMessage: [
      '检测数据的范围',
      '列如取前20条,前30条,前50条',
      '最大值前100',
      '*假如这边不设置，则使用共设置中的值',
    ],
    rules: [{ type: 'number' }],
    componentSlots: () => {
      return {
        prefix: () => '前',
      };
    },
  },
  {
    field: 'buy_consistency_low_market_value_time_range',
    component: 'InputNumber',
    label: '检测时间',
    colProps: {
      span: 12,
    },
    helpMessage: ['检测时间', '比如设置1就是1秒内,设置2就是两秒内', '单位(秒)'],
    dynamicRules: ({ formModel }) => {
      return formModel.buy_consistency_low_maket_value_check_enabled
        ? [{ required: true, message: '检测时间' }]
        : [];
    },
    componentSlots: () => {
      return {
        prefix: () => '内',
      };
    },
  },
  {
    field: 'buy_consistency_low_market_value_single_txn_amount',
    component: () => InputNumberRange,
    label: '检测金额',
    colProps: {
      span: 12,
    },
    helpMessage: ['金额范围', '检测范围内的金额', '单位(sol)'],
    dynamicRules: ({ formModel }) => {
      return formModel.buy_consistency_low_maket_value_check_enabled
        ? [{ required: true, message: '检测金额' }]
        : [];
    },
    rules: [
      {
        required: true,
        type: 'array',
        trigger: 'change',
        validator(_, value: string[]) {
          const isOk =
            Array.isArray(value) &&
            value.length === 2 &&
            value.every((val) => /^(0|[1-9]\d*)(\.\d+)?$/.test(val));
          return isOk ? Promise.resolve() : Promise.reject('请输入金额范围');
        },
      },
    ],
    // 将多个值映射为多个字段
    transform([minNum, maxNum] = []) {
      console.log(minNum, maxNum);
      return [minNum, maxNum];
    },
  },
  {
    field: 'buy_consistency_low_market_value_allowed_times',
    component: 'InputNumber',
    label: '重复单数',
    colProps: {
      span: 12,
    },
    helpMessage: ['重复单数', '大于设置值则过滤', '单位(次)'],
    dynamicRules: ({ formModel }) => {
      return formModel.buy_consistency_low_maket_value_check_enabled
        ? [{ required: true, message: '重复单数' }]
        : [];
    },
    componentSlots: () => {
      return {
        prefix: () => '>',
      };
    },
  },
  // 持有者检测-转账时间一致性检测
  {
    field: 'divider-basic',
    component: 'Divider',
    label: '持有者检测-转账时间一致性过滤',
    componentProps: {
      orientation: 'center',
    },
  },
  {
    field: 'transfer_consistency_check_enabled',
    component: 'Switch',
    label: '检测开关',
    componentProps: ({ formInstance }) => ({
      onChange(e) {
        requestAnimationFrame(() => {
          e ? formInstance?.validateFields() : formInstance?.clearValidate();
        });
      },
    }),
  },
  {
    field: 'transfer_consistency_time_range',
    component: 'InputNumber',
    label: '检测时间',
    colProps: {
      span: 12,
    },
    helpMessage: ['检测时间', '比如设置1就是1秒内,设置2就是两秒内', '单位(秒)'],
    dynamicRules: ({ formModel }) => {
      return formModel.transfer_consistency_check_enabled
        ? [{ required: true, message: '检测时间' }]
        : [];
    },
    componentSlots: () => {
      return {
        prefix: () => '内',
      };
    },
  },
  {
    field: 'transfer_consistency_allowed_times',
    component: 'InputNumber',
    label: '重复单数',
    colProps: {
      span: 12,
    },
    helpMessage: ['重复单数', '大于设置值则过滤', '单位(次)'],
    dynamicRules: ({ formModel }) => {
      return formModel.transfer_consistency_check_enabled
        ? [{ required: true, message: '重复单数' }]
        : [];
    },
    componentSlots: () => {
      return {
        prefix: () => '>',
      };
    },
  },

  // 持有者检测-相似性检测
  {
    field: 'divider-basic',
    component: 'Divider',
    label: '持有者检测-相似性过滤',
    helpMessage: [
      '相似性过滤',
      '当总数开关开启，只计算各大小标签加在一起去重后的总数,其他小标签则失效,反之就一个个计算小标签的值是否符合过滤标准',
    ],
    componentProps: {
      orientation: 'center',
    },
  },
  {
    field: 'similarity_check_enabled',
    component: 'Switch',
    label: '检测开关',
  },
  {
    field: 'similarity_phishing_wallet_check_enabled',
    component: 'Checkbox',
    label: '钓鱼钱包',
    colProps: {
      span: 4,
    },
    componentProps: ({ formInstance }) => ({
      onChange: (e) => {
        if (e.target.checked) {
          // 当总数被选中时，取消其他 Checkbox 的选中状态
          formInstance.setFieldsValue({
            similarity_total_check_enabled: false,
          });
        }
      },
    }),
  },
  {
    field: 'similarity_phishing_wallet_count',
    component: 'InputNumber',
    label: '个数',
    colProps: {
      span: 8,
    },
    labelWidth: 90,
    helpMessage: ['钓鱼钱包的个数', '大于设置值则过滤', '单位(个)'],
    dynamicRules: ({ formModel }) => {
      return formModel.similarity_phishing_wallet_check_enabled
        ? [{ required: true, message: '钓鱼钱包的个数' }]
        : [];
    },
    componentSlots: () => {
      return {
        prefix: () => '>',
      };
    },
  },
  {
    field: 'similarity_insider_trading_check_enabled',
    component: 'Checkbox',
    label: '老鼠钱包',
    colProps: {
      span: 4,
    },
    componentProps: ({ formInstance }) => ({
      onChange: (e) => {
        if (e.target.checked) {
          // 当总数被选中时，取消其他 Checkbox 的选中状态
          formInstance.setFieldsValue({
            similarity_total_check_enabled: false,
          });
        }
      },
    }),
  },
  {
    field: 'similarity_insider_trading_count',
    component: 'InputNumber',
    label: '个数',
    colProps: {
      span: 8,
    },
    labelWidth: 90,
    helpMessage: ['老鼠仓钱包的个数', '大于设置值则过滤', '单位(个)'],
    dynamicRules: ({ formModel }) => {
      return formModel.similarity_insider_trading_check_enabled
        ? [{ required: true, message: '老鼠仓钱包的个数' }]
        : [];
    },
    componentSlots: () => {
      return {
        prefix: () => '>',
      };
    },
  },
  {
    field: 'similarity_same_source_wallet_check_enabled',
    component: 'Checkbox',
    label: '同源钱包',
    colProps: {
      span: 4,
    },
    componentProps: ({ formInstance }) => ({
      onChange: (e) => {
        if (e.target.checked) {
          // 当总数被选中时，取消其他 Checkbox 的选中状态
          formInstance.setFieldsValue({
            similarity_total_check_enabled: false,
          });
        }
      },
    }),
  },
  {
    field: 'similarity_same_source_wallet_count',
    component: 'InputNumber',
    label: '个数',
    colProps: {
      span: 8,
    },
    labelWidth: 90,
    helpMessage: ['同钱包来源的个数', '大于设置值则过滤', '单位(个)'],
    dynamicRules: ({ formModel }) => {
      return formModel.similarity_same_source_wallet_check_enabled
        ? [{ required: true, message: '同钱包来源的个数' }]
        : [];
    },
    componentSlots: () => {
      return {
        prefix: () => '>',
      };
    },
  },
  {
    field: 'similarity_dev_team_check_enabled',
    component: 'Checkbox',
    label: 'dev钱包',
    colProps: {
      span: 4,
    },
    componentProps: ({ formInstance }) => ({
      onChange: (e) => {
        if (e.target.checked) {
          // 当总数被选中时，取消其他 Checkbox 的选中状态
          formInstance.setFieldsValue({
            similarity_total_check_enabled: false,
          });
        }
      },
    }),
  },
  {
    field: 'similarity_dev_team_count',
    component: 'InputNumber',
    label: '个数',
    colProps: {
      span: 8,
    },
    labelWidth: 90,
    helpMessage: ['dev团队的个数', '大于设置值则过滤', '单位(个)'],
    dynamicRules: ({ formModel }) => {
      return formModel.similarity_dev_team_check_enabled
        ? [{ required: true, message: 'dev团队的个数' }]
        : [];
    },
    componentSlots: () => {
      return {
        prefix: () => '>',
      };
    },
  },
  {
    field: 'similarity_alert_wallet_check_enabled',
    component: 'Checkbox',
    label: '感叹号钱包',
    colProps: {
      span: 4,
    },
    componentProps: ({ formInstance }) => ({
      onChange: (e) => {
        if (e.target.checked) {
          // 当总数被选中时，取消其他 Checkbox 的选中状态
          formInstance.setFieldsValue({
            similarity_total_check_enabled: false,
          });
        }
      },
    }),
  },
  {
    field: 'similarity_alert_wallet_count',
    component: 'InputNumber',
    label: '个数',
    colProps: {
      span: 8,
    },
    labelWidth: 90,
    helpMessage: ['感叹号钱包', '大于设置值则过滤', '单位(个)'],
    dynamicRules: ({ formModel }) => {
      return formModel.similarity_alert_wallet_check_enabled
        ? [{ required: true, message: '感叹号钱包的个数' }]
        : [];
    },
    componentSlots: () => {
      return {
        prefix: () => '>',
      };
    },
  },
  {
    field: 'similarity_total_check_enabled',
    component: 'Checkbox',
    label: '总数',
    colProps: {
      span: 4,
    },
    componentProps: ({ formInstance }) => ({
      onChange: (e) => {
        if (e.target.checked) {
          // 当总数被选中时，取消其他 Checkbox 的选中状态
          formInstance.setFieldsValue({
            similarity_phishing_wallet_check_enabled: false,
            similarity_insider_trading_check_enabled: false,
            similarity_same_source_wallet_check_enabled: false,
            similarity_dev_team_check_enabled: false,
            similarity_alert_wallet_check_enabled: false,
          });
        }
      },
    }),
  },
  {
    field: 'similarity_total_count',
    component: 'InputNumber',
    label: '个数',
    colProps: {
      span: 8,
    },
    labelWidth: 90,
    helpMessage: ['所有检测加在一起的总数', '大于设置值则过滤', '单位(个)'],
    dynamicRules: ({ formModel }) => {
      return formModel.similarity_total_check_enabled
        ? [{ required: true, message: '总的数量' }]
        : [];
    },
    componentSlots: () => {
      return {
        prefix: () => '>',
      };
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
    field: 'type1_settings_purchase_amount_range',
    component: () => InputNumberRange,
    colProps: {
      span: 12,
    },
    label: '金额范围',
    helpMessage: ['单独设置', '购买的金额范围,如果不设置,则使用全局设置', '单位(sol)'],
    rules: [
      {
        type: 'array',
        trigger: 'change',
        validator(_, value: string[]) {
          // 如果值为空，直接通过验证
          if (value.every((val) => val == null)) {
            return Promise.resolve();
          }

          // 如果值不为空，验证格式
          const isOk =
            Array.isArray(value) &&
            value.length === 2 &&
            value.every((val) => /^(0|[1-9]\d*)(\.\d+)?$/.test(val));

          return isOk ? Promise.resolve() : Promise.reject('请输入有效的数字范围');
        },
      },
    ],
    // 将多个值映射为多个字段
    transform([minNum, maxNum] = []) {
      return [minNum, maxNum];
    },
  },
  {
    field: 'type1_settings_day_interval',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '天数限制',
    helpMessage: ['单独设置', '天数间隔,如果不设置,则使用全局设置', '单位(天)'],
    rules: [{ type: 'number' }],
    componentSlots: () => {
      return {
        prefix: () => '≥',
      };
    },
  },
  {
    field: 'type1_settings_market_cap_limit',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '最小市值',
    helpMessage: ['最小市值', '大于等于', '单位($)'],
    rules: [{ required: true, type: 'number' }],
    componentSlots: () => {
      return {
        prefix: () => '≥',
      };
    },
  },
  {
    field: 'type1_settings_sol_limit',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: 'sol余额',
    helpMessage: '检测符合sol余额的钱包',
    rules: [{ type: 'number' }],
    vIf: false,
    componentSlots: () => {
      return {
        prefix: () => '≥',
      };
    },
  },
  {
    field: 'type1_settings_token_balance',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '代币余额',
    helpMessage: ['代币余额', '大于等于', '单位($)'],
    rules: [{ required: true, type: 'number' }],
    componentSlots: () => {
      return {
        prefix: () => '≥',
      };
    },
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
    field: 'type2_settings_purchase_amount_range',
    component: () => InputNumberRange,
    colProps: {
      span: 12,
    },
    label: '金额范围',
    helpMessage: ['单独设置', '购买的金额范围,如果不设置,则使用全局设置', '单位(sol)'],
    rules: [
      {
        type: 'array',
        trigger: 'change',
        validator(_, value: string[]) {
          // 如果值为空，直接通过验证
          if (value.every((val) => val == null)) {
            return Promise.resolve();
          }

          // 如果值不为空，验证格式
          const isOk =
            Array.isArray(value) &&
            value.length === 2 &&
            value.every((val) => /^(0|[1-9]\d*)(\.\d+)?$/.test(val));

          return isOk ? Promise.resolve() : Promise.reject('请输入有效的数字范围');
        },
      },
    ],
    // 将多个值映射为多个字段
    transform([minNum, maxNum] = []) {
      return [minNum, maxNum];
    },
  },
  {
    field: 'type2_settings_day_interval',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '天数限制',
    helpMessage: ['单独设置', '天数间隔,如果不设置,则使用全局设置', '单位(天)'],
    rules: [{ type: 'number' }],
    componentSlots: () => {
      return {
        prefix: () => '≥',
      };
    },
  },
  {
    field: 'type2_settings_market_cap_limit',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '最小市值',
    helpMessage: ['最小市值', '大于等于', '单位($)'],
    rules: [{ required: true, type: 'number' }],
    componentSlots: () => {
      return {
        prefix: () => '≥',
      };
    },
  },
  {
    field: 'type2_settings_profit_per_token',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '单币盈利',
    helpMessage: ['单币盈利', '大于等于', '单位($)'],
    rules: [{ required: true, type: 'number' }],
    componentSlots: () => {
      return {
        prefix: () => '≥',
      };
    },
  },
  {
    field: 'type2_settings_profit_rate_per_token',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '单币盈利倍数',
    helpMessage: ['单币盈利倍数', '大于等于', '单位(倍)'],
    rules: [{ required: true, type: 'number' }],
    componentSlots: () => {
      return {
        prefix: () => '≥',
      };
    },
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
    field: 'type3_settings_purchase_amount_range',
    component: () => InputNumberRange,
    colProps: {
      span: 12,
    },
    label: '金额范围',
    helpMessage: ['单独设置', '购买的金额范围,如果不设置,则使用全局设置', '单位(sol)'],
    rules: [
      {
        type: 'array',
        trigger: 'change',
        validator(_, value: string[]) {
          // 如果值为空，直接通过验证
          if (value.every((val) => val == null)) {
            return Promise.resolve();
          }

          // 如果值不为空，验证格式
          const isOk =
            Array.isArray(value) &&
            value.length === 2 &&
            value.every((val) => /^(0|[1-9]\d*)(\.\d+)?$/.test(val));

          return isOk ? Promise.resolve() : Promise.reject('请输入有效的数字范围');
        },
      },
    ],
    // 将多个值映射为多个字段
    transform([minNum, maxNum] = []) {
      return [minNum, maxNum];
    },
  },
  {
    field: 'type3_settings_day_interval',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '天数限制',
    helpMessage: ['单独设置', '天数间隔,如果不设置,则使用全局设置', '单位(天)'],
    rules: [{ type: 'number' }],
    componentSlots: () => {
      return {
        prefix: () => '≥',
      };
    },
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
    field: 'type4_settings_purchase_amount_range',
    component: () => InputNumberRange,
    colProps: {
      span: 12,
    },
    label: '金额范围',
    helpMessage: ['单独设置', '购买的金额范围,如果不设置,则使用全局设置', '单位(sol)'],
    rules: [
      {
        type: 'array',
        trigger: 'change',
        validator(_, value: string[]) {
          // 如果值为空，直接通过验证
          if (value.every((val) => val == null)) {
            return Promise.resolve();
          }

          // 如果值不为空，验证格式
          const isOk =
            Array.isArray(value) &&
            value.length === 2 &&
            value.every((val) => /^(0|[1-9]\d*)(\.\d+)?$/.test(val));

          return isOk ? Promise.resolve() : Promise.reject('请输入有效的数字范围');
        },
      },
    ],
    // 将多个值映射为多个字段
    transform([minNum, maxNum] = []) {
      if (!minNum && !maxNum) {
        return [];
      }
      return [minNum, maxNum];
    },
  },
  {
    field: 'type4_settings_day_interval',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '天数限制',
    helpMessage: ['单独设置', '天数间隔,如果不设置,则使用全局设置', '单位(天)'],
    rules: [{ type: 'number' }],
    componentSlots: () => {
      return {
        prefix: () => '≥',
      };
    },
  },
  {
    field: 'type4_settings_parent_wallet_transaction_range',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '转账范围',
    helpMessage: ['转账范围', '查询钱包的转账范围,', '单位(天)'],
    rules: [{ required: true, type: 'number' }],
    componentSlots: () => {
      return {
        prefix: () => '=',
      };
    },
  },

  {
    field: 'type4_settings_parent_wallet_transfer_sol',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '父钱包转账',
    helpMessage: ['父钱包转账sol', '大于等于,限制查询到的父钱包给当前钱包的转账额度,', '单位(sol)'],
    rules: [{ required: true, type: 'number' }],
    componentSlots: () => {
      return {
        prefix: () => '≥',
      };
    },
  },
  {
    field: 'type4_settings_token_quantity',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '父钱包代币账户数',
    helpMessage: ['父钱包代币账户数', '大于等于,限制查询到的父钱包的代币账户数,', '单位(个)'],
    rules: [{ required: true, type: 'number' }],
    componentSlots: () => {
      return {
        prefix: () => '≥',
      };
    },
  },
  {
    field: 'type4_settings_token_balance',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '父钱包代币余额',
    helpMessage: ['代币余额', '大于等于,限制查询到的父钱包的代币余额,', '单位($)'],
    rules: [{ required: true, type: 'number' }],
    componentSlots: () => {
      return {
        prefix: () => '≥',
      };
    },
  },
  // type 5
  {
    field: 'divider-basic',
    component: 'Divider',
    label: '类型五设置',
    helpMessage: ['dev创建者', 'dev创建者初始购买量满足设置条件则播报'],
    componentProps: {
      orientation: 'center',
    },
  },
  {
    field: 'type5_settings_transaction_enabled',
    component: 'Switch',
    label: '交易开关',
  },
  {
    field: 'type5_settings_create_amount',
    component: 'InputNumber',
    colProps: {
      span: 12,
    },
    label: '初始购买',
    helpMessage: ['初始购买', 'dev创建mint时的初始购买量', '单位(sol)'],
    rules: [{ required: true, type: 'number' }],
    componentSlots: () => {
      return {
        prefix: () => '≥',
      };
    },
  },
  // type 6
  {
    field: 'divider-basic',
    component: 'Divider',
    label: '类型六设置',
    helpMessage: ['检测市值 + 持有人数', '市值大于设置值,持有人数小于设置值'],
    componentProps: {
      orientation: 'center',
    },
  },
  {
    field: 'type6_settings_transaction_enabled',
    component: 'Switch',
    label: '交易开关',
  },
  {
    field: 'type6_settings_market_cap_value',
    component: 'InputNumber',
    label: '检测市值',
    colProps: {
      span: 12,
    },
    helpMessage: ['检测市值', '大于等于设置值(需要和持有人数参数一起使用)', '单位($)'],
    rules: [{ required: true, type: 'number' }],
    componentSlots: () => {
      return {
        prefix: () => '≥',
      };
    },
  },
  {
    field: 'type6_settings_holder_count',
    component: 'InputNumber',
    label: '持有人数',
    colProps: {
      span: 12,
    },
    helpMessage: ['持有人数', '小于设置值(需要和市值参数一起使用)', '单位(人)'],
    rules: [{ required: true, type: 'number' }],
    componentSlots: () => {
      return {
        prefix: () => '<',
      };
    },
  },
];
