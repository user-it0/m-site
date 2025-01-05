const express = require('express');
const WebSocket = require('ws');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// サーバーの静的ファイルを提供
app.use(express.static('public'));

// WebSocket接続の管理
let users = {};

wss.on('connection', (ws) => {
  console.log('New client connected');
  
  // ユーザーが接続したとき
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    const { type, from, to, text } = data;

    if (type === 'message') {
      // メッセージ送信時
      if (users[to]) {
        // 受信者がオンラインならメッセージを送る
        users[to].send(JSON.stringify({ from, text }));
      }
    } else if (type === 'join') {
      // 新しいユーザーが参加した時
      users[from] = ws;
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
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
