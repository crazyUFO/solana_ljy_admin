<template>
  <DynamicTable ref="dynamicTableRef" size="small" bordered :data-request="getServerList" :columns="columns"
    row-key="heroid" @toggle-advanced="toggleAdvanced" :search="false" :showTableSetting="false">
    <!-- <template #toolbar>
        <a-button type="primary" @click="defaultHeader"> 导出：默认头部 </a-button>
        <a-button type="primary" @click="customHeader"> 导出：自定义头部 </a-button>
      </template> -->
    <!-- <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex == 'ACTION'">
        <span>
          <a @click="editSettings(record)">配置</a>
          <a @click="editSettings(record)">重启</a>
        </span>
      </template>
    </template> -->
    <template #toolbar>
      <a-button type="primary" :disabled="!$auth('system:role:create')" @click="openServerModal({})">
        新增
      </a-button>
    </template>
  </DynamicTable>
</template>

<script lang="ts" setup>
import { Card } from 'ant-design-vue';
import { serversettingColumns, type TableListItem, type TableColumnItem } from './columns';
import { useTable } from '@/components/core/dynamic-table';
import { jsonToSheetXlsx } from '@/components/basic/excel';
import { useFormModal } from '@/hooks/useModal/';
import { serversettingSchemas } from './formSchemas';
import { getServerList, updateServer, createServer, restartServer } from '@/api/servers/manage';
import { notification } from 'ant-design-vue';
import { h } from 'vue';

const [DynamicTable, dynamicTableInstance] = useTable();

const [showModal] = useFormModal();
/**
 * @description 打开操作用户弹窗
 */
const openServerModal = async (record: Partial<TableListItem> = {}) => {
  const [formRef] = await showModal({
    modalProps: {
      title: `${record.id ? '编辑' : '新增'}服务器设置`,
      width: 700,
      onFinish: async (values) => {
        values.id = record.id;
        let settings = {}
        for (let key in values) {
          if (['name', 'ip', 'password', 'port'].every(val => val != key)) {
            settings[key] = values[key];
          }
        }
        let params = {
          name: values.name,
          ip: values.ip,
          password: values.password,
          port: values.port,
          settings: JSON.stringify(settings)
        }
        if (record.id) {
          await updateServer({ id: record.id, data: params });
        } else {
          await createServer(params);
        }
        dynamicTableInstance?.reload();
      },
    },
    formProps: {
      labelWidth: 100,
      schemas: serversettingSchemas,
      autoSubmitOnEnter: true,
    },
  });

  if (record.id) {
    console.log(record)
    let settings = JSON.parse(record.settings);
    console.log(settings)
    formRef?.setFieldsValue({
      name: record.name,
      ip: record.ip,
      port: record.port,
      password: record.password,
      ...settings,
    });
  }
};
const columns: TableColumnItem[] = [
  ...serversettingColumns,
  {
    title: '操作',
    width: 130,
    dataIndex: 'ACTION',
    hideInSearch: true,
    fixed: 'right',
    actions: ({ record }) => [
      {
        label: '配置',
        onClick: () => {
          openServerModal(record);
        },
      },
      {
        label: '重启',
        popConfirm: {
          title: '你确定要重启该服务器吗？',
          placement: 'left',
          onConfirm: (async () => {
            let res = await restartServer({ id: record.id })
            notification.success({
              message: `来自${record.name}回调消息`,
              description:h('div',{
                innerHTML:res.replace(/\n/g, '<br />')
              }),
              duration: 0
            })

          }),
        },
      },
    ],
  },
];
</script>

<style lang="less" scoped></style>
