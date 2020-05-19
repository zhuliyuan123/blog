import axios from 'axios';
import { Message } from 'element-ui';
import Qs from 'qs'
let lock = true;
/**
 * 错误提示
 * @param {String} message 提示文字内容
 * @param {Number} duration 提示显示时间
 */
const errorTip = (message = '', duration = 2000) => {
  if(lock){
      Message.close();
      Message.error({
        message,
        duration
      });
      lock = false;
      let timer = setTimeout(()=>{lock = true; clearTimeout(timer);},2000)
  }
};

/**
 * 状态码响应
 * @param status {Number} http状态码
 * @param content {String} 错误信息
 */
const handleError = (status, content) => {
  switch (status) {
    case 400:
      errorTip(`请求出错 - ${content}`, 2000);
      break;
    case 401:
      // 登录失效
      errorTip('登录失效，请重新登录', 2000);
      break;
    case 403:
      errorTip('您没有权限访问该接口', 2000);
      break;
    case 404:
      errorTip('请求出错，该接口不存在', 2000);
      break;
    case 405:
      errorTip(`请求出错 - ${content}`, 2000);
      break;
    default:
      errorTip(content, 2000);
      break;
  }
};

// 创建axios实例，同时设置20秒延时时间
const ajax = axios.create({
  timeout: 1000 * 20
});

ajax.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded; charset=UTF-8';

export const createRequestFunc = (sourceMap, apiURL)=>{
  let result = {};
  for(let key in sourceMap){
    if(sourceMap.hasOwnProperty(key)){
      result[key] = async (body) =>{
        let method = sourceMap[key].method.toLowerCase();
        let path = sourceMap[key].path;
        let params = body;
        const response = await ajax[method](`${apiURL}${path}`,method === 'get'? {params} : Qs.stringify(params))
        if(response.status == 200){
          if(response.data.error == 0){
            return Promise.resolve(response.data)
          }else{  
            if(response.data.error == 501){
              sessionStorage.removeItem('Authorization')
              window.location.href='/#/login';
              errorTip(response.data.msg,2000)
              return ;
            }else{
              errorTip(response.data.msg,2000)
              return Promise.reject({
                code:response.data.error,
                message:response.data.msg
              })
            }
          }
        }
      }
    }
  }
  return result;
}


ajax.interceptors.request.use(
  config => {
    // 请求头添加auth token
    const Authorization = sessionStorage.getItem('Authorization');

    Authorization && (config.headers['Authorization'] = `${Authorization}`);

    return config;
  },
  error => Promise.reject(error)
);

ajax.interceptors.response.use(
  response =>
    response.status === 200
      ? Promise.resolve(response)
      : Promise.reject(response),
  error => {
    const { response } = error;

    if (response.status < 500) {
      handleError(response.status, response.statusText);
    } else {
      errorTip(response.statusText, 2000);
    }

    return Promise.reject(response);
  }
);