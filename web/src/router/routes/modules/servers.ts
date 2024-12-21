import type { RouteRecordRaw } from 'vue-router';
// import { t } from '@/hooks/useI18n';

const moduleName = 'servers';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/servers',
    name: moduleName,
    redirect: '/servers/dashboard',
    meta: {
      title: '服务器',
      icon: 'ant-design:dashboard-outlined',
    },
    children: [
      {
        path: 'dashboard',
        name: `${moduleName}-welcome`,
        meta: {
          title: '节点列表',
          icon: 'ant-design:home-filled',
        },
        component: () => import('@/views/servers/dashboard.vue'),
      },
    ],
  },
];

export default routes;
