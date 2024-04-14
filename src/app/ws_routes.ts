import express from 'express';
import expressWs from 'express-ws';
import { wsConnection } from 'utils/ws_connection';
import { conversationHandler } from 'api/handlers/conversation';
import { sessionStartHandler, sessionEndHandler } from 'api/handlers/session';
import WebSocket from 'ws';

const app = express();
expressWs(app);
const router = express.Router();

router.ws('/', async (ws: WebSocket, req: express.Request) => {
  console.log('Client connected');
  ws.on('message', async (message: string) => {
    const connection = new wsConnection(ws);
    const msg = JSON.parse(message);

    if (!msg.name || !msg.payload) {
      console.log('Message name and payload required');
      return;
    }

    try {
      switch (msg.name) {
        case 'conversation':
          await conversationHandler(connection, msg.payload);
          break;
        case 'sessionStart':
          await sessionStartHandler(connection, msg.payload);
          break;
        case 'sessionEnd':
          await sessionEndHandler(connection, msg.payload);
          break;

        default:
          console.log(`Message name not recognized: ${msg.name}`);
          break;
      }
    } catch (error) {
      console.log(`Handling error: ${error.message}`);
    }
  });
});

export default router;
