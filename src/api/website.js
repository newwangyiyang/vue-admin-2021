import request from '@/utils/request';
/** GET 请求 参数需额外用 {params: params} 包裹 */

export const requestDemo = () => {
  return request.post('resources/github');
};
