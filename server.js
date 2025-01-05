const express = require('express');
const WebSocket = require('ws');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// サーバーの静的ファイルを提供
app.use(express.static('public'));

// WebSocket接続を管理
let users = {};

wss.on('connection', (ws) => {
  // ユーザーが接続したとき
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    const { type, from, to, text } = data;

    if (type === 'message') {
      // メッセージ送信時
      if (users[to]) {
        // 受信者がオンラインならメッセージを送信
        users[to].send(JSON.stringify({ from, text }));
      }
    } else if (type === 'join') {
      // 新しいユーザーが参加したとき
      users[from] = ws;
    }
  });

  ws.on('close', () => {
    // 接続が閉じられたとき
    for (let user in users) {
      if (users[user] === ws) {
        delete users[user];
        break;
      }
    }
  });
});

// サーバーを起動
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
