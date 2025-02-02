<template>
  <div>
    <DynamicTable
      ref="dynamicTableRef"
      size="small"
      bordered
      :data-request="loadTableData"
      :columns="columns"
      row-key="dataIndex"
      :scroll="{ x: 3000 }"
      @toggle-advanced="toggleAdvanced"
      @resizeColumn="handleResizeColumn"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'walletAddress'">
          <span>
            {{ record.walletAddress }}
          </span>
          <a-divider type="vertical" />
          <a target="_blanck" :href="`https://gmgn.ai/sol/address/${record.walletAddress}`">GMGN</a>
          <a-divider type="vertical" />
          <a target="_blanck" :href="`https://solscan.io/account/${record.walletAddress}`"
            >SOLSCAN</a
          >
          <a-divider type="vertical" />
          <a @click="addToBlackList(record)">BLACKLIST</a>
        </template>
        <template v-if="column.key === 'ca'">
          <a @click="openKlineModal(record)"> {{ record.ca }}</a>
        </template>
        <template v-if="column.key === 'transactionSignature'">
          <a target="_blanck" :href="`https://solscan.io/tx/${record.transactionSignature}`">{{
            record.transactionSignature
          }}</a>
        </template>
      </template>
      <template #toolbar>
        <!-- <a-button type="primary" @click="defaultHeader"> 导出：默认头部 </a-button> -->
        <a-button type="primary" @click="customHeader"> 导出表格 </a-button>
      </template>
    </DynamicTable>
  </div>
</template>

<script lang="ts" setup>
  import { h, ref } from 'vue';
  import { Spin, Modal, message } from 'ant-design-vue';
  import { transactionColumns, type TableListItem, type TableColumnItem } from './columns';
  import type { LoadDataParams } from '@/components/core/dynamic-table';
  import { useTable } from '@/components/core/dynamic-table';
  import { jsonToSheetXlsx } from '@/components/basic/excel';

  import { getTransactionList } from '@/api/wallet-transaction/manage';
  import { createWallet } from '@/api/exchange/manage';
  import { formatToDateTime } from '@/utils/dateUtil';
  import { useModal } from '@/hooks/useModal/';

  const [DynamicTable, dynamicTableInstance] = useTable();

  function defaultHeader() {
    // 默认Object.keys(data[0])作为header
    jsonToSheetXlsx({
      data: dynamicTableInstance.tableData,
      filename: '使用key作为默认头部.xlsx',
    });
  }
  const [fnModal] = useModal();
  /**
   * @description 打开操作用户弹窗
   */
  const openKlineModal = async (record: Partial<TableListItem> = {}) => {
    const loading = ref(true); // 初始化 loading 状态为 true

    const hideLoading = () => {
      loading.value = false; // 加载完成后隐藏 loading
    };

    await fnModal.show({
      title: `${record.ca}`,
      width: 1100,
      footer: null, // 隐藏底部按钮
      content: () =>
        h(
          Spin,
          { spinning: loading.value, tip: 'Loading...' }, // Spin 的属性
          () =>
            h('iframe', {
              src: `https://www.gmgn.cc/kline/sol/${record.ca}?theme=light`, // 替换为您的外链地址
              style: {
                width: '100%',
                height: '400px',
                border: 'none',
              },
              onload: hideLoading, // iframe 加载完成后隐藏 loading
            }),
        ),
    });
  };

  function handleResizeColumn(w, col) {
    col.width = w;
  }
  // 自定义头部
  function customHeader() {
    const typeString = ['', '老鲸鱼钱包', '老鲸鱼暴击', '老钱包买单', '老鲸鱼转账'];
    const formattedData = dynamicTableInstance.tableData.map((item) => {
      return {
        transactionSignature: item.transactionSignature,
        ca: item.ca,
        walletAddress: item.walletAddress,
        purchaseAmount: item.purchaseAmount, // 保留两位小数
        tokenMarketValue: item.tokenMarketValue, // 保留两位小数
        blackMarketRatio: item.blackMarketRatio, // 保留两位小数
        type: typeString[item.type],
        tokenSymbol: item.tokenSymbol,
        isSentToExchange: item.isSentToExchange ? '是' : '否',
        profit: item.profit ? item.profit : '--', // 格式化为带单位的字符串
        createdAt: formatToDateTime(item.createdAt), // 假设你有格式化日期的函数
        updatedAt: formatToDateTime(item.updatedAt), // 假设你有格式化日期的函数
      };
    });
    jsonToSheetXlsx({
      data: formattedData,
      header: {
        transactionSignature: '交易签名',
        ca: '代币地址',
        walletAddress: '钱包地址',
        purchaseAmount: '购买金额(SOL)',
        tokenMarketValue: '代币市值',
        blackMarketRatio: '黑盘比例',
        type: '播报类型',
        tokenSymbol: '代币符号',
        isSentToExchange: '发送交易',
        profit: '盈利金额',
        createdAt: '创建时间',
        updatedAt: '更新时间',
      },
      filename: '播报数据.xlsx',
    });
  }
  const loadTableData = async (params: LoadDataParams) => {
    const data = await getTransactionList({
      ...params,
    });
    return data;
  };
  // 展开搜索表单时更新英雄皮肤选项值
  const toggleAdvanced = (e) => {
    if (e) {
      //dynamicTableInstance?.getSearchFormRef().updateSchema([
      //   {
      //     field: 'skin_name',
      //     componentProps: {
      //       options: [
      //         {
      //           label: '皮肤1',
      //           value: 'aa',
      //         },
      //         {
      //           label: '皮肤2',
      //           value: 'bb',
      //         },
      //       ],
      //     },
      //   },
      // ]);
    }
  };
  const addToBlackList = (record) => {
    Modal.confirm({
      title: '警告', // 标题
      content: '是否将此钱包加入到黑名单', // 内容
      onOk: async () => {
        let params = {
          walletAddress: record.walletAddress,
          label: '网页操作',
          type: 2,
        };
        await createWallet(params);
        message.success({
          content: '操作成功',
        });
      },
      onCancel() {
        console.log('Cancelled'); // 用户点击取消时执行的回调
      },
    });
  };
  const columns: TableColumnItem[] = [
    ...transactionColumns,
    // {
    //   title: '操作',
    //   dataIndex: 'ACTION',
    //   fixed: 'right',
    //   width: 150,
    //   actions: ({ record }) => [
    //     {
    //       label: 'GMGN',
    //       onClick: () => window.open(`https://gmgn.ai/sol/address/${record.walletAddress}`),
    //     },
    //     {
    //       label: 'SOLSCAN',
    //       onClick: () => window.open(`https://solscan.io/account/${record.walletAddress}`),
    //     },
    //     {
    //       label: 'KLINE',
    //       onClick: () => {
    //         openKlineModal(record);
    //       },
    //     },
    //   ],
    // },
  ];
</script>

<style lang="less" scoped></style>
