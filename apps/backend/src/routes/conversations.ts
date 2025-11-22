/**
 * Conversations Routes
 * 
 * Handles conversation management with AI agents
 */

export interface Message {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  agent?: 'sam' | 'eleanor' | 'alex' | 'nanobanana';
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface Conversation {
  id: string;
  userId: string;
  title?: string;
  agent: 'sam' | 'eleanor' | 'alex' | 'nanobanana';
  messages: Message[];
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface SendMessageRequest {
  conversationId?: string;
  content: string;
  agent: 'sam' | 'eleanor' | 'alex' | 'nanobanana';
  context?: Record<string, any>;
}

export async function getConversations(_userId: string): Promise<Conversation[]> {
  // TODO: Implement conversation list
  throw new Error('Not implemented');
}

export async function getConversationById(_id: string): Promise<Conversation> {
  // TODO: Implement conversation fetch
  throw new Error('Not implemented');
}

export async function sendMessage(_req: SendMessageRequest): Promise<Message> {
  // TODO: Implement message sending with agent routing
  throw new Error('Not implemented');
}

export async function deleteConversation(_id: string): Promise<void> {
  // TODO: Implement conversation deletion
  throw new Error('Not implemented');
}

export const conversationRoutes = {
  '/conversations': getConversations,
  '/conversations/:id': getConversationById,
  '/conversations/message': sendMessage,
  '/conversations/:id/delete': deleteConversation,
};
