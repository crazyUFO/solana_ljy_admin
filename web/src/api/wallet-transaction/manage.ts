import { request } from '@/utils/request';

/**
 * @description 获取服务器列表
 */
export function getTransactionList(query: API.PageParams) {
  return request({
    url: '/api/wallet-transactions',
    method: 'get',
    params: query,
  });
}

/**
 * @description 更新服务器
 */
export function updateTransaction(params: any) {
  return request({
    url: `/api/wallet-transactions/update`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    method: 'PATCH',
    data: params,
  });
}

/**
 * @description 创建新服务器
 */
export function createTransaction(params: any) {
  return request({
    url: `/api/wallet-transactions`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    data: params,
  });
}

// /**
//  * @description 获取英雄联盟英雄列表
//  */
// export function getLolHeroList(query: API.PageParams) {
//   return request({
//     url: '/demo/lol/hero_list',
//     method: 'get',
//     params: query,
//   });
// }

// /**
//  * @description 获取英雄联盟英雄列表
//  */
// export function getLolHeroInfo({ id }) {
//   return request({
//     url: `/demo/lol/hero_info/${id}`,
//     method: 'get',
//   });
// }
