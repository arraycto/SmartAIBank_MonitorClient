/**
 * websocket客户端模块
 * @module websocketClient
 * @author litye
 * @version 1.0.0
 */

var sock; var stompClient; var subscriptions = {}

var connect = function (url, user, token) {
  sock = new SockJS(url)
  sock.onheartbeat = function () {
      console.log('heartbeat')// eslint-disable-line
  }
  sock.onerror = function (err) {
      console.log(err)// eslint-disable-line
  }
  stompClient = Stomp.over(sock)
  stompClient.connect({ user: user, token: token, server: false }, function (frame) {
      console.log(frame)// eslint-disable-line
  }, function (err) {
    if (err.body) {
      var d = JSON.parse(err.body)
        console.log(d)// eslint-disable-line
    } else {
        console.log(err)// eslint-disable-line
    }
  })
}

var subscribeToRoom = function (room, socketString, callback) {
  var ss = stompClient.subscribe(socketString, callback)
  subscriptions[room] = ss
}

var sendMessage = function (room, message) {
  stompClient.send('room' + room, { subscription: subscriptions[room].id }, message)
}


var disconnect = function () {
  for (var key in subscriptions) {
    if (subscriptions.hasOwnProperty(key)) {
      unsubscribeFromRoom(key)
    }
  }
  stompClient.disconnect(function (frame) {
    console.info(frame)// eslint-disable-line
  })
}

function unsubscribeFromRoom (room) {
  subscriptions[room].unsubscribe()
}

export default {
  connect: connect,
  subscribeToRoom: subscribeToRoom,
  sendMessage: sendMessage,
  disconnect: disconnect,
  unsubscribeFromRoom: unsubscribeFromRoom
}
