<template>
  <div class="box">
    <div class="netdisk-overview-container">
      <div class="ov-header">
        <OverviewHeaderItem
          title="今日入库"
          :value="today_data.inSetCount"
          suffix="条"
          :typesData="today_data.types"
          dataKey="inSetCount"
          :isLoading="isLoading"
        />
        <OverviewHeaderItem
          title="今日播报"
          :value="today_data.sentToBroadcastCount"
          suffix="条"
          :typesData="today_data.types"
          dataKey="sentToBroadcastCount"
          :isLoading="isLoading"
        />
        <OverviewHeaderItem
          title="今日交易"
          :value="today_data.sentToExchangeCount"
          suffix="条"
          :typesData="today_data.types"
          dataKey="sentToExchangeCount"
          :isLoading="isLoading"
        />
      </div>
      <div class="ov-header">
        <OverviewHeaderItem
          title="昨日入库"
          :value="yes_data.inSetCount"
          suffix="条"
          :typesData="yes_data.types"
          dataKey="inSetCount"
          :isLoading="isLoading"
        />
        <OverviewHeaderItem
          title="昨日播报"
          :value="yes_data.sentToBroadcastCount"
          suffix="条"
          :typesData="yes_data.types"
          dataKey="sentToBroadcastCount"
          :isLoading="isLoading"
        />
        <OverviewHeaderItem
          title="昨日交易"
          :value="yes_data.sentToExchangeCount"
          suffix="条"
          :typesData="yes_data.types"
          dataKey="sentToExchangeCount"
          :isLoading="isLoading"
        />
      </div>
      <div class="ov-content">
        <div class="charts-container">
          <div class="chart">
            <VChart :option="stackedBarChartOptionToday" style="height: 400px" autoresize />
          </div>
          <div class="chart">
            <VChart :option="stackedBarChartOptionYesterday" style="height: 400px" autoresize />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import VChart from 'vue-echarts';
  import { use } from 'echarts/core';
  import { CanvasRenderer } from 'echarts/renderers';
  import { TooltipComponent, GridComponent, LegendComponent } from 'echarts/components';
  import { BarChart } from 'echarts/charts';
  import OverviewHeaderItem from './components/overview-header-item.vue';
  import { getTransactionListByTime } from '@/api/wallet-transaction/manage';

  use([CanvasRenderer, TooltipComponent, GridComponent, LegendComponent, BarChart]);
  defineOptions({
    name: 'DashboardWelcome',
  });

  interface Tydata {
    title?: string;
    inSetCount: number;
    sentToBroadcastCount: number;
    sentToExchangeCount: number;
    types: Tydata[];
  }

  const today_data = ref<Tydata>({
    inSetCount: 0,
    sentToBroadcastCount: 0,
    sentToExchangeCount: 0,
    types: [],
  });
  const yes_data = ref<Tydata>({
    inSetCount: 0,
    sentToBroadcastCount: 0,
    sentToExchangeCount: 0,
    types: [],
  });
  const transactionList = ref({ today_data: today_data, yes_data: yes_data });
  let isLoading = ref(false);
  const fetchTransactions = async () => {
    try {
      const now = new Date();
      const startOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,
        0,
        0,
        0,
      ).getTime();
      const endOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        23,
        59,
        59,
        999,
      ).getTime();
      isLoading.value = true;
      const res = await getTransactionListByTime({
        startTimestamp: startOfDay,
        endTimestamp: endOfDay,
      });
      isLoading.value = false;
      transactionList.value = res; // 假设返回的数据在 res.data
      console.log(res);
      today_data.value = res.today_data;
      yes_data.value = res.yes_data;
    } catch (error) {
      isLoading.value = false;
      console.error('获取交易列表失败:', error);
    }
  };
  await fetchTransactions();
  // 今天的图
  const stackedBarChartOptionToday = ref({
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
    },
    legend: {
      data: ['今日播报', '今日交易', '今日入库'],
    },
    grid: {
      top: '10%',
      bottom: '10%',
      left: '10%',
      right: '10%',
    },
    xAxis: {
      type: 'category',
      data: transactionList.value.today_data.types.map((item) => item.title),
      axisLabel: { interval: 0 },
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '今日播报',
        type: 'bar',
        stack: '总量',
        data: transactionList.value.today_data.types.map((item) => item.sentToBroadcastCount),
        itemStyle: { color: '#6fcf97' },
      },
      {
        name: '今日交易',
        type: 'bar',
        stack: '总量',
        data: transactionList.value.today_data.types.map((item) => item.sentToExchangeCount),
        itemStyle: { color: '#f3a6b7' },
      },
      {
        name: '今日入库',
        type: 'bar',
        stack: '总量',
        data: transactionList.value.today_data.types.map((item) => item.inSetCount),
        itemStyle: { color: '#56c1e1' },
      },
    ],
  });

  // 直接在 setup 里调用

  // 配置昨天的堆叠柱状图
  const stackedBarChartOptionYesterday = ref({
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
    },
    legend: {
      data: ['昨日播报', '昨日交易', '昨日入库'],
    },
    grid: {
      top: '10%',
      bottom: '10%',
      left: '10%',
      right: '10%',
    },
    xAxis: {
      type: 'category',
      data: transactionList.value.yes_data.types.map((item) => item.title),
      axisLabel: { interval: 0 },
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '昨日播报',
        type: 'bar',
        stack: '总量',
        data: transactionList.value.yes_data.types.map((item) => item.sentToBroadcastCount),
        itemStyle: { color: '#6fcf97' },
      },
      {
        name: '昨日交易',
        type: 'bar',
        stack: '总量',
        data: transactionList.value.yes_data.types.map((item) => item.sentToExchangeCount),
        itemStyle: { color: '#f3a6b7' },
      },
      {
        name: '昨日入库',
        type: 'bar',
        stack: '总量',
        data: transactionList.value.yes_data.types.map((item) => item.inSetCount),
        itemStyle: { color: '#56c1e1' },
      },
    ],
  });

  // console.log(performanceMonitor.getPerformanceData(), 'performanceMonitor')
</script>

<style lang="less" scoped>
  .netdisk-overview-container {
    margin: 0 20px 20px;

    .ov-header {
      display: flex;
      flex-direction: row;
      margin-left: -20px;

      &:nth-child(2) {
        margin-top: 20px;
      }
    }

    .ov-content {
      margin: 20px 0;

      .charts-container {
        display: flex;
        justify-content: space-between;
      }

      .chart {
        width: 48%; /* 使两个图表并排显示，并留有间隔 */
      }
    }
  }
</style>
