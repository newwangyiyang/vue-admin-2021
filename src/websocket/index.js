import VueNativeSock from 'vue-native-websocket';
import config from '@/config';
import * as eventTypes from './socket-event';
import { ApiCode } from '@/constant';

function useSocket(Vue) {
  Vue.use(VueNativeSock, config.socketUrl.dev, {
    reconnection: false, // 自动重新连接 (false)
    reconnectionAttempts: 10, // 重新连接尝试次数 (Infinity),
    reconnectionDelay: 5000, // 重新连接时间间隔
  });
  const socketBus = new Vue(); // EventBus vue实例，用来绑定动态监听器 onclosed onmessage等事件
  Vue.prototype.$socketBus = socketBus; // 将EventBus注册至全局
  socketBus.$options.sockets.onclose = () => {
    console.log('websocket closed');
  };
  socketBus.$options.sockets.onmessage = (e) => {
    let data;
    try {
      data = JSON.parse(e.data);
    } catch (e) {
      // console.log(e);
      data = {};
    }
    handleSocketData(data, socketBus); // 数据处理函数
  };
}
function handleSocketData(data, socketBus) {
  if (!data) {
    return;
  }
  if (data.code === ApiCode.SUCCESS) {
    socketBus.$emit(eventTypes.realTimeAlarmEvent, data.data); // 触发实时报警
  }
  // for (const eventType of Object.keys(eventTypes)) {
  //   if (eventType === data.action) {
  //     socketBus.$emit(eventType, data); // 全局广播 eventType事件
  //     break;
  //   }
  // }
}

export default useSocket;
