<template>
  <DynamicTable
    ref="dynamicTableRef"
    size="small"
    bordered
    :data-request="getServerList"
    :columns="columns"
    row-key="heroid"
    :search="false"
    :showTableSetting="false"
    @toggle-advanced="toggleAdvanced"
  >
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
      <a-button
        type="primary"
        :disabled="!$auth('system:role:create')"
        @click="openServerModal({})"
      >
        新增
      </a-button>
    </template>
  </DynamicTable>
</template>

<script lang="ts" setup>
  import { notification } from 'ant-design-vue';
  import { serversettingColumns, type TableListItem, type TableColumnItem } from './columns';
  import { serversettingSchemas } from './formSchemas';
  import { useTable } from '@/components/core/dynamic-table';
  import { useFormModal } from '@/hooks/useModal/';
  import {
    getServerList,
    updateServer,
    createServer,
    restartServer,
    deleteServer,
  } from '@/api/servers/manage';

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
          let settings = {};
          for (let key in values) {
            if (['name', 'ip', 'password', 'port'].every((val) => val != key)) {
              settings[key] = values[key];
            }
          }
          let params = {
            name: values.name,
            // ip: values.ip,
            // password: values.password,
            // port: values.port,
            settings: JSON.stringify(settings),
          };
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
      console.log(record);
      let settings = JSON.parse(record.settings);
      console.log(settings);
      formRef?.setFieldsValue({
        name: record.name,
        // ip: record.ip,
        // port: record.port,
        // password: record.password,
        ...settings,
      });
    }
  };
  const columns: TableColumnItem[] = [
    ...serversettingColumns,
    {
      title: '操作',
      width: 200,
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
          label: '同步',
          popConfirm: {
            title: '你确定要同步该配置到服务器吗？',
            placement: 'left',
            onConfirm: async () => {
              let res = await restartServer({ id: record.id });
              console.log(res);
              notification.success({
                message: `发送成功`,
                description: `一共同步了${res}台客户端`,
                duration: 0,
              });
            },
          },
        },
        {
          label: '删除',
          popConfirm: {
            title: '你确定要删除该配置吗？',
            placement: 'left',
            onConfirm: async () => {
              let res = await deleteServer({ id: record.id });
              console.log(res);
              dynamicTableInstance?.reload();
            },
          },
        },
      ],
    },
  ];
</script>

<style lang="less" scoped></style>
