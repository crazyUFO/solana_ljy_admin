<template>
  <DynamicTable
    ref="dynamicTableRef"
    size="small"
    bordered
    :data-request="getTransactionList"
    :columns="columns"
    row-key="heroid"
    @toggle-advanced="toggleAdvanced"
  >
    <template #toolbar>
      <a-button type="primary" @click="defaultHeader"> 导出：默认头部 </a-button>
      <a-button type="primary" @click="customHeader"> 导出：自定义头部 </a-button>
    </template>
  </DynamicTable>
</template>

<script lang="ts" setup>
  import { columns } from './columns';
  import { useTable } from '@/components/core/dynamic-table';
  import { jsonToSheetXlsx } from '@/components/basic/excel';

  import { getTransactionList } from '@/api/wallet-transaction/manage';
  import { formatToDateTime } from '@/utils/dateUtil';

  const [DynamicTable, dynamicTableInstance] = useTable();
  function defaultHeader() {
    // 默认Object.keys(data[0])作为header
    jsonToSheetXlsx({
      data: dynamicTableInstance.tableData,
      filename: '使用key作为默认头部.xlsx',
    });
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
</script>

<style lang="less" scoped></style>
