<template>
  <Card class="header-item-card" hoverable :loading="isLoading">
    <div class="title">{{ title }}</div>
    <Statistic class="value" :value="value" :duration="2000" />
    <span class="suffix">{{ suffix }}</span>
    <Row :gutter="16">
      <Col v-for="(item, key) in typesData" :key="key" :span="6">
        <Card size="small" :bordered="false">
          {{ item[dataKey] }}
          <template #title>
            <Tag :color="colors[key]"> {{ item.title }} </Tag></template
          >
        </Card>
      </Col>
    </Row>
  </Card>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { Card, Statistic, Row, Col, Tag } from 'ant-design-vue';

  defineOptions({
    name: 'OverviewHeaderItem',
  });
  interface TypeData {
    title: string;
    [key: string]: any; // 允许其他任意属性，如 inSetCount 等
  }
  const colors = ref(['processing', 'success', 'error', 'warning']);
  defineProps({
    title: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    suffix: {
      type: String,
      default: '',
    },
    typesData: {
      type: Array as PropType<TypeData[]>,
      default: () => [],
    },
    dataKey: {
      type: String,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
  });
</script>

<style lang="less" scoped>
  .header-item-card {
    flex: 1;
    margin-left: 20px;
    overflow-y: hidden;

    .title {
      color: #999;
      font-size: 12px;
    }

    .value {
      display: inline-block;
      height: 40px;
      margin: 10px 0;
      font-size: 24px;
      font-weight: 500;
      line-height: 40px;
    }

    .suffix {
      display: inline-block;
      margin-left: 5px;
      color: #6d6d6d;
      font-size: 14px;
    }
  }

  .types-item-card {
    display: flex;
    flex-direction: row;
  }
</style>
