import axios from 'axios';
import qs from 'qs';

const popmartRequest = axios.create({
    baseURL: 'http://localhost:3000'
});
const popmartRequest1 = axios.create({
    baseURL: 'http://localhost:3080'
});
//取得全部商品
export const apiGetProducts = async () => {
    const response = await popmartRequest.get('/popmart');
    return response.data;
}
//新增商品
export const apiPostAddProduct = async (data) => {
    const response = await popmartRequest.post('/popmart',data);
    return response.data;
}
//修改商品
export const apiPutUpdateProduct = async (id,data) => {
    const response = await popmartRequest.put(`/popmart/${id}`,data);
    return response.data;
}
//刪除商品
export const apiDeleteRemoveProduct = async (id) => {
    const response = await popmartRequest.delete(`/popmart/${id}`);
    return response.data;
}
//取得IP列表
export const apiGetIpList = async () => {
    const response = await popmartRequest.get('/ipList');
    return response.data;
}
//測試queryString
export const apiTestQueryString = async (data) => {
     // 使用 qs 將物件轉換為查詢字符串
    const queryString = qs.stringify(data);
    const response = await popmartRequest.get(`/popmart?${queryString}`);
    return response.data;
}
