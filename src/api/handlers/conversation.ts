import {
  UserConversationMessage,
  SkillConversationMessage,
} from '@soulmachines/smskillsdk';
import { Connection } from 'utils/ws_connection';

/**
 * Conversation handler
 *
 * Runs when a conversation message from the user is sent to the skill
 */
export async function conversationHandler(
  connection: Connection,
  msg: UserConversationMessage,
) {
  console.log('Conversation handler got:', msg);
  const response: SkillConversationMessage = { text: `Echo: ${msg.text}` };

  const vars: Record<string, any> = msg.variables;
  if (vars?.kind === 'init') {
    response.text = 'Welcome';
  }

  await connection.send('skillConversation', response);
}
