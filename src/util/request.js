import axios from 'axios'
import { Indicator } from 'mint-ui'
/* eslint-disable */
function checkStatus(response) {
  // 处理网络异常
  if (!response) {
    return {
      data: {
        code: -1000,
        message: '网络出错',
        data: '网络连接失败',
      },
    };
  }
  // console.log(response)
  const {data, config, status, statusText} = response;
  const apiName = config.url;
  if (status === 200 || status === 304) {
    let $nodata = document.getElementById('error-proxy')
    // console.log($nodata);
    $nodata && $nodata.remove()
    // console.log(`请求 ${apiName} 接口时，服务器响应正常`);
    return response;
  } else if (status >=500 && status <= 505) {
    return {
      data: {
        code: -500,
        message: statusText,
        data: statusText,
      },
    };
  }
  return {
    data: {
      code: -404,
      message: statusText,
      data: statusText,
    },
  };
}

function checkCode(res) {
  const {data, config} = res;
  const apiName = config && config.url;
  const {code, message} = data;
  if (code !== undefined && code === 0) {

  }
  //处理登录异常
  if (code >= 1000 && code <= 1009) {

  } else if (code === -500 || code === -1000) {
    console.error('Interval Server Error');
  } else if (code === -404) {
    console.error('Server not found');
  } else if (code === 2000) {

  }
  Indicator.close();
  return res;
}

export default {
  post(url, d) {
    let data = d;
    Indicator.open()
    // if (document.cookie !== undefined) {
      // data = Object.assign({sale_id: store.get('yu_info').sale_id}, data);
    // }
    return axios({
      method: 'post',
      url,
      data: data,
      timeout: 30000,
      // headers: {
      //   'Content-Type': 'application/json',
      //   'token': localStorage.getItem('token') || null,
      //   'userId': localStorage.getItem('userId') || null
      // },
      // withCredentials: true,
    }).then(checkStatus).then(checkCode);
  },
  get(url, d) {
    let params = d;
    return axios({
      method: 'get',
      url,
      params,
      timeout: 30000,
      // headers: {
      //   'X-Requested-With': 'XMLHttpRequest',
      // },
      // withCredentials: true,
    });
  },
  delete(url, d) {
    let data = d;
    return axios({
      methods: 'delete',
      url,
      params,
      timeout: 30000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      withCredentials: true,
    }).then(checkStatus).then(checkCode);
  }
};
