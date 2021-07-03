## websocket 开发说明文档

![websocket.png](https://i.loli.net/2021/03/09/7ZBzKQPJqOdpwh2.png)

### [github地址](https://github.com/nathantsoi/vue-native-websocket)

### 安装

```
pnpm i vue-native-websocket -S
```

### 初始化`websocket`

```js
Vue.use(VueNativeSock, 'ws://localhost:9090', {
  reconnection: true, // (Boolean) 是否重连，例如页面用户刷新页面
  reconnectionAttempts: 5, // (Number) 重连次数 (Infinity),
  reconnectionDelay: 3000, // (Number) 重连时间间隔 (1000)
})
```

### 全局注册`socket`消息

```js
this.$options.sockets.onclose
this.$options.sockets.onopen    // 连接ok，成功提示可在此处编写
this.$options.sockets.onmessage // 数据通信关键事件
this.$options.sockets.onerror
```

### `send`发送消息至后台

```js
this.$socket.send(String)

this.$ocket.sendObj({ ... });
```

### 订阅服务端的消息

```js
this.$socketBus.$on('Event', data => {})
```

- 订阅事件记得要取消

```js
beforeDestroy() {
  this.$socketBus.$off('Event')
}
```
