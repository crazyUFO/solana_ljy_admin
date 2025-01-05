<template>
  <DynamicTable
    ref="dynamicTableRef"
    size="small"
    bordered
    :data-request="getWalletList"
    :columns="columns"
    row-key="heroid"
    :search="false"
    :showTableSetting="false"
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
        @click="openWalletModal({})"
      >
        新增
      </a-button>
    </template>
  </DynamicTable>
</template>

<script lang="ts" setup>
  import { walletColumns, type TableColumnItem, type TableListItem } from './columns';
  import { WalletSchemas } from './formSchemas';
  import { useTable } from '@/components/core/dynamic-table';
  import { useFormModal } from '@/hooks/useModal/';
  import { getWalletList, createWallet, deleteWallet, updateWallet } from '@/api/exchange/manage';

  const [DynamicTable, dynamicTableInstance] = useTable();
  const [showModal] = useFormModal();
  /**
   * @description 打开操作用户弹窗
   */
  const openWalletModal = async (record: Partial<TableListItem> = {}) => {
    const [formRef] = await showModal({
      modalProps: {
        title: `${record.id ? '编辑' : '新增'}交易所地址`,
        width: 700,
        onFinish: async (values) => {
          values.id = record.id;
          let params = {
            walletAddress: values.walletAddress,
            label: values.label,
          };
          if (record.id) {
            await updateWallet({ id: record.id, data: params });
          } else {
            await createWallet(params);
          }
          dynamicTableInstance?.reload();
        },
      },
      formProps: {
        labelWidth: 100,
        schemas: WalletSchemas,
        autoSubmitOnEnter: true,
      },
    });

    if (record.id) {
      console.log(record);
      formRef?.setFieldsValue({
        walletAddress: record.walletAddress,
        label: record.label,
      });
    }
  };
  const columns: TableColumnItem[] = [
    ...walletColumns,
    {
      title: '操作',
      width: 200,
      dataIndex: 'ACTION',
      hideInSearch: true,
      fixed: 'right',
      actions: ({ record }) => [
        {
          label: '编辑',
          onClick: () => {
            openWalletModal(record);
          },
        },
        {
          label: '删除',
          popConfirm: {
            title: '你确定要删除该地址吗？',
            placement: 'left',
            onConfirm: async () => {
              await deleteWallet({ id: record.id });
              dynamicTableInstance?.reload();
            },
          },
        },
      ],
    },
  ];
</script>

<style lang="less" scoped></style>
