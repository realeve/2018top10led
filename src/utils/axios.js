import http from 'axios';
const qs = require('qs');
require('promise.prototype.finally').shim();

let host = '//api.cbpc.ltd/';

// 判断数据类型，对于FormData使用 typeof 方法会得到 object;
const getType = (data) =>
  Object.prototype.toString
    .call(data)
    .match(/\S+/g)[1]
    .replace(']', '')
    .toLowerCase();

export let axios = async (option) => {
  let baseURL = option.baseURL || host;

  option = Object.assign(option, {
    method: option.method || 'get'
  });

  return await http
    .create({
      baseURL,
      timeout: 20000,
      transformRequest: [
        function(data) {
          let dataType = getType(data);
          switch (dataType) {
            case 'object':
            case 'array':
              data = qs.stringify(data);
              break;
            default:
              break;
          }
          return data;
        }
      ]
    })(option)
    .then(({ data }) => data)
    .catch((e) => Promise.reject(e));
};
