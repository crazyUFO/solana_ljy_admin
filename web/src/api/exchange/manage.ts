import { request } from '@/utils/request';

/**
 * @description 获取
 */
export function getWalletList(query: API.PageParams) {
  return request({
    url: '/api/exchange-wallets',
    method: 'get',
    params: query,
  });
}

/**
 * @description 创建
 */
export function createWallet(params: any) {
  return request({
    url: `/api/exchange-wallets`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    data: params,
  });
}
/**
 * @description 删除
 */
export function deleteWallet(params: any) {
  return request({
    url: `/api/exchange-wallets/${params.id}`,
    method: 'DELETE',
  });
}

/**
 * @description 更新
 */
export function updateWallet(params: any) {
  return request({
    url: `/api/exchange-wallets/${params.id}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    method: 'PATCH',
    data: params.data,
  });
}
