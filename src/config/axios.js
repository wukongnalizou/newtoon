import axios from 'axios'
import qs from 'qs'
import { Indicator } from 'mint-ui'
import { Toast } from 'mint-ui';
axios.defaults.timeout = 7000;                    // 响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';           // 配置请求头
axios.defaults.baseURL = 'http://www.kakamanhua.com/Comic';   // 配置接口地址
// axios.defaults.baseURL = 'http://192.168.1.39:8080/Comic';
//添加请求拦截器
axios.interceptors.request.use(
    config => { 
      if (config.method === 'post') {
        config.data = qs.stringify(config.data);
      }
      // config.data = qs.stringify(config.data);
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      return config;

    },
    error => {
      Indicator.close();
      // vm.$router.push('/servererror');
      // Toast({
      //   message: '加载超时',
      //   position: 'middle',
      //   duration: 3000
      // });
      return Promise.reject(error);
    });
//添加响应拦截器
axios.interceptors.response.use(
    response => {
      let timetp = null;
      clearTimeout(timetp);
      timetp = setTimeout(()=>{
        Indicator.close();
        clearTimeout(timetp);
      },500)
      Indicator.close();
      return response;
    },
    error => {
      if (error.response) {
        return Promise.reject(error)
    }
});
// axios.interceptors.request.use(function(config){
//      //在发送请求之前做某事
//      // POST传参序列化(添加请求拦截器)
//     if (config.method === 'post') {
//    		config.data = qs.stringify(config.data);
//   	}
//      return config;
//    },function(error){
//      //请求错误时做些事
//      return Promise.reject(error);
//    });
 
// //添加响应拦截器
// axios.interceptors.response.use(function(response){
//      //对响应数据做些事
//       return response;
//    },function(error){
//      //请求错误时做些事
//      return Promise.reject(error);
//    });
export default axios;