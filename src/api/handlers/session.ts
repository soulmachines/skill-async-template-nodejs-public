import {
  SessionStartMessage,
  SessionEndMessage,
} from '@soulmachines/smskillsdk';
import { Connection } from 'utils/ws_connection';

/**
 * Session start handler
 *
 * Message sent to the skill at the start of the session, can be useful
 * to do processing or caching on a per-session basis.
 */
export async function sessionStartHandler(
  connection: Connection,
  msg: SessionStartMessage,
) {
  console.log('Session start handler got:', msg);
}

/**
 * Session end handler
 *
 * Message sent to the skill at the end of the session, can be useful
 * to clean up session resources or do end-of-session processing
 */
export async function sessionEndHandler(
  connection: Connection,
  msg: SessionEndMessage,
) {
  console.log('Session end handler got:', msg);
}
