import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { EncryptedChatPanel } from '../../features/chat/ui/EncryptedChatPanel';
import { palette, typography } from '../../shared/theme';
import Card from '../../shared/ui/Card';
import { Screen } from '../../shared/ui/Screen';

export const MessagesScreen: React.FC = () => {
  return (
    <Screen>
      <Card style={styles.header}>
        <Text style={styles.title}>Messages / Inbox</Text>
        <Text style={styles.caption}>
          Kick off encrypted chat requests. Stream Chat handles delivery while Supabase stores
          metadata and RLS protects participants.
        </Text>
      </Card>
      <EncryptedChatPanel />
    </Screen>
  );
};

const styles = StyleSheet.create({
  caption: {
    color: palette.muted,
    fontFamily: typography.regular,
  },
  header: {
    gap: 8,
  },
  title: {
    color: palette.text,
    fontFamily: typography.bold,
    fontSize: 18,
  },
});

export default MessagesScreen;
