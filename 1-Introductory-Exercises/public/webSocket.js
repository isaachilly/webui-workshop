import {h, mount, Observable, WebSocketClient, sessionService} from '/js/src/index.js';

// Simple Model View setup
const model = new Observable();
model.title = 'Websocket Example';
model.notify();

const view = (model) => h('h1.title', `${model.title}`);

mount(document.body, view, model);

sessionService.loadAndHideParameters();

const ws = new WebSocketClient();

ws.addListener('authed', () => {
    console.log('WebSocket connected and authenticated');
    ws.sendMessage({command: 'hello', payload: {info: 'Hello WebSocket Server!'}});
});

ws.addListener('command', (message) => {
    if (message.command === 'hello-back') {
        console.log('Received message from server:', message.payload);
    }
});