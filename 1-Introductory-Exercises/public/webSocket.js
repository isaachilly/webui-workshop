import {h, mount, Observable, WebSocketClient, sessionService} from '/js/src/index.js';


const model = new Observable();
const view = (model) => h('h1.title', `${model.title}`);
mount(document.body, view, model);
model.title = 'Websocket Example';
model.notify();

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