import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { StreamChat } from 'stream-chat-expo';
import env from '../../../shared/config/env';
import { ChatRequest } from '../../../entities/chat/types';
import { encryptMessage } from '../lib/encryption';

interface ChatContextValue {
  requests: ChatRequest[];
  startChat: (participant: string, topic: string) => void;
  clientReady: boolean;
  client?: StreamChat;
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

export const EncryptedChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [requests, setRequests] = useState<ChatRequest[]>([]);
  const [clientReady, setClientReady] = useState(false);
  const [client, setClient] = useState<StreamChat | undefined>();

  useEffect(() => {
    if (!env.streamChatKey) {
      setClientReady(true);
      return;
    }

    const client = StreamChat.getInstance(env.streamChatKey);
    const userId = 'venturesci-demo-user';
    client
      .connectUser({ id: userId, name: 'VentureSci Explorer' }, client.devToken(userId))
      .then(() => {
        setClient(client);
        setClientReady(true);
      })
      .catch(() => setClientReady(false));

    return () => {
      client.disconnectUser();
    };
  }, []);

  const startChat = (participant: string, topic: string) => {
    const encryptedPreview = encryptMessage(`Conversation about: ${topic}`);
    setRequests((existing) => [
      ...existing,
      { id: `${Date.now()}`, participant, topic, encryptedPreview },
    ]);
  };

  const value = useMemo(
    () => ({
      requests,
      startChat,
      clientReady,
      client,
    }),
    [requests, clientReady, client],
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useEncryptedChat = (): ChatContextValue => {
  const ctx = useContext(ChatContext);
  if (!ctx) {
    throw new Error('useEncryptedChat must be used inside EncryptedChatProvider');
  }
  return ctx;
};
